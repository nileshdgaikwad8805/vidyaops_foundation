import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const ACCESS_KEY = 'b28dd6d2-d64d-4bc7-b76d-603a35876e5d';

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class Web3FormsService {
  private readonly http = inject(HttpClient);

  async sendContact(payload: ContactPayload): Promise<boolean> {
    const body = {
      access_key: ACCESS_KEY,
      subject: 'New Contact Inquiry - VidyaOps Foundation',
      from_name: 'VidyaOps Foundation Website',
      ...payload,
    };
    return this.submit(body);
  }

  async sendVolunteer(formData: FormData): Promise<boolean> {
    formData.set('access_key', ACCESS_KEY);
    formData.set('subject', 'New Volunteer Application - VidyaOps Foundation');
    formData.set('from_name', 'VidyaOps Foundation Website');
    return this.submitFormData(formData);
  }

  private async submit(body: Record<string, string>): Promise<boolean> {
    try {
      const res = await firstValueFrom(
        this.http.post<{ success: boolean }>('https://api.web3forms.com/submit', body),
      );
      return res?.success === true;
    } catch {
      return false;
    }
  }

  private async submitFormData(formData: FormData): Promise<boolean> {
    try {
      const res = await firstValueFrom(
        this.http.post<{ success: boolean }>('https://api.web3forms.com/submit', formData),
      );
      return res?.success === true;
    } catch {
      return false;
    }
  }

  buildMailtoContact(p: ContactPayload): string {
    const subject = encodeURIComponent('Foundation Contact Inquiry');
    const body = encodeURIComponent(
      [
        `Name: ${p.name}`,
        `Email: ${p.email}`,
        `Phone: ${p.phone || '-'}`,
        `Interest: ${p.interest}`,
        `Message: ${p.message}`,
      ].join('\n'),
    );
    return `mailto:info@vidyaopsfoundation.com?subject=${subject}&body=${body}`;
  }

  buildWhatsappContact(p: ContactPayload): string {
    const text = encodeURIComponent(
      `Foundation Contact Inquiry\n\nName: ${p.name}\nEmail: ${p.email}\nPhone: ${p.phone || '-'}\nInterest: ${p.interest}\nMessage: ${p.message}`,
    );
    return `https://wa.me/919503685152?text=${text}`;
  }
}
