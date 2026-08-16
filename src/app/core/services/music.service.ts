import { Injectable, signal } from '@angular/core';

interface Track {
  src: string;
  name: string;
}

const TARGET_VOLUME = 0.14;
const FADE_STEP = 0.02;
const FADE_INTERVAL_MS = 80;

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
  private fadeTimer: ReturnType<typeof setInterval> | null = null;
  private readonly autoStartBound = (): void => this.tryAutoStart();

  readonly isPlaying = signal(false);
  readonly trackName = signal('');
  readonly isMuted = signal(false);

  constructor() {
    this.audio = new Audio(this.tracks[0].src);
    this.audio.loop = false;
    this.audio.volume = 0;
    this.audio.addEventListener('ended', () => this.next());

    document.addEventListener('click', this.autoStartBound, { once: true });
    document.addEventListener('touchstart', this.autoStartBound, { once: true });
    document.addEventListener('scroll', this.autoStartBound, { once: true });
  }

  private clearFade(): void {
    if (this.fadeTimer) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }
  }

  private fadeIn(): void {
    if (!this.audio) {
      return;
    }
    this.clearFade();
    this.audio.volume = 0;
    this.audio.play().catch(() => undefined);
    this.fadeTimer = setInterval(() => {
      if (!this.audio) {
        this.clearFade();
        return;
      }
      const next = Math.min(this.audio.volume + FADE_STEP, TARGET_VOLUME);
      this.audio.volume = next;
      if (next >= TARGET_VOLUME) {
        this.clearFade();
      }
    }, FADE_INTERVAL_MS);
  }

  private fadeOut(onDone?: () => void): void {
    if (!this.audio) {
      onDone?.();
      return;
    }
    this.clearFade();
    this.fadeTimer = setInterval(() => {
      if (!this.audio) {
        this.clearFade();
        onDone?.();
        return;
      }
      const next = this.audio.volume - FADE_STEP;
      if (next <= 0) {
        this.audio.volume = 0;
        this.audio.pause();
        this.clearFade();
        onDone?.();
      } else {
        this.audio.volume = next;
      }
    }, FADE_INTERVAL_MS);
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
    this.fadeOut(() => {
      if (!this.audio) {
        return;
      }
      this.currentIndex = (this.currentIndex + 1) % this.tracks.length;
      this.audio.src = this.tracks[this.currentIndex].src;
      this.isPlaying.set(true);
      this.trackName.set(this.tracks[this.currentIndex].name);
      this.fadeIn();
    });
  }

  play(): void {
    if (!this.audio) {
      return;
    }
    this.isPlaying.set(true);
    this.trackName.set(this.tracks[this.currentIndex].name);
    this.fadeIn();
  }

  pause(): void {
    if (!this.audio) {
      return;
    }
    this.isPlaying.set(false);
    this.trackName.set('');
    this.fadeOut();
  }
}
