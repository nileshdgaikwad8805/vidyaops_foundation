import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BlogService } from '../../../../core/services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-hero page-hero--center">
      <div class="page-hero__content">
        <p class="eyebrow">Blog</p>
        <h1>Free resources to guide your <span class="text-gradient">learning journey.</span></h1>
        <p>Practical guides, insights, and community stories to help you build tech skills with confidence.</p>
      </div>
    </section>

    <section class="section section--alt" style="padding-top: 48px;">
      <div class="page-shell">
        <div class="card-grid">
          @for (post of blog.sortedPosts(); track post.slug; let i = $index) {
            <article class="blog-card reveal" [attr.data-delay]="((i % 3) * 100).toString()">
              <div class="blog-card__body">
                <p class="blog-card__meta">{{ blog.formatDate(post.date) }} &middot; {{ post.readTime }}</p>
                <h3><a [routerLink]="['/blog', post.slug]">{{ post.title }}</a></h3>
                <p>{{ post.excerpt }}</p>
                <a [routerLink]="['/blog', post.slug]" class="button button--secondary">Read More</a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class BlogComponent {
  readonly blog = inject(BlogService);
}
