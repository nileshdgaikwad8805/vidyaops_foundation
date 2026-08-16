import { Component } from '@angular/core';

@Component({
  selector: 'app-sacred-divider',
  standalone: true,
  template: `
    <div class="sacred-divider">
      <span class="sacred-divider__line"></span>
      <span class="sacred-divider__icon" aria-hidden="true">&#x2248;</span>
      <span class="sacred-divider__line"></span>
    </div>
  `,
})
export class SacredDividerComponent {}
