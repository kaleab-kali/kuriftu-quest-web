import { ColumnDef } from '@tanstack/react-table';
import { Tier } from '@/types/tier';
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Tier>[] = [
  {
    accessorKey: 'tier',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tier" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue('tier')}
      </Badge>
    )
  },
  {
    accessorKey: 'min_points',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Minimum Points" />
    ),
    cell: ({ row }) => (
      <div className="font-mono">{row.getValue('min_points')}</div>
    )
  },
  {
    accessorKey: 'benefits',
    header: 'Benefits',
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {(row.getValue('benefits') as string[]).map((benefit) => (
          <Badge key={benefit} variant="secondary" className="capitalize">
            {benefit}
          </Badge>
        ))}
      </div>
    )
  }
];
