import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SiteContentService } from '../../../../core/services/site-content.service';
import { Web3FormsService } from '../../../../core/services/web3forms.service';

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="section" style="padding-top: 5rem;">
      <div class="section-heading reveal">
        <p class="eyebrow">Community Leadership</p>
        <h1 style="font-family:var(--font-heading);font-size:2.4rem;font-weight:800;color:var(--warm-brown);letter-spacing:-0.02em;margin-bottom:0.75rem;">Become a Volunteer</h1>
        <p>Share your expertise with learners who need it most. We handle the logistics so you can focus on teaching.</p>
      </div>

      <div class="volunteer-layout">
        <div class="vol-left">
          <h3>Why Volunteer?</h3>
          <p>At VidyaOps Foundation, we help community-minded professionals give back without the administrative burden.</p>
          @for (benefit of content.volunteerBenefits; track benefit.num; let i = $index) {
            <div class="vol-benefit reveal" [attr.data-delay]="(i * 100).toString()">
              <span class="vol-benefit__num">{{ benefit.num }}</span>
              <div>
                <strong>{{ benefit.title }}</strong>
                <p>{{ benefit.text }}</p>
              </div>
            </div>
          }
        </div>

        <div class="vol-right">
          @if (!submitted) {
            <div class="form-card">
              <label for="name">Full Name</label>
              <input id="name" type="text" name="name" required placeholder="Jane Doe" [(ngModel)]="form.name">

              <label for="email">Email Address</label>
              <input id="email" type="email" name="email" required placeholder="jane@@example.com" [(ngModel)]="form.email">

              <label for="phone">Phone Number</label>
              <input id="phone" type="tel" name="phone" required placeholder="+91 90000 00000" [(ngModel)]="form.phone">

              <label for="linkedin">LinkedIn URL</label>
              <input id="linkedin" type="text" name="linkedin_url" required placeholder="linkedin.com/in/username" [(ngModel)]="form.linkedin">

              <label for="topic">Topic of Choice</label>
              <textarea id="topic" name="topic_of_choice" rows="3" required placeholder="What specific technology or topic will you teach? (e.g., Intro to AWS S3, Python Pandas for Beginners)" [(ngModel)]="form.topic"></textarea>

              <label for="photo">Professional Photograph</label>
              <div class="file-input-wrapper">
                <input id="photo" type="file" name="photo" accept=".jpg,.jpeg,.png" (change)="onPhoto($event)">
              </div>
              <p class="form-note">This will be used in promotional materials for your session.</p>

              <label for="resume">Your Resume</label>
              <div class="file-input-wrapper">
                <input id="resume" type="file" name="resume" accept=".pdf" (change)="onResume($event)">
              </div>

              <div id="form-error" class="form-feedback form-feedback--error" [class.form-feedback--visible]="errorMessage !== ''">{{ errorMessage }}</div>

              <button type="submit" class="button button--primary" [disabled]="sending" (click)="submit()">
                {{ sending ? 'Submitting...' : 'Submit Application' }}
              </button>
            </div>
          } @else {
            <div class="form-card" style="text-align:center;padding:3rem 2rem;">
              <h2 style="font-family:var(--font-heading);font-weight:700;color:var(--warm-brown);margin-bottom:0.75rem;">Application Submitted!</h2>
              <p style="color:var(--warm-brown-light);">Thank you for stepping up to lead. Our team will review your profile and reach out within 48 hours.</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class VolunteerComponent {
  readonly content = inject(SiteContentService);
  private readonly web3 = inject(Web3FormsService);

  form = {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    topic: '',
  };

  photoFile: File | null = null;
  resumeFile: File | null = null;
  sending = false;
  submitted = false;
  errorMessage = '';

  onPhoto(e: Event): void {
    const el = e.target as HTMLInputElement;
    this.photoFile = el.files?.[0] ?? null;
  }

  onResume(e: Event): void {
    const el = e.target as HTMLInputElement;
    this.resumeFile = el.files?.[0] ?? null;
  }

  async submit(): Promise<void> {
    this.errorMessage = '';

    if (
      !this.form.name.trim() ||
      !this.form.email.trim() ||
      !this.form.phone.trim() ||
      !this.form.linkedin.trim() ||
      !this.form.topic.trim()
    ) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.sending = true;
    const fd = new FormData();
    fd.set('name', this.form.name);
    fd.set('email', this.form.email);
    fd.set('phone', this.form.phone);
    fd.set('linkedin_url', this.form.linkedin);
    fd.set('topic_of_choice', this.form.topic);
    if (this.photoFile) {
      fd.set('photo', this.photoFile);
    }
    if (this.resumeFile) {
      fd.set('resume', this.resumeFile);
    }

    const ok = await this.web3.sendVolunteer(fd);
    this.sending = false;

    if (ok) {
      this.submitted = true;
    } else {
      this.errorMessage =
        'Something went wrong. Please try again or use the options below.';
    }
  }
}
