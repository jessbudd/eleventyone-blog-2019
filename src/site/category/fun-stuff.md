---
title: Fun stuff
layout: layouts/base.njk
subtitle: Bits and bobs of self-contained little things made with HTML/CSS/JS.
---

<div class="container__blog">
  <h1>{{ title }}</h1>
  {%- if subtitle %}<p class="subtitle">{{ subtitle | safe }}</p>{% endif %}

<ul class="listing">
{%- for post in collections.funstuff | reverse -%}
  {% include "blog-repeat.njk" %}
{%- endfor -%}
</ul>

</div>
<style>
  time {
    display: none;
  }
</style>
