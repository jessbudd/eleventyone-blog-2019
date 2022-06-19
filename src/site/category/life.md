---
title: Life
layout: layouts/base.njk
subtitle: A collection of posts about my professional and personal life.
---

<div class="container__blog">
  <h1>{{ title }}</h1>
  {%- if subtitle %}<p class="subtitle">{{ subtitle | safe }}</p>{% endif %}

<ul class="listing">
{%- for post in collections.life | reverse -%}
  {% include "blog-repeat.njk" %}
{%- endfor -%}
</ul>

</div>
