import {Loader2Icon, LocateIcon} from 'lucide-react';

import {Button} from '@/components/ui/button.jsx';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

export default function LocateButton({api}) {
  const {isFetching, isSuccess, data, refetch, isRefetching} = useQuery({
    queryKey: ['my_country'],
    queryFn: () => fetch(`https://api.country.is`).then(res => res.json()),
    retry: false,
    enabled: false,
    select: (result) => result.country,
  });

  useEffect(() => {
    if (!isSuccess || isRefetching)
      return;

    const search = api.search(data, ['WB_A2']);
    if (search.length > 0)
      return api.select(search[0], null, true);
  }, [api, data, isSuccess, isRefetching]);

  return <Button disabled={isFetching} size="icon" onClick={refetch}>
    {isFetching ? <Loader2Icon className="animate-spin"/> : <LocateIcon/>}
  </Button>;
}