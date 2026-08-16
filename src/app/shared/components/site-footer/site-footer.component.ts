import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteContentService } from '../../../core/services/site-content.service';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="page-shell">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand-mark" routerLink="/">
              <span class="brand-mark__icon" style="width:34px;height:34px;"><img src="assets/vidyaops-logo.jpeg" alt=""></span>
              <span class="brand-mark__text">
                <span class="brand-mark__name" style="font-size:0.9rem;">VidyaOps Foundation</span>
                <span class="brand-mark__tag">Knowledge is the power.</span>
              </span>
            </a>
            <p>Free tech education and community for students, freshers, and knowledge seekers. Based in Pune, Maharashtra.</p>
          </div>

          <div class="footer-col">
            <h4>Pages</h4>
            @for (link of content.navLinks; track link.path) {
              <a [routerLink]="link.path">{{ link.label }}</a>
            }
          </div>

          <div class="footer-col">
            <h4>Domains</h4>
            @for (domain of content.footerDomains; track domain) {
              <a routerLink="/workshops">{{ domain }}</a>
            }
          </div>

          <div class="footer-col">
            <h4>Connect</h4>
            <a routerLink="/contact">Contact Us</a>
            <a [href]="content.whatsappLink" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="mailto:{{ content.contactEmail }}">Email</a>
            <a href="https://vidyaops.com" target="_blank" rel="noreferrer">VidyaOps</a>
          </div>
        </div>
        <div class="footer-om">&#x0950;</div>
        <div class="footer-bottom">
          <span>&copy; 2026 VidyaOps Foundation. Pune, Maharashtra.</span>
          <span><a routerLink="/privacy">Privacy</a> &middot; <a routerLink="/terms">Terms</a> &middot; <a href="https://vidyaops.com" target="_blank" rel="noreferrer">Main Site</a></span>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {
  readonly content = inject(SiteContentService);
}
