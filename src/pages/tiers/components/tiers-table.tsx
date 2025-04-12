import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import TierTableActions from './tier-table-actions';
import { Tier } from '@/types/tier';

type TTiersTableProps = {
  tiers: Tier[];
  pageCount: number;
};

export default function TiersTable({ tiers, pageCount }: TTiersTableProps) {
  return (
    <>
      <TierTableActions />
      {tiers && (
        <DataTable
          columns={columns}
          data={tiers}
          pageCount={pageCount}
          pageSizeOptions={[10, 20, 30]}
        />
      )}
    </>
  );
}
