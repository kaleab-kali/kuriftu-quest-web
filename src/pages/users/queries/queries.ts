import { getUsers } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetUsers = (offset, pageLimit, country) => {
  return useQuery({
    queryKey: ['users', offset, pageLimit, country],
    queryFn: async () => getUsers(offset, pageLimit, country)
  });
};
