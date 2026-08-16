const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'src', 'app', 'core', 'data', 'blog-posts.data.ts');
const outFile = path.join(__dirname, '..', 'src', 'assets', 'blog-posts.json');

const src = fs.readFileSync(dataFile, 'utf8');

// Extract each post block: slug, title, excerpt, date, readTime, category, domain, content
const re =
  /slug:\s*"([^"]+)",\s*title:\s*"([^"]*)",\s*excerpt:\s*"([^"]*)",\s*date:\s*"([^"]+)",\s*readTime:\s*"([^"]+)",\s*category:\s*"([^"]*)",\s*domain:\s*"([^"]*)",\s*content:\s*`([\s\S]*?)`/g;

const posts = [];
let m;
while ((m = re.exec(src)) !== null) {
  posts.push({
    slug: m[1],
    title: m[2],
    excerpt: m[3],
    date: m[4],
    readTime: m[5],
    category: m[6],
    domain: m[7],
    content: m[8],
  });
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(posts, null, 2) + '\n', 'utf8');
console.log(`Exported ${posts.length} posts to src/assets/blog-posts.json`);
