import {useQuery} from '@tanstack/react-query';

export default function WeatherInfo({coords = null}) {
  const {isSuccess, data} = useQuery({
    queryKey: ['weather_info'],
    queryFn: () => fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,precipitation_probability`).then(res => res.json()),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: coords != null,
  });

  return <>
    {isSuccess ? `${data.current.temperature_2m}${data.current_units.temperature_2m}` : 'Loading...'}
    {isSuccess && <p>Portability of rain {data.current.precipitation_probability}%</p>}
  </>;
}