import PageHead from '@/components/shared/page-head';
import { useGetChallenges } from './queries/queries';
import ChallengesTable from './components/challenges-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

export default function ChallengePage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const category = searchParams.get('category') || null;
  const offset = (page - 1) * pageLimit;

  const { data, isLoading } = useGetChallenges(offset, pageLimit, category);
  const challenges = data?.challenges;
  const totalChallenges = data?.total_challenges;
  const pageCount = Math.ceil((totalChallenges || 0) / pageLimit);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={5}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <PageHead title="Challenge Management | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Challenges', link: '/challenges' }
        ]}
      />
      <ChallengesTable challenges={challenges || []} pageCount={pageCount} />
    </div>
  );
}