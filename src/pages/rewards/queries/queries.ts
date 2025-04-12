import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/utils/apiClient';
import { Reward } from '@/types/reward';

export const useGetRewards = (
  offset: number,
  limit: number,
  category?: string | null
) => {
  return useQuery({
    queryKey: ['rewards', offset, limit, category],
    queryFn: async () => {
      const params = {
        select: '*',
        offset,
        limit,
        ...(category && category !== 'all' && { category: `eq.${category}` })
      };

      const response = await supabaseClient.get('/rewards', {
        params,
        headers: {
          Prefer: 'count=exact'
        }
      });

      // Extract count from Content-Range header
      const count =
        parseInt(response.headers['content-range']?.split('/')[1]) || 0;

      return {
        rewards: response.data as Reward[],
        total_rewards: count
      };
    },
    staleTime: 5000
  });
};
