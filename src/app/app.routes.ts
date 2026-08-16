import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/site-shell/site-shell.component').then((m) => m.SiteShellComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/public/pages/home/home.component').then((m) => m.HomeComponent),
        data: { title: 'VidyaOps Foundation | Free Tech Education & Community' },
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/public/pages/about/about.component').then((m) => m.AboutComponent),
        data: { title: 'About | VidyaOps Foundation' },
      },
      {
        path: 'workshops',
        loadComponent: () =>
          import('./features/public/pages/workshops/workshops.component').then(
            (m) => m.WorkshopsComponent,
          ),
        data: { title: 'Free Workshops | VidyaOps Foundation' },
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./features/public/pages/blog/blog.component').then((m) => m.BlogComponent),
        data: { title: 'Blog | VidyaOps Foundation' },
      },
      {
        path: 'blog/:slug',
        loadComponent: () =>
          import('./features/public/pages/blog-detail/blog-detail.component').then(
            (m) => m.BlogDetailComponent,
          ),
        data: { title: 'Blog | VidyaOps Foundation' },
      },
      {
        path: 'community',
        loadComponent: () =>
          import('./features/public/pages/community/community.component').then(
            (m) => m.CommunityComponent,
          ),
        data: { title: 'Community | VidyaOps Foundation' },
      },
      {
        path: 'volunteer',
        loadComponent: () =>
          import('./features/public/pages/volunteer/volunteer.component').then(
            (m) => m.VolunteerComponent,
          ),
        data: { title: 'Volunteer | VidyaOps Foundation' },
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/public/pages/contact/contact.component').then(
            (m) => m.ContactComponent,
          ),
        data: { title: 'Contact | VidyaOps Foundation' },
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('./features/public/pages/faq/faq.component').then((m) => m.FaqComponent),
        data: { title: 'FAQ | VidyaOps Foundation' },
      },
      {
        path: 'privacy',
        loadComponent: () =>
          import('./features/public/pages/privacy/privacy.component').then((m) => m.PrivacyComponent),
        data: { title: 'Privacy Policy | VidyaOps Foundation' },
      },
      {
        path: 'terms',
        loadComponent: () =>
          import('./features/public/pages/terms/terms.component').then((m) => m.TermsComponent),
        data: { title: 'Terms of Service | VidyaOps Foundation' },
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/public/pages/not-found/not-found.component').then(
            (m) => m.NotFoundComponent,
          ),
        data: { title: 'Page Not Found | VidyaOps Foundation' },
      },
    ],
  },
];
