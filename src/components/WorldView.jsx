import {useEffect, useRef, useState} from 'react';
import Globe from 'react-globe.gl';

export default function WorldView() {
  const globeEl = useRef(null);
  const [countries, setCountries] = useState({features: []});
  const [altitude, setAltitude] = useState(0.1);
  const [selected, setSelected] = useState(null);
  const [transitionDuration, setTransitionDuration] = useState(300);
  const started = useRef(false);

  useEffect(() => {
    fetch('/datasets/ne_110m_admin_0_countries.geojson').then(res => res.json())
      .then(countries => {
        setCountries(countries);

        setTimeout(() => {
          const MOVE_DURATION = 3000;
          const duration = 2000;

          setTransitionDuration(duration);
          setAltitude(() => () => Math.random());
          globeEl.current.pointOfView({altitude: 4}, MOVE_DURATION); // move away smoothly

          const bbox = [32.95418, 3.42206, 47.78942, 14.95943]; // Ethiopia's coordinates
          const lat = (bbox[1] + bbox[3]) / 2;
          const lng = (bbox[0] + bbox[2]) / 2;

          setTimeout(() => {
            setAltitude(0.1);
            globeEl.current.pointOfView({altitude: 1, lat, lng}, MOVE_DURATION); // return smoothly

            setTimeout(() => {
              // set started after all animations
              started.current = true;
              setTransitionDuration(300);
            }, MOVE_DURATION);
          }, duration + 500);
        }, 1000);
      });
  }, []);

  return <Globe
    ref={globeEl}
    globeImageUrl="/earth-dark.jpg"
    polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
    polygonAltitude={altitude}
    polygonCapColor={(p) => p === selected ? 'rgba(108,177,202,0.6)' : 'rgba(104,200,105,0.6)'}
    polygonStrokeColor={() => 'rgb(44,44,44)'}
    polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
    polygonLabel={(v) => {
      if (!started.current)
        return;

      return <b>{v.properties.ADMIN} ({v.properties.ISO_A2})</b>;
    }}
    polygonsTransitionDuration={transitionDuration}
    onPolygonClick={(poly, _, {lat, lng}) => {
      if (!started.current)
        return;

      setAltitude(() => (p) => poly === p ? 0.2 : 0.1);
      setSelected(poly);
      globeEl.current.pointOfView({lat, lng}, 2000); // move to target country
    }}
  />;
}