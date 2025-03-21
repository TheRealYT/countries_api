import {cn} from '@/lib/utils.js';

import Search from '@/components/Search.jsx';

export default function Header({show = true, api}) {
  return (
    <header
      className={cn('bg-secondary absolute transition-[top] duration-500 w-full h-12 z-10 left-0', show ? 'top-0' : '-top-12')}>
      <nav className="flex items-center h-full px-8 group" hidden={!show}>

        <div className="ml-auto"/>

        <Search api={api}/>

      </nav>
    </header>
  );
}