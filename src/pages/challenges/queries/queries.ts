import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/utils/apiClient';
import { Challenge } from '@/types/challenges';

export const useGetChallenges = (
  offset: number,
  limit: number,
  category?: string | null
) => {
  return useQuery({
    queryKey: ['challenges', offset, limit, category],
    queryFn: async () => {
      const params = {
        select: '*',
        offset,
        limit,
        ...(category && category !== 'all' && { category: `eq.${category}` })
      };

      const response = await supabaseClient.get('/challenges', {
        params,
        headers: {
          Prefer: 'count=exact'
        }
      });

      const count =
        parseInt(response.headers['content-range']?.split('/')[1]) || 0;

      return {
        challenges: response.data as Challenge[],
        total_challenges: count
      };
    },
    staleTime: 5000
  });
};
