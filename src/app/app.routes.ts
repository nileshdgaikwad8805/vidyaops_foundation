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
        data: { title: 'VidyaOps Foundation | Free Tech Education & Community', description: 'Free tech workshops, community learning, and educational resources for students, freshers, and knowledge seekers.' },
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/public/pages/about/about.component').then((m) => m.AboutComponent),
        data: { title: 'About | VidyaOps Foundation', description: 'VidyaOps Foundation is the non-profit arm of VidyaOps, providing free technology education and community workshops. Learn about our mission.' },
      },
      {
        path: 'workshops',
        loadComponent: () =>
          import('./features/public/pages/workshops/workshops.component').then(
            (m) => m.WorkshopsComponent,
          ),
        data: { title: 'Free Workshops | VidyaOps Foundation', description: 'All VidyaOps Foundation workshops are completely free. Cloud, AI, Data Analysis, and Cybersecurity — no prior experience needed.' },
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./features/public/pages/blog/blog.component').then((m) => m.BlogComponent),
        data: { title: 'Blog | VidyaOps Foundation', description: 'Free educational resources and beginner-friendly guides to help you build tech skills with confidence.' },
      },
      {
        path: 'blog/:slug',
        loadComponent: () =>
          import('./features/public/pages/blog-detail/blog-detail.component').then(
            (m) => m.BlogDetailComponent,
          ),
        data: { title: 'Blog | VidyaOps Foundation', description: 'Free educational resources and beginner-friendly guides to help you build tech skills with confidence.' },
      },
      {
        path: 'community',
        loadComponent: () =>
          import('./features/public/pages/community/community.component').then(
            (m) => m.CommunityComponent,
          ),
        data: { title: 'Community | VidyaOps Foundation', description: 'Join the VidyaOps Foundation community — peer learning, mentorship, events, and shared resources. Free and open to all.' },
      },
      {
        path: 'volunteer',
        loadComponent: () =>
          import('./features/public/pages/volunteer/volunteer.component').then(
            (m) => m.VolunteerComponent,
          ),
        data: { title: 'Volunteer | VidyaOps Foundation', description: 'Share your expertise with learners who need it most. VidyaOps Foundation helps community-minded professionals give back.' },
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/public/pages/contact/contact.component').then(
            (m) => m.ContactComponent,
          ),
        data: { title: 'Contact | VidyaOps Foundation', description: 'Register for free workshops, join the community, or ask us anything. Reach out to VidyaOps Foundation today.' },
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('./features/public/pages/faq/faq.component').then((m) => m.FaqComponent),
        data: { title: 'FAQ | VidyaOps Foundation', description: 'Frequently asked questions about VidyaOps Foundation workshops, community, certificates, and registration.' },
      },
      {
        path: 'privacy',
        loadComponent: () =>
          import('./features/public/pages/privacy/privacy.component').then((m) => m.PrivacyComponent),
        data: { title: 'Privacy Policy | VidyaOps Foundation', description: 'How VidyaOps Foundation collects, uses, and protects your information.' },
      },
      {
        path: 'terms',
        loadComponent: () =>
          import('./features/public/pages/terms/terms.component').then((m) => m.TermsComponent),
        data: { title: 'Terms of Service | VidyaOps Foundation', description: 'Terms of service for using the VidyaOps Foundation website and programs.' },
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/public/pages/not-found/not-found.component').then(
            (m) => m.NotFoundComponent,
          ),
        data: { title: 'Page Not Found | VidyaOps Foundation', description: 'The page you are looking for does not exist or has been moved.' },
      },
    ],
  },
];
