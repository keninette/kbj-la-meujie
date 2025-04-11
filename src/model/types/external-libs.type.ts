import { CSSProperties, ReactNode } from 'react';

export enum MuiThemes {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
  success = 'success',
}

export enum MuiTabThemes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export type ReactWysiwygEditorState = {
  entityMap: object;
  blocks: {
    key: string;
    text: string;
    type: string;
    depth: number;
    inlineStyleRanges: object[];
    entityRanges: object[];
    data: object;
  }[];
};
