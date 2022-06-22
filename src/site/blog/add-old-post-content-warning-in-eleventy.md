---
title: Add an 'Old Content' warning in Eleventy
subtitle:
date: 2022-06-23
meta: Add a warning to your old blog posts in 11ty to stop readers getting sucked into a timewarp!
img: https://jessbudd.com/images/featured/old-content-warning.jpg
tags: [post, dev]
---

<p class="subtitle">I recently lamented how frustrating it is when articles omit the published date. Things move fast in the tech industry! Even articles that are 6-12 months old can be out of date by the time you read them.</p>

<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">Could we all please agree to put published dates on articles? (Preferably near the top)<br><br>In many circumstances it really is important to know if an article is 6 months, 1 year or 3+ years old!</p>&mdash; Jess Budd (@jessbudd4) <a href="https://twitter.com/jessbudd4/status/1537651487316508673?ref_src=twsrc%5Etfw">June 17, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

[Aaron Powell retweeted](https://twitter.com/slace/status/1537682232025837569?s=20&t=c1CVjVBEK5A_Luyyko_lCg) that he'd added a step to his blog build engine to include a warning if the post was more than three years old. Brilliant!

So, not only does he have the date for those that care to look, but he also has a banner that catches people's attention and keeps them from going down a no-longer-relevant rabbit hole.

## Ulterior motives

Another reason I thought this was such a great idea is because I'm not a frequent blogger.

I write a couple posts and then disappear into the ether for a couple years until I get the motivation to write a couple more. (The fact my last post was 18 months ago should be case in point).

I don't want to delete old posts, but some of them are from when I was a code newbie. I don't really want prospective employers landing on one of them and assuming they're reflective of my current skills or knowledge.

So on a rainy Sunday afternoon I got to work.

## Eleventy content dates

This blog is built with a simple site generator called [Eleventy](https://www.11ty.dev/). It's written in JavaScript, and gives you freedom to choose your templating language (I like nunjucks).

The first thing I did was open up the [Eleventy docs](https://www.11ty.dev/docs/dates/) for working with dates. There were a number of date values available to templates including `created`, `Last Modified` and the `date` added by [front matter](https://www.11ty.dev/docs/data-frontmatter/#front-matter-data)].

Sometimes I go back and fix a stray typo on old posts, so I didn’t want to use the `Last Modified` date. And sometimes I write a post long before I actually publish it which ruled out `created`. This left using the front matter date as making the most sense.

I added a dump of the `date` object to a template to see what I was working with.

<pre>
{% filename "post.njk" %}
<code class="lang-js custom-highlight-js ">
&#123;&#123; date | dump &#125;&#125;
//  returns "2022-06-23T00:00:00.000Z"
&nbsp;
&#123;&#123; date &#125;&#125;
// returns Thu Jun 23 2022 08:00:00 GMT+0800 (Australian Western Standard Time)

</code>
</pre>

I could see that dates default to midnight UTC, and calling the date within the template automatically converted it to a string. Comparing their raw date object with a regular JavaScript date object should be simple.

Eleventy uses wrapper for JavaScript dates and times called [Luxon](https://moment.github.io/luxon/). (Similar to Moment.js, but lighter and still actively maintained).

I scanned through Luxon's docs to see if they had any built-in methods that could take two dates and return the difference between them. [DiffNow](https://moment.github.io/luxon/api-docs/index.html#datetimediff) was better than that, because it only took one date and compared it the date the function was called.

We can't write our function inside a nunjucks template, so where do we add the code?

## Eleventy shortcodes

Eleventy enables you to create and use [shortcodes](https://www.11ty.dev/docs/shortcodes/). These are like shortcuts you can add to your template (or markdown) that will call your JavaScript function and return whatever the value.

Shortcodes are added to your Eleventy config file (`eleventy.js`). You can house the entire shortcode function in your config file, or you can import it from another file. I prefer to reference filters and shortcodes, while keeping the actual code separated into their own files.

I also like to do my 'setup' first, so I added the shortcode to the config before I actually created it. In the example below, 'oldContentWarning' is the name of shortcode file, and the second part is the path to that file from the root folder.

<pre>
{% filename "eleventy.js" %}
<code class="lang-js">
module.exports = function (config) {
    // other config stuff here

    config.addShortcode(
        'oldContentWarning',
        require('./src/utils/shortcodes/oldContentWarning.js')
    );

    // other config stuff here
};
</code>
</pre>

I then created my shortcode folder and 'oldContentWarning.js'.

I started by importing the DateTime module from Luxon and adding a brief description of the function for future reference.

<pre>
{% filename "oldContentWarning.js" %}
<code class="lang-js">
const {DateTime} = require('luxon');
&nbsp;
// show a warning if the number of months
// between today and the passed in date object
// exceeds allowed timeframe

</code>
</pre>

I then wrote a module that would take the front matter date as an argument and determine how many months there were between that date and now.

If the difference was more than 24 months, it would return some html warning the user the content was old. If the difference was less than 24 months, it would just bail out and return null.

<pre>
{% filename "oldContentWarning.js" %}
<code class="lang-js">
module.exports = (date) => {
  let dateToISO = DateTime.fromJSDate(date);
  let difference = dateToISO.diffNow('months').toObject();
&nbsp;
  if (difference.months &#60; -24) {
    return `&#60;p class="warning--lg"&#62;
        This post is over two years old, the content may be out of date.
    &#60;/p&#62;`;
  } else {
    return null;
  }
};
</code>
</pre>

It turns out returning `null` (or simply returning) as I do in ReactLand does not work here.

Shortcodes _must_ return something.

I changed `null` to an empty string and it worked. Here's the full code:

<pre>
{% filename "oldContentWarning.js" %}
<code class="lang-js">
const {DateTime} = require('luxon');
&nbsp;
// show a warning if the number of months
// between today and the passed in date object
// exceeds allowed timeframe
&nbsp;
module.exports = (date) => {
  let dateToISO = DateTime.fromJSDate(date);
  let difference = dateToISO.diffNow('months').toObject();
&nbsp;
  if (difference.months &#60; -24) {
    return `&#60;p class="warning--lg"&#62;
        This post is over two years old, the content may be out of date.
    &#60;/p&#62;`;
  } else {
    return null;
  }
};
</code>
</pre>

## Usage

Using the shortcode within my nunjucks template was simple. (Shortcodes can also be added directly to markdown files).

<pre>
{% filename "post.njk" %}
<code class="lang-js custom-highlight-js">
&#123;% oldContentWarning page.date %&#125;
</code>
</pre>

I added a touch of styling, and voila`!

[See it in action](http://localhost:8080/blog/hiding-content-accessibly/).

<!-- <figure>
<img src="/images/posts/2022/screenshot-old-content-warning.jpg" alt="Old content warning reads 'This post is over two years old, the content may be out of date.'" />
<figcaption>Old content warning displayed on a post from 2019.</figcaption>
</figure> -->

## Known limitations

The date comparison takes place at build time because the website is statically generated. This means the difference in time calculated will be off by however long it's been since I triggered the last build.

My posting is sporadic, so this will definitely happen. But even with this limitation it suits my use case - so I'm happy!
