import {LocateIcon, Maximize, Minimize} from 'lucide-react';

import {cn} from '@/lib/utils.js';
import {Button} from '@/components/ui/button.jsx';

export default function Footer({show = true, api}) {
  return (
    <>
      <Button size="icon" onClick={api.toggleUi}
              className={cn('z-20 absolute bottom-4 right-8 duration-500', show ? '' : 'hover:bottom-0 hover:right-0 -bottom-6 -right-6')}>{show ?
        <Maximize/> : <Minimize/>}</Button>

      <footer
        className={cn('flex gap-2 px-8 py-4 transition-[bottom] duration-500 absolute w-full z-10 left-0', show ? '-bottom-0' : '-bottom-20')}>

        <div className="ml-auto"/>

        <Button size="icon"><LocateIcon/></Button>

        <div className="w-9"/>

      </footer>
    </>);
}