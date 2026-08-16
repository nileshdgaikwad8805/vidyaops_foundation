import { Component, inject } from '@angular/core';

import { SiteContentService } from '../../../core/services/site-content.service';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  template: `
    <a class="whatsapp-float" [href]="content.whatsappLink" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"></a>
  `,
})
export class WhatsappFloatComponent {
  readonly content = inject(SiteContentService);
}
