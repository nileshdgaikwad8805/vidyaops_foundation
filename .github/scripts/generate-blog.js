const fs = require('fs');
const path = require('path');

const POSTS_FILE = path.join(__dirname, '..', '..', 'src', 'assets', 'blog-posts.json');
const DATA_TS_FILE = path.join(__dirname, '..', '..', 'src', 'app', 'core', 'data', 'blog-posts.data.ts');

const DOMAINS = [
  'Cloud Computing',
  'Artificial Intelligence',
  'Machine Learning',
  'Data Analysis',
  'Cybersecurity',
  'Python Programming',
  'Web Development',
  'Mobile App Development',
  'DevOps',
  'Database Management',
  'Software Testing',
  'Blockchain Basics',
  'Internet of Things (IoT)',
  'Digital Marketing',
  'Linux Basics',
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function loadPosts() {
  if (!fs.existsSync(POSTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
}

function savePosts(posts) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n');
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

// ───── Pick the least-used topic ─────
function slugifyDefaultTitle(topic) {
  return slugify(`Getting Started with ${topic}: A Beginner's Guide`);
}

function hasTemplatePost(posts, topic) {
  return posts.some((p) => p.slug === slugifyDefaultTitle(topic));
}

function pickTopic(posts) {
  const counts = Object.fromEntries(DOMAINS.map((d) => [d, 0]));
  for (const p of posts) {
    if (counts[p.domain] !== undefined) counts[p.domain]++;
  }
  // Heavily deprioritize topics that already have a matching template post,
  // so the deterministic template rotates across topics instead of repeating.
  for (const d of DOMAINS) {
    if (hasTemplatePost(posts, d)) counts[d] += 1000;
  }
  const sorted = DOMAINS.slice().sort((a, b) => counts[a] - counts[b]);
  return sorted[0];
}

// ───── Unique slug guard ─────
function uniqueSlug(posts, base) {
  let candidate = base;
  let n = 2;
  while (posts.some((p) => p.slug === candidate)) {
    candidate = `${base}-${n}`;
    n++;
  }
  return candidate;
}

// ───── Section templates for the deterministic fallback ─────
function heading(text) {
  return `<h2>${text}</h2>`;
}
function para(text) {
  return `<p>${text}</p>`;
}
function list(items) {
  return `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
}

function templatePost(topic) {
  const title = `Getting Started with ${topic}: A Beginner's Guide`;
  return {
    title,
    excerpt: `Everything you need to know about ${topic.toLowerCase()} — explained simply for absolute beginners, completely free.`,
    category: topic,
    readTime: '8 min read',
    content: [
      para(
        `Welcome to this beginner-friendly guide on <strong>${topic}</strong>. If you have been curious about the field but felt it was too technical or expensive to explore, this guide is for you. VidyaOps Foundation exists to prove that <strong>anyone can learn technology for free</strong>.`,
      ),
      heading(`What is ${topic}?`),
      para(
        `In simple terms, ${topic.toLowerCase()} is one of the most in-demand skills in the technology industry today. It combines concepts, tools, and best practices that help businesses and individuals solve real-world problems with technology.`,
      ),
      para(
        `For a beginner, the most important thing is to start with the <strong>core ideas</strong> rather than memorizing tools. Once the foundations are clear, everything else becomes much easier to learn.`,
      ),
      heading('Why Does It Matter?'),
      para('Here are the main reasons this field matters in the modern world:'),
      list([
        `<strong>Career opportunities</strong> &mdash; companies across every industry are hiring for these skills`,
        `<strong>Practical impact</strong> &mdash; you can build, automate, and solve real problems`,
        `<strong>Accessible learning</strong> &mdash; most tools have free tiers or free learning resources`,
        `<strong>Growing demand</strong> &mdash; the need for these skills keeps rising every year`,
      ]),
      heading('Key Concepts for Beginners'),
      para('Before diving in, get comfortable with these fundamental concepts:'),
      list([
        `<strong>Core terminology</strong> &mdash; learn the basic vocabulary used in the field`,
        `<strong>Main tools</strong> &mdash; the popular free tools professionals use daily`,
        `<strong>Best practices</strong> &mdash; how experienced people structure their work`,
        `<strong>Real-world use cases</strong> &mdash; how companies apply these ideas in practice`,
      ]),
      heading('Practical Steps to Start Learning'),
      para('You can start today, even with zero experience. Follow these steps:'),
      list([
        `Start with free workshops and beginner tutorials`,
        `Practice with free tools and sandbox environments`,
        `Build one small project to apply what you learn`,
        `Join a community where you can ask questions and get help`,
      ]),
      heading('Common Mistakes to Avoid'),
      list([
        `Trying to learn every tool at once instead of focusing on fundamentals`,
        `Watching tutorials without practicing`,
        `Waiting for the "perfect" time instead of starting now`,
        `Learning alone when a supportive community is available`,
      ]),
      heading('Your Next Steps'),
      para(
        `The best way to learn ${topic.toLowerCase()} is to start small, stay consistent, and learn with others. VidyaOps Foundation offers <strong>free guided workshops</strong> on ${topic.toLowerCase()} and related topics.`,
      ),
      para(
        `<em>Ready to take the next step? <a href="/workshops">Join our free workshops</a> and start building your skills today with a supportive community behind you.</em>`,
      ),
    ].join('\n\n'),
  };
}

// ───── AI generation via OpenAI-compatible endpoint ─────
async function generatePost(topic) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log('No OPENAI_API_KEY set — using built-in template generator.');
    return templatePost(topic);
  }

  const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const prompt = `You are an educational tech writer for VidyaOps Foundation, a non-profit that provides free tech education to students and beginners.

Generate a detailed, beginner-friendly blog post about "${topic}". Return VALID JSON only with these fields:
{
  "title": "Catchy, beginner-friendly title (max 70 chars)",
  "description": "2-sentence meta description",
  "excerpt": "1-sentence card excerpt (max 140 chars)",
  "category": "One of: ${DOMAINS.join(', ')}",
  "readTime": "X min read",
  "content": "Full HTML content for the article body. Use <h2>, <p>, <ul><li>, <strong>, <em>, <code> only. No images. Include a concluding paragraph that invites readers to join the foundation's free workshops (link /workshops). Never use <h1>."
}

Guidelines:
- Write for absolute beginners (students, freshers). Explain all terms.
- Practical, actionable advice with free tools/resources.
- Positive, encouraging tone.
- 1000-1500 words — make it comprehensive and thorough.
- Structure with 4-6 sections (<h2> headings) that cover: what it is, why it matters, key concepts, practical steps, common mistakes to avoid, and next steps.
- Include concrete examples, comparisons, and step-by-step explanations.
- Use <ul> and <li> for lists of tips, tools, or steps.
- Return ONLY the JSON, no other text`;

  const resp = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 5000,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`AI API error: ${resp.status} ${err}`);
  }

  const data = await resp.json();
  const text = data.choices[0].message.content.trim();
  const json = text.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  return JSON.parse(json);
}

// ───── Regenerate the embedded TS fallback data ─────
function escapeTs(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function writeDataTs(posts) {
  const output = `import { BlogPost } from '../models/site.models';

// Auto-generated from blog-posts.json. Do not edit manually.
export const BLOG_POSTS: BlogPost[] = [
${posts
  .map(
    (p) => `  {
    slug: ${JSON.stringify(p.slug)},
    title: ${JSON.stringify(p.title)},
    excerpt: ${JSON.stringify(p.excerpt)},
    date: ${JSON.stringify(p.date)},
    readTime: ${JSON.stringify(p.readTime)},
    category: ${JSON.stringify(p.category)},
    domain: ${JSON.stringify(p.domain)},
    content: \`${escapeTs(p.content)}\`,
  },`,
  )
  .join('\n')}
];
`;
  fs.writeFileSync(DATA_TS_FILE, output, 'utf8');
}

// ───── Main ─────
async function main() {
  const posts = loadPosts();
  const date = today();

  const topic = pickTopic(posts);
  console.log(`Generating blog post about: ${topic}`);

  const post = await generatePost(topic);
  const slug = uniqueSlug(posts, slugify(post.title));

  posts.unshift({
    slug,
    title: post.title,
    excerpt: post.excerpt,
    date,
    readTime: post.readTime,
    category: post.category,
    domain: topic,
    content: post.content,
  });

  savePosts(posts);
  writeDataTs(posts);
  console.log(`Created blog post: ${slug} (${topic})`);
  console.log(`Total posts: ${posts.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
