import type { A11ySettings } from '@/api/a11y/types';

export const A11Y_PROFILES: Record<
  string,
  { label: string; items: { id: string; name: string; settings: Partial<A11ySettings> }[] }
> = {
  vision: {
    label: '시각 접근성',
    items: [
      {
        id: 'high-contrast',
        name: '고대비 모드',
        settings: { contrastLevel: 2 },
      },
      {
        id: 'large-text',
        name: '큰 글씨 모드',
        settings: { textSizeLevel: 2 },
      },
      {
        id: 'low-vision',
        name: '저시력 모드',
        settings: { textSizeLevel: 2, contrastLevel: 1, textSpacingLevel: 1 },
      },
      {
        id: 'color-blind',
        name: '색각 지원 모드',
        settings: { smartContrast: true, highlightLinks: true },
      },
    ],
  },

  cognitive: {
    label: '인지 접근성',
    items: [
      {
        id: 'dyslexia',
        name: '난독증 모드',
        settings: { textSpacingLevel: 2, lineHeightLevel: 1, textAlign: 'left' },
      },
      {
        id: 'focus',
        name: '집중 모드',
        settings: { textAlign: 'left' },
      },
    ],
  },

  screenReader: {
    label: '보조기기',
    items: [
      {
        id: 'screen-reader',
        name: '스크린리더 사용자',
        settings: { screenReader: true },
      },
    ],
  },

  senior: {
    label: '시니어 접근성',
    items: [
      {
        id: 'senior',
        name: '노년층 모드',
        settings: {
          textSizeLevel: 2,
          textSpacingLevel: 1,
          lineHeightLevel: 1,
          contrastLevel: 1,
        },
      },
    ],
  },

  custom: {
    label: '사용자 커스텀',
    items: [],
  },
};
