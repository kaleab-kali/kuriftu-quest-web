import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/utils/apiClient';
import { Tier } from '@/types/tier';

export const useGetTiers = (offset: number, limit: number) => {
  return useQuery({
    queryKey: ['tiers', offset, limit],
    queryFn: async () => {
      const params = {
        select: '*',
        offset,
        limit
      };

      const response = await supabaseClient.get('/tier_definitions', {
        params,
        headers: {
          Prefer: 'count=exact'
        }
      });

      const count =
        parseInt(response.headers['content-range']?.split('/')[1]) || 0;

      return {
        tiers: response.data as Tier[],
        total_tiers: count
      };
    },
    staleTime: 5000
  });
};
