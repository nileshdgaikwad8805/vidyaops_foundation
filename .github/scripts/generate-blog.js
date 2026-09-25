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

// Per-domain angle bank. Each post for a domain rotates through these angles so
// consecutive posts are genuinely different topics, never template rehashes.
const ANGLES = {
  'Cloud Computing': [
    'virtual machines & on-demand compute — what actually happens when you rent a server',
    'object storage vs block storage vs databases in the cloud',
    'how serverless lets you run code without managing servers',
    'cloud security basics: IAM, keys, and shared responsibility',
    'staying within free tiers while learning cloud on a budget',
  ],
  'Artificial Intelligence': [
    'how AI models actually learn from training data',
    'everyday free AI tools a student can use today (not just chatbots)',
    'what "hallucinations" are and how to prompt around them',
    'AI ethics and bias for absolute beginners',
    'building your first tiny AI-powered app with a free API',
  ],
  'Machine Learning': [
    'the difference between AI, ML and deep learning explained simply',
    'what a training dataset is and why data quality beats fancy models',
    'regression vs classification with a real beginner example',
    'overfitting explained: why a "perfect" model fails on new data',
    'your first ML project using free tools (no GPU needed)',
  ],
  'Data Analysis': [
    'the data analysis workflow: collect, clean, explore, report',
    'pivot tables and why they beat raw spreadsheets for beginners',
    'from raw CSV to a dashboard using free tools',
    'common data-cleaning mistakes beginners make',
    'using SQL vs spreadsheets: when to use which',
  ],
  'Cybersecurity': [
    'phishing attacks: how they work and how to spot them',
    'passwords, 2FA and password managers — the practical basics',
    'public Wi-Fi risks and how VPNs actually help',
    'securing your accounts and devices as a student',
    'the ethical hacking mindset for complete beginners',
  ],
  'Python Programming': [
    'variables, data types and your first script',
    'functions and why they keep your code clean',
    'lists vs dictionaries and when to use each',
    'reading files and working with data in Python',
    'small projects that teach Python faster than tutorials',
  ],
  'Web Development': [
    'how HTML, CSS and JavaScript fit together',
    'the difference between frontend and backend',
    'responsive design: making one site work on every screen',
    'common beginner layout mistakes (and quick fixes)',
    'your first project: a personal portfolio page',
  ],
  'Mobile App Development': [
    'native vs cross-platform: which route should beginners pick',
    'the anatomy of a mobile app: screens, navigation, data',
    'planning your first app idea before writing code',
    'free tools and emulators to start building today',
    'publishing pitfalls: testing and app-store basics',
  ],
  'DevOps': [
    'what CI/CD pipelines actually do (with a simple example)',
    'containers 101: what Docker images really are',
    'automation mindset: removing manual, repetitive steps',
    'monitoring and logging for small projects',
    'the DevOps career path for beginners in India',
  ],
  'Database Management': [
    'tables, rows and keys — relational databases in plain words',
    'SQL basics: SELECT, INSERT, UPDATE, DELETE',
    'normalization without the jargon',
    'indexes: why queries slow down and speed up',
    'SQLite vs PostgreSQL: choosing your first database',
  ],
  'Software Testing': [
    'manual vs automated testing — where to start',
    'writing your first test case and thinking like a tester',
    'common bugs beginners miss in their own code',
    'test automation basics with free tools',
    'bug reports that developers actually appreciate',
  ],
  'Blockchain Basics': [
    'what a blockchain actually is (no hype, just mechanics)',
    'wallets, keys and why "not your keys, not your crypto"',
    'smart contracts explained for beginners',
    'bitcoin vs ethereum vs tokens — a plain-language comparison',
    'blockchain beyond crypto: real-world uses',
  ],
  'Internet of Things (IoT)': [
    'how sensors, connectivity and processing fit together',
    'your first IoT project with a low-cost microcontroller',
    'protecting IoT devices: why security matters early',
    'how cloud platforms collect and show IoT data',
    'choosing between WiFi, Bluetooth and other connections',
  ],
  'Digital Marketing': [
    'SEO basics every beginner can action this week',
    'content marketing without a big budget',
    'social media: choosing platforms that fit your audience',
    'writing email newsletters people actually open',
    'free analytics: measuring what works',
  ],
  'Linux Basics': [
    'the command line: first commands every beginner needs',
    'files and permissions in Linux explained',
    'package managers and installing software safely',
    'making Linux your daily driver without losing productivity',
    'shell scripts: automating your first repetitive task',
  ],
};

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

// ───── Pick the least-recently-used domain ─────
function lastDatePerDomain(posts) {
  const last = {};
  for (const p of posts) {
    if (!p.domain) continue;
    if (!last[p.domain] || p.date > last[p.domain]) last[p.domain] = p.date;
  }
  return last;
}

function pickTopic(posts) {
  const last = lastDatePerDomain(posts);
  const sorted = DOMAINS.slice().sort((a, b) => {
    const da = last[a] || '0000-00-00';
    const db = last[b] || '0000-00-00';
    return da.localeCompare(db);
  });
  return sorted[0];
}

// ───── Rotation index: least-used angle for a domain ─────
function pickAngle(topic, posts) {
  const angles = ANGLES[topic] || [];
  const used = posts.filter((p) => p.domain === topic).length;
  if (!angles.length) return null;
  return angles[used % angles.length];
}

// During regeneration, each post for a domain must get a DIFFERENT angle.
function pickAngleRegen(topic, usedCount) {
  const angles = ANGLES[topic] || [];
  if (!angles.length) return null;
  return angles[usedCount % angles.length];
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

// ───── Title collision guards ─────
function normalizeTitle(title) {
  return (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function hasCollision(titles, candidate) {
  const norm = normalizeTitle(candidate);
  if (!norm) return true;
  return titles.some((t) => normalizeTitle(t) === norm);
}

// Bootstrap: if OPENAI_API_KEY is missing but GEMINI_API_KEY present, use Gemini's
// OpenAI-compatible endpoint. GitHub Models is retired, so GH_MODELS_TOKEN is ignored.
function aiEndpointConfig() {
  const baseUrl =
    process.env.OPENAI_BASE_URL ||
    (process.env.GEMINI_API_KEY
      ? 'https://generativelanguage.googleapis.com/v1beta/openai'
      : 'https://api.openai.com/v1');
  const model =
    process.env.OPENAI_MODEL || (process.env.GEMINI_API_KEY ? (process.env.GEMINI_MODEL || 'gemini-2.5-flash') : 'gpt-4o-mini');
  const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
  return { baseUrl, model, apiKey };
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

function templatePost(topic, angle) {
  const title = angle
    ? `A Beginner's Guide to ${topic}: ${angle.charAt(0).toUpperCase()}${angle.slice(1)}`
    : `Getting Started with ${topic}: A Beginner's Guide`;
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

// ───── AI generation via any OpenAI-compatible endpoint (OpenAI or Gemini) ─────
function buildPrompt(topic, angle, bannedTitles) {
  const angleLine = angle ? `Focus on this specific angle: "${angle}".` : 'Pick a fresh, specific angle within the topic.';
  const bannedLine = bannedTitles.length
    ? `\nDo NOT reuse or get close to any of these existing titles:\n${bannedTitles.map((t) => `- ${t}`).join('\n')}`
    : '';
  return `You are an educational tech writer for VidyaOps Foundation, a non-profit that provides free tech education to students and beginners in India.

Write a detailed, beginner-friendly blog post about "${topic}". ${angleLine}${bannedLine}

Return VALID JSON only with these fields:
{
  "title": "Catchy, specific, beginner-friendly title (max 70 chars) — must NOT be 'Getting Started with X: A Beginner's Guide' or anything similar",
  "description": "2-sentence meta description",
  "excerpt": "1-sentence card excerpt (max 140 chars)",
  "category": "One of: ${DOMAINS.join(', ')}",
  "readTime": "X min read",
  "content": "Full HTML content for the article body. Use <h2>, <p>, <ul><li>, <strong>, <em>, <code> only. No images. No <h1>. Include a concluding paragraph inviting readers to join the foundation's free workshops (link /workshops)."
}

Guidelines:
- Write for absolute beginners (students, freshers) in India. Explain every term the first time you use it.
- Be specific and practical: name real free tools/resources, give concrete examples, comparisons, and step-by-step explanations tied to the chosen angle.
- Positive, encouraging, jargon-free tone.
- 1200-1800 words — comprehensive but focused on the angle, not generic filler.
- Structure with 4-6 sections (<h2> headings): what it is, why it matters, key concepts, practical steps, common mistakes to avoid, next steps — tailored to the angle.
- Return ONLY the JSON, no other text or markdown fences.`;
}

async function callAi(prompt) {
  const { baseUrl, model, apiKey } = aiEndpointConfig();
  if (!apiKey) return null;

  const resp = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
      max_tokens: 7000,
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

async function generatePost(topic, bannedTitles, attemptsLeft = 3, forcedAngle = null) {
  const angle = forcedAngle || pickAngle(topic, loadPosts());
  try {
    const ai = await callAi(buildPrompt(topic, angle, bannedTitles));
    if (!ai) {
      console.log('No AI key set — using template fallback.');
      return templatePost(topic, angle);
    }
    if (attemptsLeft > 0 && hasCollision(bannedTitles, ai.title)) {
      return generatePost(topic, bannedTitles, attemptsLeft - 1, angle);
    }
    return ai;
  } catch (err) {
    console.warn(`AI generation failed (${err.message}) — using template fallback.`);
    return templatePost(topic, angle);
  }
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
  const mode = process.argv[2] || 'daily';

  if (mode === '--dedupe') {
    // Remove exact-duplicate slugs and identical titles, keep first occurrence.
    const seen = new Set();
    const seenTitle = new Set();
    const cleaned = [];
    for (const p of posts) {
      const slugKey = p.slug;
      const titleKey = normalizeTitle(p.title);
      if (seen.has(slugKey) || (titleKey && seenTitle.has(titleKey))) continue;
      seen.add(slugKey);
      if (titleKey) seenTitle.add(titleKey);
      cleaned.push(p);
    }
    savePosts(cleaned);
    writeDataTs(cleaned);
    console.log(`Dedupe: ${posts.length} → ${cleaned.length} posts`);
    return;
  }

  if (mode === '--regenerate-all') {
    if (!aiEndpointConfig().apiKey) {
      console.error('No GEMINI_API_KEY / OPENAI_API_KEY set — cannot regenerate.');
      process.exit(1);
    }
    const banned = posts.map((p) => p.title);
    const angleCounts = {}; // domain -> how many times regenerated so far
    const regenerated = [];
    console.log(`Regenerating ${posts.length} posts via AI…`);
    for (const p of posts) {
      let kept;
      try {
        const angle = pickAngleRegen(p.domain, angleCounts[p.domain] || 0);
        angleCounts[p.domain] = (angleCounts[p.domain] || 0) + 1;
        const ai = await generatePost(p.domain, banned, 3, angle);
        kept = {
          slug: p.slug,
          title: ai.title || p.title,
          excerpt: ai.excerpt || p.excerpt,
          date: p.date,
          readTime: ai.readTime || p.readTime,
          category: ai.category || p.category || p.domain,
          domain: p.domain,
          content: ai.content || p.content,
        };
      } catch (err) {
        console.warn(`  ✗ ${p.slug} (${err.message}) — keeping original`);
        kept = p;
      }
      banned.push(kept.title);
      regenerated.push(kept);
      console.log(`  ✓ ${p.slug}`);
    }
    savePosts(regenerated);
    writeDataTs(regenerated);
    console.log(`Regenerated ${regenerated.length} posts.`);
    return;
  }

  // Daily mode
  const topic = pickTopic(posts);
  console.log(`Generating blog post about: ${topic}`);

  const bannedTitles = posts.slice(0, 40).map((p) => p.title);
  const post = await generatePost(topic, bannedTitles);
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