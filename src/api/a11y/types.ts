export interface A11ySettings {
  contrastLevel: number;
  textSizeLevel: number;
  textSpacingLevel: number;
  lineHeightLevel: number;
  textAlign: string;
  smartContrast: boolean;
  highlightLinks: boolean;
  cursorHighlight: boolean;
  screenReader: boolean;
}

export interface UserA11yProfileResponse {
  profileId: string;
  profileName: string;
  description: string;
  contrastLevel: number;
  textSizeLevel: number;
  textSpacingLevel: number;
  lineHeightLevel: number;
  textAlign: string;
  screenReader: boolean;
  smartContrast: boolean;
  highlightLinks: boolean;
  cursorHighlight: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserA11yProfileAddRequest extends A11ySettings {
  profileName: string;
  description: string;
}

export interface UserA11yProfileUpdateRequest {
  profileId: string;
  data: UserA11yProfileAddRequest;
}
