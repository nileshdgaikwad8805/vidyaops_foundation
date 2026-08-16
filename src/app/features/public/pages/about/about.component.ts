import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteContentService } from '../../../../core/services/site-content.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="page-hero__content">
        <p class="eyebrow">About the Foundation</p>
        <h1>Free tech education built on <span class="text-gradient">community and practical learning.</span></h1>
        <p>
          VidyaOps Foundation is the non-profit arm of VidyaOps, focused entirely on providing free
          technology education, community workshops, and learning resources to students, freshers,
          and knowledge seekers who want to build skills without financial barriers.
        </p>
        <div class="page-hero__chips">
          <span>100% free</span>
          <span>Pune based</span>
          <span>Community driven</span>
        </div>
      </div>
      <div class="hero-panel">
        <p class="hero-panel__label">Our philosophy</p>
        <strong class="hero-panel__highlight">Knowledge should not have a price tag.</strong>
        <ul class="hero-panel__list">
          <li>All workshops and resources are free</li>
          <li>No premium tiers or hidden charges</li>
          <li>Open to students, freshers, and professionals</li>
          <li>Community support and mentorship included</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="section-heading reveal">
        <p class="eyebrow">Our story</p>
        <h2>Built from a belief that everyone deserves access to tech education.</h2>
        <p>
          VidyaOps Foundation was created to solve a simple problem: quality tech education is too
          expensive and too fragmented. We started with free community workshops in Pune and have
          grown into structured learning paths in Cloud, AI, Data Analysis, and Cybersecurity — all free.
        </p>
      </div>
      <div class="card-grid">
        @for (card of content.aboutStory; track card.title; let i = $index) {
          <article class="card reveal" [attr.data-delay]="(i * 100).toString()">
            <p class="card__label">{{ card.label }}</p>
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
          </article>
        }
      </div>
    </section>

    <section class="section">
      <div class="section-heading reveal">
        <p class="eyebrow">Domains we cover</p>
        <h2>Four high-demand technology areas, completely free.</h2>
      </div>
      <div class="card-grid">
        @for (card of content.aboutDomains; track card.title; let i = $index) {
          <article class="card reveal" [attr.data-delay]="(i * 100).toString()">
            <p class="card__label">{{ card.label }}</p>
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
          </article>
        }
      </div>
    </section>

    <section class="section">
      <div class="cta-banner reveal">
        <p class="eyebrow" style="color: rgba(255,255,255,0.5);">Get involved</p>
        <h2>Start learning with us today. It is free.</h2>
        <p>No enrollment fees. No commitments. Just practical learning and a supportive community.</p>
        <a routerLink="/workshops" class="button button--primary">Browse Free Workshops</a>
      </div>
    </section>
  `,
})
export class AboutComponent {
  readonly content = inject(SiteContentService);
}
