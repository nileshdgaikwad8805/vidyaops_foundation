const fs = require('fs');
const path = require('path');

const blogDir = 'C:\\Users\\niles\\Downloads\\VidyaOps\\vidyaops_foundation\\blog';
const postsJson = JSON.parse(fs.readFileSync(path.join(blogDir, 'posts.json'), 'utf8'));

const escapeTs = (s) =>
  s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

const posts = [];
for (const meta of postsJson) {
  const file = path.join(blogDir, meta.slug + '.html');
  if (!fs.existsSync(file)) {
    console.warn('MISSING:', meta.slug);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');

  const articleMatch = html.match(/<article class="blog-article">([\s\S]*?)<\/article>/i);
  if (!articleMatch) {
    console.warn('NO ARTICLE:', meta.slug);
    continue;
  }

  let content = articleMatch[1].trim();

  // Normalize internal links to Angular routes
  content = content.replace(
    /href="\.\.\/workshops\.html"/g,
    'href="/workshops"',
  );
  content = content.replace(
    /href="\.\.\/community\.html"/g,
    'href="/community"',
  );
  content = content.replace(
    /href="\.\.\/contact\.html"/g,
    'href="/contact"',
  );
  content = content.replace(
    /href="\.\.\/blog\.html"/g,
    'href="/blog"',
  );
  content = content.replace(
    /href="\.\.\/index\.html"/g,
    'href="/"',
  );
  content = content.replace(/href="\.\.\/([a-z0-9-]+\.html)"/g, 'href="/blog/$1"');

  posts.push({
    slug: meta.slug,
    title: meta.title,
    excerpt: meta.excerpt,
    date: meta.date,
    readTime: meta.readTime,
    category: meta.category,
    domain: meta.domain,
    content,
  });
}

const output = `import { BlogPost } from '../models/site.models';

// Auto-generated from static blog posts. Do not edit manually.
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

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'app', 'core', 'data', 'blog-posts.data.ts'),
  output,
  'utf8',
);
console.log(`Generated ${posts.length} posts.`);
