import { Component, inject } from '@angular/core';

import { SiteContentService } from '../../../../core/services/site-content.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <section class="section legal-page">
      <p class="eyebrow">Legal</p>
      <h1>Privacy Policy</h1>
      <em class="legal-date">Last updated: July 9, 2026</em>
      @for (section of content.privacySections; track section.heading) {
        <h2>{{ section.heading }}</h2>
        <p>{{ section.body }}</p>
      }
    </section>
  `,
})
export class PrivacyComponent {
  readonly content = inject(SiteContentService);
}
