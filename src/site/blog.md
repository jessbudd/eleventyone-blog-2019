---
title: Blog
layout: layouts/base.njk
subtitle: Read some of my musings on web development, digital accessibility, technology, learning...
---

<div class="container__blog">
  <h1 class="center">{{ title }}</h1>
  <!-- {%- if subtitle %}<p class="subtitle">{{ subtitle | safe }}</p>{% endif %} -->
  
  <p class="center">
    <span class="post__tag"><a href="/blog">Post</a></span>
    <span class="post__tag"><a href="/blog/dev">Dev</a></span>
    <span class="post__tag"><a href="/blog/a11y">A11y</a></span>
    <span class="post__tag"><a href="/blog/life">Life</a></span>
    <span class="post__tag"><a href="/blog/speaking">Speaking</a></span>
  </p>

  <ul class="listing">
  {%- for post in collections.post | reverse -%}
    {% include "blog-repeat.njk" %}
  {%- endfor -%}

  </ul>

</div>
