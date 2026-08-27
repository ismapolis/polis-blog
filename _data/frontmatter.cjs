const fs = require('fs');
const { DateTime } = require('luxon');

function readFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const yamlMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!yamlMatch) return { data: {}, contentBody: '' };
  const fm = {};
  const lines = yamlMatch[1].split('\n');
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
    } else if (value === 'true') value = true;
    else if (value === 'false') value = false;
    else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) value = new Date(value);
    else value = value.replace(/^["']|["']$/g, '');
    fm[key] = value;
  }
  const contentStart = (yamlMatch.index || 0) + yamlMatch[0].length;
  return { data: fm, contentBody: raw.substring(contentStart).trim() };
}

function formatDate(d) {
  if (!d) return '';
  const dt = DateTime.fromJSDate(new Date(d)).setLocale('en-GB');
  return dt.toLocaleString({ year: 'numeric', month: 'long', day: 'numeric' });
}

function formatIso(d) {
  if (!d) return '';
  return DateTime.fromJSDate(new Date(d)).toISO();
}

module.exports = { readFrontmatter, formatDate, formatIso };
