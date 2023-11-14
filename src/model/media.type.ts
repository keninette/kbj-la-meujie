export type LightType = {
  color: string;
  intensity: number;
  helper: string;
}

export type SoundType = {
  name: string;
  filename: string;
  loop: boolean;
  volume?: number;
  helper?: string;
}