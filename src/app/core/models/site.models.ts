export interface NavLink {
  label: string;
  path: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface CardItem {
  label: string;
  title: string;
  text: string;
}

export interface WorkshopCard extends CardItem {
  list: string[];
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  domain: string;
  content: string;
}

export interface ContactDetail {
  icon: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

export interface LegalSection {
  heading: string;
  body: string;
}
