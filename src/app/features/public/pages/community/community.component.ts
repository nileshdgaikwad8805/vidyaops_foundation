import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteContentService } from '../../../../core/services/site-content.service';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="page-hero__content">
        <p class="eyebrow">Community</p>
        <h1>Learn together. Grow together. <span class="text-gradient">Share the journey.</span></h1>
        <p>
          Our community is built on collaboration, peer learning, and shared curiosity. Join students,
          freshers, and professionals who believe in accessible tech education.
        </p>
        <div class="page-hero__chips">
          <span>Peer learning</span>
          <span>Mentorship</span>
          <span>Events</span>
          <span>Free</span>
        </div>
        <div class="page-hero__actions">
          <a routerLink="/contact" class="button button--primary">Join Community</a>
        </div>
      </div>
      <div class="hero-panel">
        <p class="hero-panel__label">Community stats</p>
        <div class="stats-grid">
          @for (stat of content.communityStats; track stat.label) {
            <div class="stat-card">
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.label }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-heading reveal">
        <p class="eyebrow">What we offer</p>
        <h2>More than just workshops. A place to belong.</h2>
      </div>
      <div class="card-grid">
        @for (card of content.communityOffer; track card.title; let i = $index) {
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
        <p class="eyebrow">Community gallery</p>
        <h2>Moments from our workshops and events.</h2>
      </div>
      <div class="gallery-grid">
        @for (item of content.gallery; track item.caption; let i = $index) {
          <div class="gallery-item reveal" [attr.data-delay]="(i * 100).toString()">
            <div class="gallery-item__placeholder">
              <span>{{ item.emoji }}</span>
              {{ item.caption }}
            </div>
          </div>
        }
      </div>
    </section>

    <section class="section">
      <div class="section-heading reveal">
        <p class="eyebrow">Testimonials</p>
        <h2>What our community members say.</h2>
      </div>
      <div class="card-grid">
        @for (t of content.testimonials; track t.author; let i = $index) {
          <article class="testimonial-card reveal" [attr.data-delay]="(i * 100).toString()">
            <p class="testimonial-card__quote">"{{ t.text }}"</p>
            <p class="testimonial-card__author">{{ t.author }}</p>
            <p class="testimonial-card__role">{{ t.role }}</p>
          </article>
        }
      </div>
    </section>

    <section class="section">
      <div class="cta-banner reveal">
        <p class="eyebrow" style="color: rgba(255,255,255,0.5);">Join us</p>
        <h2>Ready to be part of something bigger?</h2>
        <p>Join our community and start learning, sharing, and growing with peers who share your curiosity.</p>
        <a routerLink="/contact" class="button button--primary">Join the Community</a>
      </div>
    </section>
  `,
})
export class CommunityComponent {
  readonly content = inject(SiteContentService);
}
