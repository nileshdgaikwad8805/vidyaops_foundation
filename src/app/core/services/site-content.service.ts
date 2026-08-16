import { Injectable } from '@angular/core';

import {
  CardItem,
  ContactDetail,
  FaqItem,
  LegalSection,
  NavLink,
  StatItem,
  Testimonial,
  WorkshopCard,
} from '../models/site.models';

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Workshops', path: '/workshops' },
    { label: 'Blog', path: '/blog' },
    { label: 'Community', path: '/community' },
    { label: 'Volunteer', path: '/volunteer' },
    { label: 'Contact', path: '/contact' },
  ];

  readonly whatsappLink =
    'https://wa.me/919503685152?text=Hello%20VidyaOps%20Foundation%2C%20I%20want%20to%20know%20more%20about%20your%20free%20workshops%20and%20community.';
  readonly whatsappVolunteerLink =
    'https://wa.me/919503685152?text=Hello%2C%20I%20want%20to%20volunteer%20with%20VidyaOps%20Foundation.';
  readonly contactEmail = 'info@vidyaopsfoundation.com';
  readonly phone = '+91 95036 85152';

  readonly contactDetails: ContactDetail[] = [
    { icon: '📞', label: 'Phone', value: '+91 95036 85152', href: 'tel:+919503685152' },
    { icon: '✉️', label: 'Email', value: 'info@vidyaopsfoundation.com', href: 'mailto:info@vidyaopsfoundation.com' },
    { icon: '💬', label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/919503685152', external: true },
    { icon: '📍', label: 'Location', value: 'Pune, Maharashtra' },
  ];

  readonly interestOptions = [
    'Cloud Workshop',
    'AI Workshop',
    'Data Analysis Workshop',
    'Cybersecurity Workshop',
    'Community Membership',
    'Partnership / Collaboration',
    'General Inquiry',
  ];

  readonly coreValues: CardItem[] = [
    {
      label: 'Core value',
      title: 'Free Access',
      text: 'Every workshop and resource is offered at no cost. No hidden fees, no premium tiers. Learning should be open to everyone.',
    },
    {
      label: 'Core value',
      title: 'Practical Learning',
      text: 'Hands-on sessions designed to build real understanding through guided practice, projects, and mentorship.',
    },
    {
      label: 'Core value',
      title: 'Community First',
      text: 'Learners help each other grow. Our community thrives on collaboration, peer support, and shared curiosity.',
    },
  ];

  readonly homeWorkshops: WorkshopCard[] = [
    {
      label: 'Cloud Computing',
      title: 'Cloud Basics Workshop',
      text: 'Understand cloud fundamentals, deployment models, and get hands-on with free cloud platforms.',
      list: [],
    },
    {
      label: 'Artificial Intelligence',
      title: 'AI Awareness Workshop',
      text: 'Explore what AI can do, how machine learning works, and practical AI tools you can use today.',
      list: [],
    },
    {
      label: 'Data Analysis',
      title: 'Data Skills Intro',
      text: 'Learn how to work with data using modern tools and build analytical thinking skills from the ground up.',
      list: [],
    },
  ];

  readonly aboutStory: CardItem[] = [
    {
      label: 'Foundation',
      title: 'Why we exist',
      text: 'To remove financial barriers and make practical tech education accessible to anyone with the curiosity to learn.',
    },
    {
      label: 'Approach',
      title: 'How we work',
      text: 'Community-led workshops, hands-on projects, and peer mentorship. No passive lectures. Learning by doing.',
    },
    {
      label: 'Impact',
      title: 'Who we serve',
      text: 'College students, freshers, early professionals, and lifelong learners who want practical skills without financial pressure.',
    },
  ];

  readonly aboutDomains: CardItem[] = [
    {
      label: 'Cloud Computing',
      title: 'Cloud Foundations',
      text: 'Free workshops on cloud concepts, deployment models, hands-on with free-tier platforms.',
    },
    {
      label: 'Artificial Intelligence',
      title: 'AI & Machine Learning',
      text: 'Intro to AI concepts, practical tools, how ML works in real-world scenarios.',
    },
    {
      label: 'Data',
      title: 'Data Analysis',
      text: 'Data handling, visualization, interpretation with modern tools, analytical thinking from scratch.',
    },
    {
      label: 'Security',
      title: 'Cybersecurity Basics',
      text: 'Digital safety, security fundamentals, cybersecurity career paths.',
    },
  ];

  readonly workshops: WorkshopCard[] = [
    {
      label: 'Cloud Computing',
      title: 'Cloud Basics Workshop',
      text: 'Understand cloud computing, deployment models, and hands-on with free cloud platforms. Ideal for absolute beginners.',
      list: ['Live guided session', 'Hands-on exercises', 'Q&A with mentors', 'Certificate of participation'],
    },
    {
      label: 'Artificial Intelligence',
      title: 'AI Awareness Workshop',
      text: 'What AI and ML really mean, practical AI tools, how AI transforms industries.',
      list: ['Live guided session', 'Practical demonstrations', 'Career guidance', 'Certificate of participation'],
    },
    {
      label: 'Data Analysis',
      title: 'Data Skills Intro',
      text: 'Fundamentals of working with data — collection, cleaning, visualization, interpretation with modern tools.',
      list: ['Live guided session', 'Hands-on exercises', 'Real-world examples', 'Certificate of participation'],
    },
    {
      label: 'Cybersecurity',
      title: 'Security Fundamentals',
      text: 'Digital safety, threat awareness, cybersecurity basics, and career paths.',
      list: ['Live guided session', 'Interactive discussion', 'Career exploration', 'Certificate of participation'],
    },
  ];

  readonly communityOffer: CardItem[] = [
    {
      label: 'Events',
      title: 'Community Meetups',
      text: 'Regular online and in-person Pune meetups where learners share knowledge, work on projects, and network.',
    },
    {
      label: 'Support',
      title: 'Peer Mentorship',
      text: 'Connect with experienced learners for guidance and answers as you build your skills.',
    },
    {
      label: 'Resources',
      title: 'Shared Learning',
      text: 'Community-curated resources, project ideas, study groups, and collaborative learning.',
    },
  ];

  readonly communityStats: StatItem[] = [
    { value: '50+', label: 'Members' },
    { value: '4', label: 'Workshops held' },
    { value: '4', label: 'Tech domains' },
    { value: '100%', label: 'Free access' },
  ];

  readonly gallery = [
    { emoji: '📚', caption: 'Workshop session' },
    { emoji: '👥', caption: 'Community meetup' },
    { emoji: '🎓', caption: 'Certificate distribution' },
    { emoji: '💻', caption: 'Hands-on lab session' },
  ];

  readonly testimonials: Testimonial[] = [
    {
      text: 'The community workshops helped me understand cloud computing in a way that textbooks never could. And it was completely free.',
      author: 'Rohit Sharma',
      role: 'College student, Pune',
    },
    {
      text: 'I joined as a complete beginner. The mentors were patient and explained everything step by step. Now I feel confident to pursue a career in tech.',
      author: 'Sneha Patil',
      role: 'Fresher, Pune',
    },
    {
      text: 'The best part is the community. Everyone helps each other, shares resources, and celebrates progress together.',
      author: 'Amit Joshi',
      role: 'Community member, Pune',
    },
  ];

  readonly volunteerBenefits = [
    {
      num: '01',
      title: 'Reach Interested Learners',
      text: 'Your session gets promoted through our community channels so the right people find you.',
    },
    {
      num: '02',
      title: 'We Handle the Coordination',
      text: 'Scheduling, reminders, and follow-ups are managed for you. Just show up and teach.',
    },
    {
      num: '03',
      title: 'Verified Certificates',
      text: 'Participants receive verified completion certificates after your session — no manual work for you.',
    },
    {
      num: '04',
      title: 'Build Your Presence',
      text: 'Gain recognition as a community educator and grow your network within the tech ecosystem.',
    },
  ];

  readonly faqs: FaqItem[] = [
    {
      question: 'Are the workshops really free?',
      answer:
        'Yes. Every workshop and resource offered by VidyaOps Foundation is completely free. No hidden fees, no premium tiers.',
    },
    {
      question: 'Who can join?',
      answer:
        'Anyone. Students, freshers, professionals looking to explore new domains, or anyone curious about technology. No prior experience needed.',
    },
    {
      question: 'Do I need a laptop?',
      answer:
        'For most workshops, a laptop or desktop computer is recommended. Some introductory sessions can be followed on a mobile device.',
    },
    {
      question: 'How do I register?',
      answer:
        'Fill out the contact form on our website, or reach out to us on WhatsApp. We will share the workshop schedule and joining details.',
    },
    {
      question: 'Are the workshops online or in-person?',
      answer:
        'We offer both online and in-person sessions in Pune, Maharashtra. The format depends on the workshop. Check the specific workshop details for more information.',
    },
    {
      question: 'Do I get a certificate?',
      answer:
        'Yes, participants who complete our workshops receive a certificate of participation from VidyaOps Foundation.',
    },
    {
      question: 'How do I join the community?',
      answer:
        'Reach out via the contact form or WhatsApp. We will add you to our community group where you can connect with fellow learners and mentors.',
    },
  ];

  readonly privacySections: LegalSection[] = [
    {
      heading: 'Information We Collect',
      body: 'We collect your name, email address, phone number, and areas of interest when you use our contact form, register for a workshop, or join the community.',
    },
    {
      heading: 'How We Use Your Information',
      body: 'We use your information to respond to inquiries, send workshop updates, share community event information, and improve our programs. We never sell your information or share it with third parties for marketing purposes.',
    },
    {
      heading: 'Data Storage',
      body: 'Your information is stored securely and retained only as long as necessary. You may request deletion of your data at any time by contacting us.',
    },
    {
      heading: 'Third-Party Services',
      body: 'We use Vercel for hosting and WhatsApp for community communication. Their respective privacy policies apply to your use of those services.',
    },
    {
      heading: 'Contact',
      body: 'For any privacy questions or data deletion requests, email us at info@vidyaopsfoundation.com.',
    },
  ];

  readonly termsSections: LegalSection[] = [
    {
      heading: 'Acceptance of Terms',
      body: 'By using this website, you agree to these terms of service. If you do not agree, please do not use the site.',
    },
    {
      heading: 'Educational Services',
      body: 'All workshops, resources, and events provided by VidyaOps Foundation are free. We reserve the right to modify or cancel any program at our discretion.',
    },
    {
      heading: 'User Conduct',
      body: 'We expect respectful use of our website and community. Harassment, spam, or disruptive behavior may result in removal from our programs and community.',
    },
    {
      heading: 'Intellectual Property',
      body: 'Content on this site is provided for personal learning. Redistribution without permission is not allowed.',
    },
    {
      heading: 'Limitation of Liability',
      body: 'VidyaOps Foundation is not liable for any damages arising from use of this site or participation in our programs.',
    },
    {
      heading: 'Changes',
      body: 'These terms may be updated from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.',
    },
    {
      heading: 'Contact',
      body: 'For questions about these terms, email us at info@vidyaopsfoundation.com.',
    },
  ];

  readonly footerDomains = [
    'Cloud Computing',
    'AI & Machine Learning',
    'Data Analysis',
    'Cybersecurity',
  ];
}
