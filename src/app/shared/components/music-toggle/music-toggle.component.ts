import { Component, inject } from '@angular/core';

import { MusicService } from '../../../core/services/music.service';

@Component({
  selector: 'app-music-toggle',
  standalone: true,
  template: `
    <button
      class="music-toggle"
      [class.is-playing]="music.isPlaying()"
      (click)="toggle()"
      (dblclick)="music.next()"
      [attr.aria-label]="music.isPlaying() ? 'Pause devotional music' : 'Play devotional music'"
      [title]="music.trackName() || 'Play devotional music'"
      type="button"
    >&#9835;</button>
  `,
})
export class MusicToggleComponent {
  readonly music = inject(MusicService);

  toggle(): void {
    this.music.toggle();
  }
}
