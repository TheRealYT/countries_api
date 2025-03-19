import {useEffect, useState} from 'react';
import numeral from 'numeral';
import {useQuery} from '@tanstack/react-query';

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

  const onSubmit = (e) => {
    e.preventDefault();

    const q = e.target.search.value;
    const result = search(q);
    setSearchResult(result);
  };

  return (
    <div
      hidden={hidden}
      className={'fixed flex flex-col z-10 left-8 max-lg:left-2 bottom-0 w-92 max-lg:w-[calc(100%-1rem)] border bg-[#101020a8] backdrop-blur-md text-white border-black rounded-t-md shadow-md transition-[height] ' + (open ? 'h-[calc(100%-2rem)]' : 'h-14')}>

      <button onClick={() => setOpen(!open)}
              className="w-full p-4 flex justify-between rounded-t-md border-b border-black hover:bg-gray-800 cursor-pointer">
        <span>Menu</span>
        <span className="px-1">{open ? '⮟' : '⮝'}</span>
      </button>

      <main className="flex flex-col h-[calc(100%-2rem) overflow-y-auto">
        <div className="mb-4">
          <form onSubmit={onSubmit} className="py-4 px-4">
            <input onChange={e => e.target.value === '' && setSearchResult([])} name="search" type="search"
                   className="w-full p-2 border border-black rounded-md"
                   placeholder="Search"
                   disabled={!open}/>
          </form>

          <hr className="border-black"/>
        </div>

        <ul>
          {
            searchResult.map(v => <li className="px-4 nowrap ellipsis overflow-hidden" key={v.properties.ADMIN}
                                      onClick={() => select(v)}>{v.properties.ADMIN}</li>)
          }
          {
            searchResult.length > 0 && <hr className="border-black my-4"/>
          }
        </ul>

        {country ?
          <>
            <div className="px-4">
              <div className="flex justify-between">
                <p>{isValid && data.flag + ' '}{country.data.ADMIN}</p>
                <button onClick={() => goTo(country.coords)}>Locate</button>
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
      </main>
    </div>
  );
}