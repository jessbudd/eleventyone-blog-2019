---
title: Dev
layout: layouts/base.njk
subtitle: A collection of posts about front-end developement and tech.
---

<div class="container__blog">
  <h1>{{ title }}</h1>
  {%- if subtitle %}<p class="subtitle">{{ subtitle | safe }}</p>{% endif %}

<ul class="listing">
{%- for post in collections.dev | reverse -%}
  {% include "blog-repeat.njk" %}
{%- endfor -%}
</ul>

</div>
