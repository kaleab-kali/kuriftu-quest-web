import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import RewardTableActions from './reward-table-actions';
import { Reward } from '@/types/reward';

type TRewardsTableProps = {
  rewards: Reward[];
  pageCount: number;
};

export default function RewardsTable({
  rewards,
  pageCount
}: TRewardsTableProps) {
  return (
    <>
      <RewardTableActions />
      {rewards && (
        <DataTable
          columns={columns}
          data={rewards}
          pageCount={pageCount}
          pageSizeOptions={[10, 20, 30]}
        />
      )}
    </>
  );
}
