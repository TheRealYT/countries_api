import {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';

import {cn} from '@/lib/utils.js';
import {ScrollArea} from '@/components/ui/scroll-area.jsx';
import {Button} from '@/components/ui/button.jsx';
import {XIcon} from 'lucide-react';
import WeatherInfo from '@/components/WeatherInfo.jsx';

export default function Country({isOpen, api, country, onOpenChange}) {
  const {isFetching, isSuccess, data, refetch} = useQuery({
    queryKey: ['country_info'],
    queryFn: () => fetch(`https://restcountries.com/v3.1/alpha/${country.data.WB_A2.toLowerCase()}?fields=flag,flags,capitalInfo,capital`).then(res => res.json()),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const [coords, setCoords] = useState(null);

  const isValid = !isFetching && isSuccess && data;

  useEffect(() => {
    if (isFetching) {
      setCoords(null);
      api.setMarkers([]);
      return;
    }

    if (!isValid)
      return;

    const lat = data.capitalInfo.latlng[0];
    const lng = data.capitalInfo.latlng[1];

    setCoords({lat, lng});
    api.setMarkers(data ? [{lat, lng, size: 18, color: '#cd3030'}] : []);
  }, [isValid]);

  useEffect(() => {
    if (country && isOpen)
      refetch();
  }, [country, isOpen]);

  return <>
    {country &&
      <>
        <div
          className={cn(isOpen ? 'max-sm:left-0 left-8' : '-left-full', 'flex transition-[left] duration-1000 z-30 absolute h-[calc(100%-8rem)] w-80 max-sm:fixed max-sm:size-full max-sm:rounded-b-none max-sm:bottom-[unset] max-sm:top-0 bottom-16 text-secondary-foreground bg-[oklch(0.274_0.006_286.033_/_0.5)] backdrop-blur-md rounded-md')}>

          {
            isOpen &&
            <ScrollArea className="w-full">
              <Button className="float-end" variant="outlined" onClick={() => onOpenChange(false)}><XIcon/></Button>

              <div className="p-4">
                {isValid && data.flag + ' '}{country.data.ADMIN}
                {isValid &&
                  <>
                    <img className="my-4 rounded-md" src={data.flags.svg} alt={data.flags.alt}/>
                  </>
                }

                {isValid && data?.capital[0]} <WeatherInfo coords={coords}/>
              </div>
            </ScrollArea>
          }
        </div>
      </>
    }
  </>;
}