import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { BlogService } from '../../../../core/services/blog.service';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterLink, SafeHtmlPipe],
  template: `
    @if (post) {
      <article class="blog-article reveal is-visible">
        <p class="eyebrow">{{ post.category }}</p>
        <h1>{{ post.title }}</h1>
        <p class="meta">{{ blog.formatDate(post.date) }} &middot; {{ post.readTime }}</p>

        <div [innerHTML]="post.content | safeHtml"></div>

        <div class="divider"></div>
        <a routerLink="/blog" class="button button--secondary">&larr; Back to Blog</a>
      </article>
    } @else {
      <article class="blog-article">
        <h1>Post not found</h1>
        <p>The post you are looking for does not exist or has been moved.</p>
        <a routerLink="/blog" class="button button--primary">Back to Blog</a>
      </article>
    }
  `,
})
export class BlogDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly blog = inject(BlogService);
  readonly post = this.blog.getBySlug(this.route.snapshot.paramMap.get('slug') ?? '');
}
