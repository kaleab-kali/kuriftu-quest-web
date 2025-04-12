import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/utils/apiClient';
import { User } from '@/types/users';

export const useGetUsers = (
  offset: number,
  limit: number,
  search?: string | null,
  is_active?: boolean | null
) => {
  return useQuery({
    queryKey: ['users', offset, limit, search, is_active],
    queryFn: async () => {
      const params: Record<string, any> = {
        select: '*',
        offset,
        limit,
        order: 'created_at.desc'
      };

      if (search) {
        params.or = `(name.ilike.%${search}%,email.ilike.%${search}%)`;
      }

      if (typeof is_active === 'boolean') {
        params.is_active = `eq.${is_active}`;
      }

      const response = await supabaseClient.get('/user_profiles', {
        params,
        headers: {
          Prefer: 'count=exact'
        }
      });

      // Extract count from Content-Range header
      const count =
        parseInt(response.headers['content-range']?.split('/')[1]) || 0;

      return {
        users: response.data as User[],
        total_users: count
      };
    },
    staleTime: 5000
  });
};
