import { categoryApi } from '@/api/category-api';
import { CATEGORY_KEYS } from '@/queries/keys';
import { useQuery } from '@tanstack/react-query';

export const useCategory = () => {
  return useQuery({
    queryKey: CATEGORY_KEYS.all,
    queryFn: () => categoryApi.getCategories(),
    initialData: [],
  });
};
