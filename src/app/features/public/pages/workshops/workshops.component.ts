import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteContentService } from '../../../../core/services/site-content.service';

@Component({
  selector: 'app-workshops',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-hero page-hero--center">
      <div class="page-hero__content">
        <p class="eyebrow">Free Workshops</p>
        <h1>Practical tech workshops. <span class="text-gradient">Zero cost. Real skills.</span></h1>
        <p>All VidyaOps Foundation workshops are completely free. No hidden fees, no premium tiers. Just hands-on learning guided by experienced mentors.</p>
        <div class="page-hero__chips" style="justify-content:center;">
          <span>Cloud</span>
          <span>AI</span>
          <span>Data</span>
          <span>Security</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-heading reveal">
        <p class="eyebrow">Upcoming workshops</p>
        <h2>Choose your path and start learning.</h2>
        <p>All workshops are free and open to everyone. No prior experience required.</p>
      </div>
      <div class="card-grid">
        @for (ws of content.workshops; track ws.title; let i = $index) {
          <article class="card reveal" [attr.data-delay]="((i % 2) * 100).toString()">
            <p class="card__label">{{ ws.label }}</p>
            <h3>{{ ws.title }}</h3>
            <p>{{ ws.text }}</p>
            <strong class="card__price">Free</strong>
            <ul class="card__list">
              @for (item of ws.list; track item) {
                <li>{{ item }}</li>
              }
            </ul>
            <a routerLink="/contact" class="button button--secondary">Register Free</a>
          </article>
        }
      </div>
    </section>

    <section class="section">
      <div class="cta-banner reveal">
        <p class="eyebrow" style="color: rgba(255,255,255,0.5);">Not sure which workshop fits you?</p>
        <h2>We will help you find the right starting point.</h2>
        <p>Tell us about your background and interests, and we will recommend the best workshop for your goals.</p>
        <a routerLink="/contact" class="button button--primary">Get Recommendations</a>
      </div>
    </section>
  `,
})
export class WorkshopsComponent {
  readonly content = inject(SiteContentService);
}
