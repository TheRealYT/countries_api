import {SearchIcon} from 'lucide-react';
import {Fragment, useEffect, useState} from 'react';

import {ScrollArea} from '@/components/ui/scroll-area.jsx';
import {Button} from '@/components/ui/button.jsx';
import {Separator} from '@/components/ui/separator.jsx';
import {Input} from '@/components/ui/input.jsx';
import {cn} from '@/lib/utils.js';

export default function Search({api}) {
  const [searchResult, setSearchResult] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    if (q === '')
      return;

    setSearchResult(api.search(q));
  }, [q]);

  return (
    <div className={cn('relative', q === '' ? '' : 'group-hover:mt-72 focus-within:mt-72')}>
      <div className="flex items-center group">
        <SearchIcon
          className="size-5 ml-2 absolute transition-colors group-focus-within:text-secondary-foreground text-muted-foreground"/>
        <Input onChange={(e) => setQ(e.target.value)}
               className="pl-9! w-64 text-secondary-foreground" placeholder="Search Country" type="search"/>
      </div>

      {q !== '' && <ScrollArea
        className="group-hover:block group-focus-within:block hidden absolute top-1 h-72 w-64 rounded-md bg-secondary text-secondary-foreground">
        <div className="p-4">
          <p
            className="mb-2 text-sm text-sm text-muted-foreground">{searchResult.length ? `${searchResult.length} Countr${searchResult.length === 1 ? 'y' : 'ies'}` : 'No result'}</p>

          {searchResult.map((v) => (
            <Fragment key={v.properties.ADMIN}>
              <Button className="text-sm w-full" onClick={() => api.select(v, null, true)}>
                  <span
                    className="text-left overflow-hidden w-48 whitespace-nowrap text-ellipsis">{v.properties.ADMIN}</span>
              </Button>
              <Separator className="my-2"/>
            </Fragment>
          ))}
        </div>
      </ScrollArea>
      }
    </div>
  );
}