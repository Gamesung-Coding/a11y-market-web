import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { a11yApi } from '.';
import { a11yKeys } from './keys';
import type { UserA11yProfileAddRequest, UserA11yProfileUpdateRequest } from './types';

export const useGetA11yProfiles = () => {
  return useQuery({
    queryKey: a11yKeys.profiles(),
    queryFn: a11yApi.getA11yProfiles,
  });
};

export const useCreateA11yProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserA11yProfileAddRequest) => a11yApi.createA11yProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: a11yKeys.profiles() });
    },
  });
};

export const useUpdateA11yProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: UserA11yProfileUpdateRequest) => a11yApi.updateA11yProfile(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: a11yKeys.profiles() });
    },
  });
};

export const useDeleteA11yProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: string) => a11yApi.deleteA11yProfile(profileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: a11yKeys.profiles() });
    },
  });
};
