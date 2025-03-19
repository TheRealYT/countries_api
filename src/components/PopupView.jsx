import {useEffect, useState} from 'react';

export default function PopupView({country, goTo, isOpen = false, hidden}) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div
      hidden={hidden}
      className={'fixed z-10 left-8 max-lg:left-2 bottom-0 w-92 max-lg:w-[calc(100%-1rem)] border bg-[#101020a8] backdrop-blur-md text-white border-black rounded-t-md shadow-md transition-[height] ' + (open ? 'h-[calc(100%-2rem)]' : 'h-14')}>
      <button onClick={() => setOpen(!open)}
              className="w-full p-4 flex justify-between rounded-t-md border-b border-black hover:bg-gray-800 cursor-pointer">
        <span>Menu</span>
        <span className="px-1">{open ? '⮟' : '⮝'}</span>
      </button>

      <main className="p-4">
        <input type="search" className="w-full p-2 border-2 border-black rounded-md" placeholder="Search"/>

        <hr className="-mx-4 border-black my-4"/>

        {country &&
          <>
            <div className="flex justify-between">
              <p>{country.data.ADMIN}</p>
              <button onClick={() => goTo(country.coords)}>Locate</button>
            </div>
          </>
        }
      </main>
    </div>
  );
}