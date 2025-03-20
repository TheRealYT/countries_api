import {cn} from '@/lib/utils.js';

export default function Header({show = true}) {
  return (
    <header className={cn('bg-secondary absolute transition-[top] duration-300 w-full h-12 z-10 left-0', show ? 'top-0' : '-top-12')}>
      <nav>
      </nav>
    </header>
  );
}