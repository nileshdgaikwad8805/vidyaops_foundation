import { Injectable, signal } from '@angular/core';

interface Track {
  src: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class MusicService {
  private readonly tracks: Track[] = [
    { src: 'assets/devotional.mp3?v=3', name: 'Haratanaya Sree' },
    { src: 'assets/devotional2.mp3?v=1', name: 'Track 2' },
    { src: 'assets/devotional3.mp3?v=1', name: 'Track 3' },
    { src: 'assets/devotional4.mp3?v=1', name: 'Track 4' },
  ];

  private audio: HTMLAudioElement | null = null;
  private currentIndex = 0;
  private readonly autoStartBound = (): void => this.tryAutoStart();

  readonly isPlaying = signal(false);
  readonly trackName = signal('');
  readonly isMuted = signal(false);

  constructor() {
    this.audio = new Audio(this.tracks[0].src);
    this.audio.loop = false;
    this.audio.addEventListener('ended', () => this.next());

    document.addEventListener('click', this.autoStartBound, { once: true });
    document.addEventListener('touchstart', this.autoStartBound, { once: true });
    document.addEventListener('scroll', this.autoStartBound, { once: true });
  }

  private tryAutoStart(): void {
    if (!this.audio || this.isMuted()) {
      return;
    }
    this.play();
  }

  toggle(): void {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  next(): void {
    if (!this.audio) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % this.tracks.length;
    this.audio.src = this.tracks[this.currentIndex].src;
    this.audio.play().catch(() => undefined);
    this.isPlaying.set(true);
    this.trackName.set(this.tracks[this.currentIndex].name);
  }

  play(): void {
    if (!this.audio) {
      return;
    }
    this.audio.play().catch(() => undefined);
    this.isPlaying.set(true);
    this.trackName.set(this.tracks[this.currentIndex].name);
  }

  pause(): void {
    if (!this.audio) {
      return;
    }
    this.audio.pause();
    this.isPlaying.set(false);
    this.trackName.set('');
  }
}
