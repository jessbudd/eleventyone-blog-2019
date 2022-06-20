const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = function (config) {
  config.addPlugin(pluginRss);

  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  let markdownIt = require('markdown-it');
  let markdownItEmoji = require('markdown-it-emoji');
  let options = {
    html: true,
  };
  let markdownLib = markdownIt(options).use(markdownItEmoji);

  // eleventyConfig.setLibrary("md", markdownLib);
  config.setLibrary('md', markdownLib);

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // Add some utility filters
  config.addFilter('squash', require('./src/utils/filters/squash.js'));
  config.addFilter('excerpt', require('./src/utils/filters/excerpt.js'));
  config.addFilter('dateDisplay', require('./src/utils/filters/date.js'));

  // Shortcodes
  config.addShortcode(
    'twitter',
    require('./src/utils/shortcodes/twitterLink.js')
  );
  config.addShortcode(
    'filename',
    require('./src/utils/shortcodes/filename.js')
  );
  config.addShortcode(
    'oldContentWarning',
    require('./src/utils/shortcodes/oldContentWarning.js')
  );

  // add support for syntax highlighting
  config.addPlugin(syntaxHighlight);

  // minify the html output
  config.addTransform('htmlmin', require('./src/utils/minify-html.js'));

  // compress and combine js files
  config.addFilter('jsmin', function (code) {
    const UglifyJS = require('uglify-js');
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log('UglifyJS error: ', minified.error);
      return code;
    }
    return minified.code;
  });

  // pass some assets right through
  config.addPassthroughCopy('./src/site/images');

  // make the seed target act like prod
  env = env == 'seed' ? 'prod' : env;
  return {
    dir: {
      input: 'src/site',
      output: 'dist',
      data: `_data/${env}`,
    },
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
  };
};
