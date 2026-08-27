const { DateTime } = require('luxon');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxhighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxhighlight);

  // Markdown
  const markdownLib = markdownIt({ html: true, breaks: true, linkify: true })
    .use(markdownItAnchor, {
      level: [2, 3],
      permalink: markdownItAnchor.permalink.ariaHidden({ place: 'after', class: 'heading-anchor' }),
    });
  eleventyConfig.setLibrary('md', markdownLib);

  // Passthrough
  eleventyConfig.addPassthroughCopy({ 'public/': '.' });
  eleventyConfig.addPassthroughCopy({ '_includes/css/': '.' });
  eleventyConfig.addPassthroughCopy({ '_includes/js/': '.' });

  // Filters
  eleventyConfig.addFilter('dateFormat', (date) =>
    DateTime.fromJSDate(date).setLocale('en-GB').toLocaleString({ year: 'numeric', month: 'long', day: 'numeric' })
  );
  eleventyConfig.addFilter('slugify', (str) =>
    String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  );
  eleventyConfig.addFilter('htmlDateString', (date) => DateTime.fromJSDate(date).toISO());
  eleventyConfig.addFilter('capitalize', (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '');

  // Collections for listing pages (use sitecontent global data)
  eleventyConfig.addCollection('posts', (collection) => collection.getFilteredByGlob('_content/posts/*.md'));
  eleventyConfig.addCollection('finds', (collection) => collection.getFilteredByGlob('_content/finds/*.md'));

  return {
    dir: { input: '.', output: '_site', includes: '_includes', data: '_data' },
    templateFormats: ['liquid', 'md', 'txt', '11ty.js'],
    htmlTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
  };
};
