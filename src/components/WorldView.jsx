import {useCallback, useEffect, useRef, useState} from 'react';
import Globe from 'react-globe.gl';

export default function WorldView({onAnimationEnd, ref}) {
  const globeEl = useRef(null);
  const [countries, setCountries] = useState({features: []});
  const [altitude, setAltitude] = useState(0.01);
  const [selected, setSelected] = useState(null);
  const selectedRef = useRef(selected);
  const [transitionDuration, setTransitionDuration] = useState(300);
  const started = useRef(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const parent = useRef(document.getElementById('root'));

  const getWidth = () => parent.current?.offsetWidth;

  const getHeight = () => parent.current?.offsetHeight;

  const select = (poly, coords = null, closerView = false) => {
    if (coords == null) {
      const {bbox} = poly;
      const lat = (bbox[1] + bbox[3]) / 2;
      const lng = (bbox[0] + bbox[2]) / 2;
      coords = {lat, lng};
    }

    if (closerView)
      coords.altitude = 1;

    setAltitude(() => (p) => poly === p ? 0.1 : 0.01);
    setSelected({poly, coords});
    globeEl.current.pointOfView(coords, 2000); // move to target country
  };

  const onResize = useCallback(() => {
    setWidth(getWidth());
    setHeight(getHeight());
  }, []);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    ref.current = {
      resize: onResize,

      search(q, keys = ['ADMIN', 'ADM0_A3', 'BRK_A3', 'FORMAL_EN', 'CONTINENT', 'SUBREGION', 'REGION_WB']) {
        if (q === '')
          return [];

        q = q.toLowerCase();

        return countries.features.filter(poly => {
          const {properties} = poly;

          if (properties.ISO_A2 === 'AQ') // Antarctica
            return;

          for (const key of keys)
            if (properties[key]?.toLowerCase().includes(q))
              return true;

          return false;
        });
      },

      moveCloser() {
        if (selectedRef.current)
          globeEl.current.pointOfView({...selectedRef.current.coords, altitude: 1}, 2000);
      },

      select,

      get country() {
        return selectedRef.current ? {data: selectedRef.current.poly.properties, coords: selectedRef.current.coords} : null;
      },
    };
  });

  useEffect(() => {
    onResize();
    addEventListener('resize', onResize);

    return () => removeEventListener('resize', onResize);
  });

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
            setAltitude(0.01);
            globeEl.current.pointOfView({altitude: 1, lat, lng}, MOVE_DURATION); // return smoothly

            setTimeout(() => {
              // set started after all animations
              started.current = true;
              setTransitionDuration(300);
              onAnimationEnd && onAnimationEnd();
            }, MOVE_DURATION);
          }, duration + 500);
        }, 1000);
      });
  }, []);

  return (
    <>
      <Globe
        ref={globeEl}
        width={width}
        height={height}
        globeImageUrl="/earth-day.jpg"
        backgroundImageUrl="/night-sky.png"
        polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
        polygonAltitude={altitude}
        polygonCapColor={(p) => p === selected?.poly ? 'rgba(64,166,85,0.8)' : 'rgba(104,200,105,0.4)'}
        polygonStrokeColor={(p) => p === selected?.poly ? 'rgb(255,0,0)' : 'rgb(44,44,44)'}
        polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
        polygonLabel={(v) => {
          if (!started.current)
            return;

          return <b>{v.properties.ADMIN} ({v.properties.WB_A2})</b>;
        }}
        polygonsTransitionDuration={transitionDuration}
        onPolygonClick={(poly, _, {lat, lng}) => {
          if (!started.current)
            return;

          select(poly, {lat, lng});
        }}
      />
    </>);
}