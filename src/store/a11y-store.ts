import {
  A11yContrast,
  A11yLineHeight,
  A11yTextAlign,
  A11yTextSize,
  A11yTextSpacing,
} from '@/lib/a11y/a11yEnums';
import type { A11ySettings } from '@/types/a11y';
import { create } from 'zustand';

const A11Y_STORAGE_KEY = 'a11y-settings';

interface A11yState {
  data: A11ySettings;

  actions: {
    setContrastLevel: (level: number) => void;
    setTextSizeLevel: (level: number) => void;
    setTextSpacingLevel: (level: number) => void;
    setLineHeightLevel: (level: number) => void;
    setTextAlign: (align: string) => void;
    toggleSmartContrast: () => void;
    toggleHighlightLinks: () => void;
    toggleCursorHighlight: () => void;
    toggleScreenReader: () => void;
    loadA11ySettings: () => void;
    saveA11ySettings: (settings: A11ySettings) => void;
    resetA11ySettings: () => void;
  };
}

const initialState = {
  contrastLevel: A11yContrast.NORMAL,
  textSizeLevel: A11yTextSize.NORMAL,
  textSpacingLevel: A11yTextSpacing.NORMAL,
  lineHeightLevel: A11yLineHeight.NORMAL,
  textAlign: A11yTextAlign.LEFT,
  smartContrast: false,
  highlightLinks: false,
  cursorHighlight: false,
  screenReader: false,
};

const saveSetting = (data: A11ySettings, set: any) => {
  set(() => ({ data }));
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(data));
};

export const useA11yStore = create<A11yState>((set) => ({
  data: initialState,

  actions: {
    setContrastLevel: (level: number) => {
      saveSetting({ ...useA11yStore.getState().data, contrastLevel: level }, set);
    },
    setTextSizeLevel: (level: number) => {
      saveSetting({ ...useA11yStore.getState().data, textSizeLevel: level }, set);
    },
    setTextSpacingLevel: (level: number) => {
      saveSetting({ ...useA11yStore.getState().data, textSpacingLevel: level }, set);
    },
    setLineHeightLevel: (level: number) => {
      saveSetting({ ...useA11yStore.getState().data, lineHeightLevel: level }, set);
    },
    setTextAlign: (align: string) => {
      saveSetting({ ...useA11yStore.getState().data, textAlign: align }, set);
    },
    toggleSmartContrast: () => {
      const current = useA11yStore.getState().data.smartContrast;
      saveSetting({ ...useA11yStore.getState().data, smartContrast: !current }, set);
    },
    toggleHighlightLinks: () => {
      const current = useA11yStore.getState().data.highlightLinks;
      saveSetting({ ...useA11yStore.getState().data, highlightLinks: !current }, set);
    },
    toggleCursorHighlight: () => {
      const current = useA11yStore.getState().data.cursorHighlight;
      saveSetting({ ...useA11yStore.getState().data, cursorHighlight: !current }, set);
    },
    toggleScreenReader: () => {
      const current = useA11yStore.getState().data.screenReader;
      saveSetting({ ...useA11yStore.getState().data, screenReader: !current }, set);
    },
    loadA11ySettings: () => {
      const stored = localStorage.getItem(A11Y_STORAGE_KEY);
      if (stored) {
        const parsed: A11ySettings = JSON.parse(stored);
        set(() => ({ data: parsed }));
      }
    },
    saveA11ySettings: (settings: A11ySettings) => {
      saveSetting(settings, set);
    },
    resetA11ySettings: () => {
      saveSetting(
        {
          contrastLevel: A11yContrast.NORMAL,
          textSizeLevel: A11yTextSize.NORMAL,
          textSpacingLevel: A11yTextSpacing.NORMAL,
          lineHeightLevel: A11yLineHeight.NORMAL,
          textAlign: A11yTextAlign.LEFT,
          smartContrast: false,
          highlightLinks: false,
          cursorHighlight: false,
          screenReader: false,
        },
        set,
      );
    },
  },
}));

export const useA11yData = () => useA11yStore((state) => state.data);
export const useA11yActions = () => useA11yStore((state) => state.actions);
