import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SiteContentService } from '../../../../core/services/site-content.service';
import { Web3FormsService } from '../../../../core/services/web3forms.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="page-hero page-hero--center">
      <div class="page-hero__content">
        <p class="eyebrow">Contact &amp; Register</p>
        <h1>We would love to <span class="text-gradient">hear from you.</span></h1>
        <p>
          Whether you want to register for a free workshop, join the community, partner with us,
          or just ask a question — reach out.
        </p>
      </div>
    </section>

    <section class="section" style="padding-top: 1rem;">
      <div class="contact-grid">
        <div>
          <div class="section-heading reveal">
            <p class="eyebrow">Get in touch</p>
            <h2>Register for workshops, join the community, or ask us anything.</h2>
          </div>
          <p style="color:var(--warm-brown-light);margin-bottom:1.5rem;">You can also reach us directly:</p>
          @for (detail of content.contactDetails; track detail.label) {
            <div class="contact-detail">
              <span class="contact-detail__icon">{{ detail.icon }}</span>
              <div>
                <p class="contact-detail__label">{{ detail.label }}</p>
                @if (detail.href) {
                  <a [href]="detail.href" [target]="detail.external ? '_blank' : '_self'" [rel]="detail.external ? 'noreferrer' : ''">
                    <p class="contact-detail__value">{{ detail.value }}</p>
                  </a>
                } @else {
                  <p class="contact-detail__value">{{ detail.value }}</p>
                }
              </div>
            </div>
          }
        </div>

        <div class="form-card reveal">
          <label for="c-name">Full Name</label>
          <input id="c-name" type="text" name="name" required placeholder="Your full name" [(ngModel)]="form.name">

          <label for="c-email">Email</label>
          <input id="c-email" type="email" name="email" required placeholder="you@@example.com" [(ngModel)]="form.email">

          <label for="c-phone">Phone</label>
          <input id="c-phone" type="tel" name="phone" placeholder="Your phone number" [(ngModel)]="form.phone">

          <label for="c-interest">I am interested in</label>
          <select id="c-interest" name="interest" required [(ngModel)]="form.interest">
            <option value="" disabled selected>Select interest</option>
            @for (option of content.interestOptions; track option) {
              <option [value]="option">{{ option }}</option>
            }
          </select>

          <label for="c-message">Message</label>
          <textarea id="c-message" name="message" rows="4" required placeholder="Tell us about yourself or ask a question..." [(ngModel)]="form.message"></textarea>

          <div
            class="form-feedback"
            [class.form-feedback--visible]="feedback !== ''"
            [class.form-feedback--success]="feedbackType === 'success'"
            [class.form-feedback--error]="feedbackType === 'error'"
          >{{ feedback }}</div>

          @if (feedbackType === 'error') {
            <div class="form-fallback">
              <a [href]="mailtoLink()" class="button button--secondary">Send via Email</a>
              <a [href]="whatsappLink()" target="_blank" rel="noreferrer" class="button button--primary">Send via WhatsApp</a>
            </div>
          }

          <button type="submit" class="button button--primary" [disabled]="sending" (click)="submit()">
            {{ sending ? 'Sending...' : 'Send Message' }}
          </button>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  readonly content = inject(SiteContentService);
  private readonly web3 = inject(Web3FormsService);

  form = {
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  };

  sending = false;
  feedback = '';
  feedbackType: 'success' | 'error' = 'success';

  async submit(): Promise<void> {
    if (!this.form.name.trim() || !this.form.email.trim() || !this.form.interest || !this.form.message.trim()) {
      this.feedback = 'Please fill in all required fields.';
      this.feedbackType = 'error';
      return;
    }

    this.sending = true;
    this.feedback = '';
    const ok = await this.web3.sendContact(this.form);
    this.sending = false;

    if (ok) {
      this.feedback = 'Thank you! We will get back to you shortly.';
      this.feedbackType = 'success';
      this.form = { name: '', email: '', phone: '', interest: '', message: '' };
    } else {
      this.feedback = 'Something went wrong. Please try again or use the options below:';
      this.feedbackType = 'error';
    }
  }

  mailtoLink(): string {
    return this.web3.buildMailtoContact(this.form);
  }

  whatsappLink(): string {
    return this.web3.buildWhatsappContact(this.form);
  }
}
