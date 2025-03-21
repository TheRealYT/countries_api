import {cn} from '@/lib/utils.js';

export default function Country({isOpen, country}) {

  return <>
    {country &&
      <>
        <div
          className={cn(isOpen ? 'max-sm:left-0 left-8' : '-left-full', 'transition-[left] duration-1000 z-30 absolute h-[calc(100%-8rem)] w-80 max-sm:fixed max-sm:size-full max-sm:rounded-b-none max-sm:bottom-[unset] max-sm:top-0 bottom-16 bg-[oklch(0.274_0.006_286.033_/_0.5)] backdrop-blur-md rounded-md')}>
        </div>
      </>
    }
  </>;
}