const fs = require('fs');
const path = require('path');
const { readFrontmatter, formatDate, formatIso } = require('./frontmatter.cjs');

const postsDir = path.join(__dirname, '..', '_content', 'posts');
const findsDir = path.join(__dirname, '..', '_content', 'finds');

function getContentItems(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => readFrontmatter(path.join(dir, f)))
    .filter(item => item.data && item.data.public !== false);
}

// SVG helpers
const svgArrow = '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
const svgExternal = '<svg class="external-icon" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

function svgIconForType(type) {
  const cls = 'type-icon';
  if (type === 'video') return '<svg class="' + cls + '" viewBox="0 0 24 24"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
  if (type === 'article') return '<svg class="' + cls + '" viewBox="0 0 24 24"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"/></svg>';
  if (type === 'website') return '<svg class="' + cls + '" viewBox="0 0 24 24"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>';
  if (type === 'book') return '<svg class="' + cls + '" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>';
  return '<svg class="' + cls + '" viewBox="0 0 24 24"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"/></svg>';
}

const posts = getContentItems(postsDir);
const finds = getContentItems(findsDir);
posts.sort((a, b) => new Date(b.data.publicationDate) - new Date(a.data.publicationDate));
finds.sort((a, b) => new Date(b.data.publicationDate) - new Date(a.data.publicationDate));
const allTags = [...new Set(posts.flatMap(p => p.data.tags || []))].sort();

posts.forEach(p => {
  p.data.formattedDate = formatDate(p.data.publicationDate);
  p.data.isoDate = formatIso(p.data.publicationDate);
});
finds.forEach(f => {
  f.data.formattedDate = formatDate(f.data.publicationDate);
  f.data.isoDate = formatIso(f.data.publicationDate);
  f.data.svgIcon = svgIconForType(f.data.type);
});

module.exports = {
  posts,
  finds,
  allTags,
  recentPosts: posts.slice(0, 5),
  recentFinds: finds.slice(0, 10),
  svgArrow,
  svgExternal,
};
