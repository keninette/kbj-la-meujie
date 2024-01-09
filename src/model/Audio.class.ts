export class Audio {
  name: string;
  filename: string;
  loop: boolean;
  autoplay: boolean;
  volume: number;
  helper?: string;

  constructor(name: string, filename: string) {
    this.name = name;
    this.filename = filename;
    this.loop = false;
    this.autoplay = false;
    this.volume = 1;
  }
}
