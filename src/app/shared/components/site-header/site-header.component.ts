import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

import { SiteContentService } from '../../../core/services/site-content.service';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="page-shell" style="display:flex;align-items:center;justify-content:space-between;gap:24px;width:100%;">
        <a class="brand-mark" routerLink="/">
          <span class="brand-mark__icon"><img src="assets/vidyaops-logo.jpeg" alt="VidyaOps Foundation logo"></span>
          <span class="brand-mark__text">
            <span class="brand-mark__name">VidyaOps Foundation</span>
            <span class="brand-mark__tag">Knowledge is the power.</span>
          </span>
        </a>

        <button class="nav-toggle" [class.is-open]="navOpen" (click)="toggleNav()" type="button" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>

        <nav class="site-nav" [class.is-open]="navOpen">
          @for (link of content.navLinks; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="is-active"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
              (click)="closeOnMobile()"
            >{{ link.label }}</a>
          }
        </nav>
      </div>
    </header>
  `,
})
export class SiteHeaderComponent {
  readonly content = inject(SiteContentService);
  private readonly router = inject(Router);
  navOpen = false;

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  closeOnMobile(): void {
    this.navOpen = false;
    this.router.navigate([this.router.url]);
  }
}
