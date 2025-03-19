import {useEffect, useState} from 'react';

export default function PopupView({country, isOpen = false, hidden}) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div
      hidden={hidden}
      className={'fixed z-10 left-8 bottom-0 w-96 bg-white text-black rounded-t-md shadow-md transition-[height] ' + (open ? 'h-[calc(100%-2rem)]' : 'h-14')}>
      <nav onClick={() => setOpen(!open)}
           className="p-4 flex rounded-t-md bg-gray-200 hover:bg-gray-300 cursor-pointer">
        <p>About</p>

        <div className="ml-auto"/>

        <button>{open ? '⮟' : '⮝'}</button>
      </nav>

      <main className="p-4">
        {country &&
          <h1>{country}</h1>
        }
      </main>
    </div>
  );
}