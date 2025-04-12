import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '../utils/apiClient';
import { Reward } from '../types/reward';

export const useRewards = () => {
  return useQuery<Reward[]>({
    queryKey: ['rewards'],
    queryFn: async () => {
      const { data } = await supabaseClient.get<Reward[]>('/rewards', {
        params: {
          select: '*'
        }
      });
      return data;
    },
    staleTime: 1000 * 60 * 5 // 5 minutes cache
  });
};
