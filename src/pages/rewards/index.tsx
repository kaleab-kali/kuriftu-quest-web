import PageHead from '@/components/shared/page-head';
import { useGetRewards } from './queries/queries';
import RewardsTable from './components/rewards-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

export default function RewardPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const category = searchParams.get('category') || null;
  const offset = (page - 1) * pageLimit;

  const { data, isLoading } = useGetRewards(offset, pageLimit, category);
  const rewards = data?.rewards;
  const totalRewards = data?.total_rewards;
  const pageCount = Math.ceil((totalRewards || 0) / pageLimit);

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
      <PageHead title="Reward Management | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Rewards', link: '/rewards' }
        ]}
      />
      <RewardsTable rewards={rewards || []} pageCount={pageCount} />
    </div>
  );
}
