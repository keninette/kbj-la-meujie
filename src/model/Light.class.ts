export class Light {
  color: string;
  intensity: number;
  helper?: string;

  constructor(color: string, intensity: number) {
    this.color = color;
    this.intensity = intensity;
  }
}
