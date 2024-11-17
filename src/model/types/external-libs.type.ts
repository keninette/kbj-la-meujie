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

export interface ReactAudioPlayerProps {
  autoPlay?: boolean;
  children?: ReactNode;
  className?: string;
  controls?: boolean;
  controlsList?: string;
  crossOrigin?: string;
  id?: string;
  listenInterval?: number;
  loop?: boolean;
  muted?: boolean;
  onAbort?: (e: Event) => void;
  onCanPlay?: (e: Event) => void;
  onCanPlayThrough?: (e: Event) => void;
  onEnded?: (e: Event) => void;
  onError?: (e: Event) => void;
  onListen?: (time: number) => void;
  onLoadedMetadata?: (e: Event) => void;
  onPause?: (e: Event) => void;
  onPlay?: (e: Event) => void;
  onSeeked?: (e: Event) => void;
  onVolumeChanged?: (e: Event) => void;
  preload?: '' | 'none' | 'metadata' | 'auto';
  src?: string;
  style?: CSSProperties;
  title?: string;
  volume: number;
}
