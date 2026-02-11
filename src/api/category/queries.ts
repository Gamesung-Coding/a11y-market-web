import { useQuery } from '@tanstack/react-query';
import { categoryApi } from './index';
import { categoryKeys } from './keys';

export const useGetCategories = () => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: categoryApi.getCategories,
  });
};
