import {cn} from '@/lib/utils.js';

export default function Footer({show = true}) {
  return (
    <>
      <footer className={cn('bg-secondary transition-[bottom] duration-300 absolute h-12 w-full z-10 left-0', show ? 'bottom-0' : '-bottom-12')}>
      </footer>
    </>);
}