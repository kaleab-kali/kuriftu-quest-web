import { ColumnDef } from '@tanstack/react-table';
import { Reward } from '@/types/reward';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';

export const columns: ColumnDef<Reward>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('title')}</div>
    )
  },
  {
    accessorKey: 'image_url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const imageUrl = row.getValue('image_url');
      return (
        <div className="h-12 w-12 overflow-hidden rounded-md border">
          {typeof imageUrl === 'string' && (
            <img
              src={imageUrl}
              alt="Reward"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue('category')}
      </Badge>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id))
  },
  {
    accessorKey: 'points_cost',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Points Cost" />
    ),
    cell: ({ row }) => (
      <div className="font-mono">{row.getValue('points_cost')}</div>
    )
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.getValue('is_active') ? 'default' : 'secondary'}>
        {row.getValue('is_active') ? 'Active' : 'Inactive'}
      </Badge>
    )
  }
];
