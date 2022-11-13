---
title: Jess Budd, Front-end Dev & Accessibility Nerd
# subtitle: (Metaphorically speaking)
layout: layouts/base.njk
meta: Jess Budd is an experienced front-end developer and web accessibility advocate based in Perth, Australia.
---

{% include "hero.njk" %}

<hr>

<div class="hero">

## Latest posts

  <ul class="latest-posts">

  {%- for post in collections.post | reverse -%}
    {% if loop.index0 < 4 %}
    <li >
      <p class="latest-post__post"><a href="{{ post.url }}">{{ post.data.title }}</a></p>
      <time datetime="{{ post.date }}">{{ post.date | dateDisplay(" d LLLL  y") }}</time>
    </li>

    {%- endif -%}
  {%- endfor -%}

  </ul>
</div>
