import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="error-page">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has been moved. Let us help you find your way back.</p>
      <a routerLink="/" class="button button--primary">Return Home</a>
    </section>
  `,
})
export class NotFoundComponent {}
