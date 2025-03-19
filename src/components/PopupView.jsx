import {useEffect, useState} from 'react';

export default function PopupView({country, isOpen = false, hidden}) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div
      hidden={hidden}
      className={'fixed z-10 left-8 max-lg:left-2 bottom-0 w-92 max-lg:w-[calc(100%-1rem)] border bg-[#101020a8] backdrop-blur-md text-white border-black rounded-t-md shadow-md transition-[height] ' + (open ? 'h-[calc(100%-2rem)]' : 'h-14')}>
      <nav onClick={() => setOpen(!open)}
           className="p-4 flex rounded-t-md border-b border-black hover:bg-gray-800 cursor-pointer">
        <p>About</p>

        <div className="ml-auto"/>

        <button className="px-1">{open ? '⮟' : '⮝'}</button>
      </nav>

      <main className="p-4">
        {country &&
          <h1>{country}</h1>
        }
      </main>
    </div>
  );
}