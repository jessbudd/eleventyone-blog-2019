---
title: Jess Budd, Front-end Dev & Accessibility Nerd
# subtitle: (Metaphorically speaking)
layout: layouts/base.njk
meta: Jess Budd is an experienced front-end developer and web accessibility advocate based in Perth, Australia.
---

# Hi, I'm&nbsp;Jess :wave:

Welcome to my little slice of the internet. Make yourself at home!

I'm a senior front-end engineer that specialises in web accessibility. If I'm not building or designing accessible user interfaces, I'm probably writing, speaking or tweeting about them.

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
