import { useQuery } from '@tanstack/react-query';
import { mainApi } from './index';
import { mainKeys } from './keys';

export const useGetEventBanners = () => {
  return useQuery({
    queryKey: mainKeys.events(),
    queryFn: mainApi.getEventBanners,
  });
};

export const useGetPopularItems = () => {
  return useQuery({
    queryKey: mainKeys.populars(),
    queryFn: mainApi.getPopularItems,
  });
};

export const useGetRecommendCategories = () => {
  return useQuery({
    queryKey: mainKeys.categories(),
    queryFn: mainApi.getCategories,
  });
};

export const useGetProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: mainKeys.productsByCategory(categoryId),
    queryFn: () => mainApi.getProductsByCategory(categoryId),
    enabled: !!categoryId,
  });
};
