import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { BLOG_POSTS } from '../data/blog-posts.data';
import { BlogPost } from '../models/site.models';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly http = inject(HttpClient);

  readonly posts = signal<BlogPost[]>(BLOG_POSTS);
  readonly loaded = signal(false);

  readonly sortedPosts = computed(() =>
    [...this.posts()].sort((a, b) => b.date.localeCompare(a.date)),
  );

  constructor() {
    this.load();
  }

  private async load(): Promise<void> {
    if (this.loaded()) {
      return;
    }
    try {
      const remote = await firstValueFrom(
        this.http.get<BlogPost[]>('assets/blog-posts.json'),
      );
      if (Array.isArray(remote) && remote.length) {
        this.posts.set(remote);
      }
    } catch {
      // fall back to embedded data
    } finally {
      this.loaded.set(true);
    }
  }

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
