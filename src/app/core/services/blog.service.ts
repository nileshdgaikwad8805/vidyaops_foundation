import { Injectable, computed, signal } from '@angular/core';

import { BLOG_POSTS } from '../data/blog-posts.data';
import { BlogPost } from '../models/site.models';

@Injectable({ providedIn: 'root' })
export class BlogService {
  readonly posts = signal<BlogPost[]>(BLOG_POSTS);

  readonly sortedPosts = computed(() =>
    [...this.posts()].sort((a, b) => b.date.localeCompare(a.date)),
  );

  getBySlug(slug: string): BlogPost | undefined {
    return this.posts().find((p) => p.slug === slug);
  }

  formatDate(date: string): string {
    const [y, m, d] = date.split('-').map(Number);
    if (!y || !m || !d) {
      return date;
    }
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
