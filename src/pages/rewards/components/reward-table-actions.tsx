import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {  PlusIcon } from '@radix-ui/react-icons';

export default function RewardTableActions() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-1">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter rewards..."
          className="h-8 w-[150px] lg:w-[250px]"
          // Add your search logic here
        />
      </div>
      <div className="flex items-center space-x-2">
        <Button className="h-8" size="sm">
          <PlusIcon className="mr-2 h-4 w-4" />
          New Reward
        </Button>
      </div>
    </div>
  );
}
