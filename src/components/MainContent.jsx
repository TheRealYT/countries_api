import {useState} from 'react';
import {InfoIcon, Maximize, Minimize, ScanEyeIcon} from 'lucide-react';

import {cn} from '@/lib/utils.js';
import {Button} from '@/components/ui/button.jsx';
import LocateButton from '@/components/LocateButton.jsx';
import Country from '@/components/Country.jsx';

export default function MainContent({show = true, api, country}) {
  const [open, setOpen] = useState(true);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Country country={country} isOpen={open}/>

      <main
        className={cn('flex gap-2 px-8 py-4 transition-[bottom] duration-500 absolute w-full z-10 left-0', show ? '-bottom-0' : '-bottom-20')}>

        {country && <Button onClick={toggle}><InfoIcon/> {country.data.ADMIN}</Button>}

        <div className="ml-auto"/>

        <Button size="icon" onClick={api.moveCloser}>
          <ScanEyeIcon/>
        </Button>

        <LocateButton api={api}/>

        <div className="w-9"/>

      </main>

      <Button size="icon" onClick={api.toggleUi}
              className={cn('z-10 absolute bottom-4 right-8 duration-500', show ? '' : 'hover:bottom-0 hover:right-0 -bottom-6 -right-6')}>
        {show ? <Maximize/> : <Minimize/>}
      </Button>
    </>);
}