import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import ChallengeTableActions from './challenge-table-actions';
import { Challenge } from '@/types/challenges';

type TChallengesTableProps = {
  challenges: Challenge[];
  pageCount: number;
};

export default function ChallengesTable({
  challenges,
  pageCount
}: TChallengesTableProps) {
  return (
    <>
      <ChallengeTableActions />
      {challenges && (
        <DataTable
          columns={columns}
          data={challenges}
          pageCount={pageCount}
          pageSizeOptions={[10, 20, 30]}
        />
      )}
    </>
  );
}
