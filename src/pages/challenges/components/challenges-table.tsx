import { useState } from 'react';
import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import ChallengeTableActions from './challenge-table-actions';
import { Challenge, SubChallenge } from '@/types/challenges';
import { supabaseClient } from '@/utils/apiClient';

type TChallengesTableProps = {
  challenges: Challenge[];
  pageCount: number;
};

// const SubChallengeRow = ({ subChallenge }: { subChallenge: SubChallenge }) => (
//   <div className="bg-gray-50 pl-8">
//     <div className="grid grid-cols-5 items-center gap-4 p-2">
//       <div>{subChallenge.title}</div>
//       <div>{subChallenge.description}</div>
//       <div>{subChallenge.points}</div>
//       <div>
//         <QRCodeComponent value={subChallenge.qr_code} />
//       </div>
//     </div>
//   </div>
// );

export default function ChallengesTable({
  challenges,
  pageCount
}: TChallengesTableProps) {
  const [subChallenges, setSubChallenges] = useState<
    Record<string, SubChallenge[]>
  >({});

//   const handleRowExpand = async (challengeId: string) => {
//     if (!subChallenges[challengeId]) {
//       try {
//         const { data } = await supabaseClient.get(
//           `/sub_challenges?challenge_id=eq.${challengeId}`
//         );
//         setSubChallenges((prev) => ({ ...prev, [challengeId]: data }));
//       } catch (error) {
//         console.error('Error fetching sub-challenges:', error);
//       }
//     }
//   };

  return (
    <>
      <ChallengeTableActions />
      {challenges && (
        <DataTable
          columns={columns}
          data={challenges}
          pageCount={pageCount}
          pageSizeOptions={[10, 20, 30]}
          onRowExpand={async (challengeId) => {
            // Fetch sub-challenges here
            const { data } = await supabaseClient.get(
              `/sub_challenges?challenge_id=eq.${challengeId}`
            );
            setSubChallenges((prev) => ({ ...prev, [challengeId]: data }));
          }}
          subChallenges={subChallenges}
        />
      )}
    </>
  );
}
