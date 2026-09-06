import { Component, inject, afterNextRender } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { SiteFooterComponent } from '../../components/site-footer/site-footer.component';
import { MusicToggleComponent } from '../../components/music-toggle/music-toggle.component';
import { WhatsappFloatComponent } from '../../components/whatsapp-float/whatsapp-float.component';

@Component({
  selector: 'app-site-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    SiteHeaderComponent,
    SiteFooterComponent,
    MusicToggleComponent,
    WhatsappFloatComponent,
  ],
  template: `
    <app-site-header />

    <main class="page-shell">
      <router-outlet />
    </main>

    <app-site-footer />

    <app-whatsapp-float />
    <app-music-toggle />
  `,
})
export class SiteShellComponent {
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  constructor() {
    afterNextRender(() => {
      this.router.events
        .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
        .subscribe(() => {
          const route = this.router.routerState.root;
          const data = this.findData(route);
          if (data && data['title']) {
            this.title.setTitle(data['title']);
          }
          this.initScrollReveal();
          setTimeout(() => this.initScrollReveal(), 150);
        });
      this.initScrollReveal();
    });
  }

  private findData(route: any): any {
    let r = route;
    while (r.firstChild) {
      r = r.firstChild;
    }
    return r.snapshot?.data ?? {};
  }

  private initScrollReveal(): void {
    setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
      if (!els.length) {
        return;
      }
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.05, rootMargin: '0px 0px -20px 0px' },
      );
      for (const el of Array.from(els)) {
        obs.observe(el);
      }
    }, 0);
  }
}
