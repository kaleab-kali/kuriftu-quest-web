import PageHead from '@/components/shared/page-head';
import { useGetTiers } from './queries/queries';
import TiersTable from './components/tiers-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

export default function TierPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const offset = (page - 1) * pageLimit;

  const { data, isLoading } = useGetTiers(offset, pageLimit);
  const tiers = data?.tiers;
  const totalTiers = data?.total_tiers;
  const pageCount = Math.ceil((totalTiers || 0) / pageLimit);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={3}
          filterableColumnCount={1}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <PageHead title="Tier Management | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Tiers', link: '/tiers' }
        ]}
      />
      <TiersTable tiers={tiers || []} pageCount={pageCount} />
    </div>
  );
}
