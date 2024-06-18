import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export const LoadingMessage = () => {
  return (
    <div className="flex gap-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-12 w-24 rounded-md rounded-tl-none border  px-4 py-2 text-sm "></Skeleton>
    </div>
  );
};
