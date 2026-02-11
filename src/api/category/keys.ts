export const categoryKeys = {
  all: ['category'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
};
