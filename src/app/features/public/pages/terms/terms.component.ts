import { Component, inject } from '@angular/core';

import { SiteContentService } from '../../../../core/services/site-content.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <section class="section legal-page">
      <p class="eyebrow">Legal</p>
      <h1>Terms of Service</h1>
      <em class="legal-date">Last updated: July 9, 2026</em>
      @for (section of content.termsSections; track section.heading) {
        <h2>{{ section.heading }}</h2>
        <p>{{ section.body }}</p>
      }
    </section>
  `,
})
export class TermsComponent {
  readonly content = inject(SiteContentService);
}
