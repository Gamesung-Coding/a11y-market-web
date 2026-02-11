export const a11yKeys = {
  all: ['a11y'] as const,
  profiles: () => [...a11yKeys.all, 'profiles'] as const,
  profile: (profileId: string) => [...a11yKeys.profiles(), profileId] as const,
};
