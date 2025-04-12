import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TierForm } from './tier-form';

export default function TierTableActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-1">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tiers..."
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="h-8" size="sm">
              <PlusIcon className="mr-2 h-4 w-4" />
              New Tier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <TierForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
