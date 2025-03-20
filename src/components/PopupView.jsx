import {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import numeral from 'numeral';

export default function PopupView({select, search, country, goTo, isOpen = false, hidden}) {
  const [open, setOpen] = useState(isOpen);
  const {refetch, isFetching, isSuccess, data, isError, error} = useQuery({
    queryFn: () => fetch(`https://restcountries.com/v3.1/alpha/${encodeURIComponent(country.data.WB_A2.toLowerCase())}`)
      .then(res => res.json()),
    queryKey: ['data'],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: false,
    select: (data) => data.find(d => d.cca2?.toLowerCase() === country.data.WB_A2.toLowerCase()),
  });
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (country && open && !data)
      refetch();
  }, [country, open]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const isValid = isSuccess && data;

  const onSearch = (q) => {
    const result = search(q);
    setSearchResult(result);
  };

  return (
    <>
      <button
        className="z-20 fixed right-8 top-8 rounded-full border border-black size-12 bg-[#101020a8] hover:bg-[#101766a8] backdrop-blur-md">O
      </button>

      <div
        hidden={true}
        className="group z-20 fixed top-8 right-8 max-md:left-4 w-64 max-lg:w-[calc(100%-2rem)] bg-[#101020a8] hover:bg-[#101030a8] border-2 border-[#ccccccaa] backdrop-blur-md max-h-[calc(100%-4rem)] rounded-md overflow-x-hidden">

        <div className="py-4 px-4">
          <input onChange={e => onSearch(e.target.value)} name="search" type="search"
                 className="w-full p-2 border border-black rounded-md"
                 placeholder="Search"/>
        </div>

        <hr className="border-black"/>

        <ul className="group-focus-within:block group-hover:block hidden">
          {
            searchResult.map(v => (
              <li key={v.properties.ADMIN}>
                <button
                  className="active:scale-95 transition-[scale] whitespace-nowrap text-ellipsis overflow-hidden w-full text-left px-4 py-2 focus:bg-blue-900 hover:bg-blue-900"
                  onClick={() => select(v)}>{v.properties.ADMIN}</button>
              </li>
            ))
          }
        </ul>

      </div>

      <div
        hidden={hidden}
        className={'fixed flex flex-col gap-y-4 z-10 left-8 max-lg:left-2 bottom-0 w-92 max-lg:w-[calc(100%-1rem)] border bg-[#101020a8] hover:bg-[#101030a8] backdrop-blur-md text-white border-black rounded-t-md shadow-md transition-[height] ' + (open ? 'h-[calc(100%-2rem)]' : 'h-14')}>

        <button onClick={() => setOpen(!open)}
                className="w-full p-4 flex justify-between rounded-t-md border-b border-black hover:bg-gray-800 cursor-pointer">
          <span>Menu</span>
          <span className="px-1">{open ? '⮟' : '⮝'}</span>
        </button>

        <div hidden={!open} className="flex flex-col h-[calc(100%-2rem) overflow-y-auto">
          {country ?
            <>
              <div className="px-4">
                <div className="flex justify-between">
                  <p>{isValid && data.flag + ' '}{country.data.ADMIN}</p>
                  <button className="active:scale-95 transition-[scale]" onClick={() => goTo(country.coords)}>Locate
                  </button>
                </div>

                {isValid &&
                  <div>
                    Population: {numeral(data.population).format('0.0a').toUpperCase()}
                  </div>
                }
                {isFetching && <p>Loading...</p>}
                {isError && <p>{error.message}</p>}
              </div>
            </>
            :
            <div className="flex text-center justify-center text-gray-300">
              <p>Select Country</p>
            </div>
          }
        </div>
      </div>
    </>
  );
}