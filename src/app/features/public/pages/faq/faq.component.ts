import { Component, inject } from '@angular/core';

import { SiteContentService } from '../../../../core/services/site-content.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  template: `
    <section class="section legal-page">
      <p class="eyebrow">Help Center</p>
      <h1>Frequently Asked Questions</h1>
      <div class="faq-list">
        @for (faq of content.faqs; track faq.question; let i = $index) {
          <div class="faq-item reveal" [attr.data-delay]="((i % 3) * 100).toString()">
            <h3>{{ faq.question }}</h3>
            <p>{{ faq.answer }}</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class FaqComponent {
  readonly content = inject(SiteContentService);
}
