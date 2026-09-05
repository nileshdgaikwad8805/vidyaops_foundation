import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteContentService } from '../../../../core/services/site-content.service';
import { BlogService } from '../../../../core/services/blog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="home-hero">
      <div class="page-shell home-hero__inner">
        <p class="eyebrow">VidyaOps Foundation</p>
        <h1>Free tech education.<br />Real community.<br /><span class="text-gradient">No barriers.</span></h1>
        <p>
          We believe learning technology should be accessible to everyone.
          VidyaOps Foundation offers free workshops, community events, and
          educational resources for students and professionals in Pune and beyond.
        </p>
        <div class="home-hero__actions">
          <a routerLink="/workshops" class="button button--primary">Explore Free Workshops</a>
          <a routerLink="/contact" class="button button--secondary">Join Community</a>
        </div>
        <div class="home-hero__signals">
          <span><strong>Free</strong> Workshops</span>
          <span><strong>Community</strong> Driven</span>
          <span><strong>Open</strong> to All</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="page-shell">
        <div class="section-heading reveal">
          <p class="eyebrow">Our mission</p>
          <h2>Making technology education free, practical, and community-led.</h2>
          <p>VidyaOps Foundation removes financial and knowledge barriers that keep learners from exploring careers in Cloud, AI, Data Analysis, and Cybersecurity.</p>
        </div>
        <div class="card-grid">
          @for (card of content.coreValues; track card.title; let i = $index) {
            <article class="card reveal" [attr.data-delay]="(i * 100).toString()">
              <p class="card__label">{{ card.label }}</p>
              <h3>{{ card.title }}</h3>
              <p>{{ card.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="page-shell">
        <div class="section-heading reveal">
          <p class="eyebrow">Workshops</p>
          <h2>Free workshops to help you start your tech journey.</h2>
          <p>All workshops are free and open to everyone. No prior experience required.</p>
        </div>
        <div class="card-grid">
          @for (card of content.homeWorkshops; track card.title; let i = $index) {
            <article class="card reveal" [attr.data-delay]="(i * 100).toString()">
              <p class="card__label">{{ card.label }}</p>
              <h3>{{ card.title }}</h3>
              <p>{{ card.text }}</p>
              <a routerLink="/workshops" class="button button--secondary">View Details</a>
            </article>
          }
        </div>
        <div class="text-center" style="margin-top: 2.5rem;">
          <a routerLink="/workshops" class="button button--primary">See All Workshops</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="page-shell">
        <div class="section-heading reveal">
          <p class="eyebrow">Blog</p>
          <h2>Free educational resources and insights.</h2>
        </div>
        <div class="card-grid">
          @for (post of featuredPosts(); track $index; let i = $index) {
            <article class="blog-card reveal" [attr.data-delay]="(i * 100).toString()">
              <div class="blog-card__body">
                <p class="blog-card__meta">{{ blog.formatDate(post.date) }} &middot; {{ post.readTime }} read</p>
                <h3><a [routerLink]="['/blog', post.slug]">{{ post.title }}</a></h3>
                <p>{{ post.excerpt }}</p>
                <a [routerLink]="['/blog', post.slug]" class="button button--ghost">Read More</a>
              </div>
            </article>
          }
        </div>
        <div class="text-center" style="margin-top: 2.5rem;">
          <a routerLink="/blog" class="button button--secondary">Read All Posts</a>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="page-shell">
        <div class="cta-banner reveal">
          <p class="eyebrow" style="color: rgba(255,255,255,0.55);">Join the community</p>
          <h2>Learn, share, and grow with fellow tech enthusiasts.</h2>
          <p>Our community is free and open to all. Join WhatsApp, attend events, and connect with mentors who care about your growth.</p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a routerLink="/contact" class="button button--primary">Join Now</a>
            <a routerLink="/community" class="button button--secondary" style="background: rgba(255,255,255,0.1); color: white; border-color: rgba(255,255,255,0.2);">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  readonly content = inject(SiteContentService);
  readonly blog = inject(BlogService);
  readonly featuredPosts = computed(() => this.blog.sortedPosts().slice(0, 3));
}