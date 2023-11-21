export type LightType = {
  color: string;
  intensity: number;
  helper: string;
};

export type AudioType = {
  name: string;
  filename: string;
  loop?: boolean;
  autoplay?: boolean;
  volume?: number;
  helper?: string;
};
