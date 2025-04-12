import { ColumnDef } from '@tanstack/react-table';
import { Challenge } from '@/types/challenges';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SubChallengeForm } from './subChallenge-form';
import { Modal } from '@/components/ui/modal';
import { useState } from 'react';
import { AddSubChallengeButton } from './subChallengeButton';
import { supabaseClient } from '@/utils/apiClient';
//import { openSubChallengeForm } from '@/components/shared/data-table';

export const columns: ColumnDef<Challenge>[] = [
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }) => {
      return (
        <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: 'pointer' }
          }}
        >
          {row.getIsExpanded() ? '👇' : '👉'}
        </button>
      );
    }
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
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('title')}</div>
    )
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
    accessorKey: 'points',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Points" />
    ),
    cell: ({ row }) => <div className="font-mono">{row.getValue('points')}</div>
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('is_active');
      const challengeId = row.original.id;

      const toggleStatus = async () => {
        try {
          await supabaseClient.patch(`/challenges?id=eq.${challengeId}`, {
            is_active: !isActive
          });
          // Refresh data or update local state here
          window.location.reload(); // Temporary solution until you add proper state management
        } catch (error) {
          console.error('Error updating challenge status:', error);
        }
      };

      return (
        <Badge
          variant={isActive ? 'default' : 'secondary'}
          className="cursor-pointer transition-opacity hover:opacity-80"
          onClick={toggleStatus}
        >
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      );
    }
  },
  {
    id: 'add_sub_challenges',
    header: 'Add Sub-Challenges',
    cell: ({ row }) => <AddSubChallengeButton challenge={row.original} />
  }
];

