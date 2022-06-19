---
title: Hiding content accessibly
subtitle:
date: 2019-11-17
tags: [post, a11y]
meta: There are often situations where we need to hide content on a page, here's how to do it accessibily.
img: https://jessbudd.com/images/featured/hidingContent.png
excerpt: There are often situations where we need to hide content on a page, either temporarily or permanently. The method you use for hiding content can have a big impact on accessibility, so this post will discuss when to use particular techniques...
---

<p class="subtitle">There are often situations where we need to hide content on a page, either temporarily or permanently. The method you use for hiding content can have a big impact on accessibility, so this post will discuss when to use particular techniques.</p>

<!--
I want to quickly cover some of those situations, and which method would be appropriate to ensure web accessibility.  -->

<!-- If you're new to accessibility, I recommend checking out <a href="#">Microsoft's What Is Inclusive Design</a>. -->

There are generally 3 scenarios where we want to hide content:

1. We want to hide content for everyone (including people using screen readers).
1. We want to hide content visually (but not from screen readers).
1. We want to hide content from screen readers (but not visually).

## Hiding content for everyone

<!-- ### Usecase: -->

Common situations where you want to hide content from everyone, including sighted keyboard users and people using screen readers, are closed navigation menus, tooltip text and collapsed accordions.

The CSS styles below will prevent the element displaying visually on the page, will be ignored by screen readers, and will prevent keyboard users tabbing to the content.

<!-- ### Method: -->
<pre>
<code class="language-css">
.hide-for-all { display: none; }
</code>
</pre>

<pre>
<code class="language-css">
.hide-for-all { visibility: hidden; }
</code>
</pre>

The difference between `display: none;` and `visibility: hidden;` is that hidden elements are not removed from the document flow, so will retain its physical space on the page.

A common mistake when hiding content is to use `opacity: 0;` when the intention is to hide the content from everyone. Although this styling removes the content visually, it is still announced by screen readers and potentially focusable by the keyboard.

## Hiding content visually

There are two main situations when you want to hide content visually:

- When you _never_ want the content to be visible on the page.
- When you want the content to become visible when focused by the keyboard.

### Never visible

There are times when the visual information in a design is not sufficient for screen readers users. A common example of this is form inputs that aren't given visual labels.

Labels are crucial for screen reader users to understand and successfully complete forms. So in a situation like this you could visually hide the label with CSS.

The most commonly accepted practice for modern browser support is using clip-rect.

<pre>
<code class="language-css">
.sr-only {
    position: absolute;
    height: 1px;
    width: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    margin: -1px;
    overflow: hidden;
    padding: 0;
    border: 0;
    white-space: nowrap;
}
</code>
</pre>

Elements with this class will not be visible on the page or take up space in the visual flow, but will announce the contents to assistive technologies.

### Visible when focused

Sometimes we want to hide an element only until it receives keyboard focus.

A perfect example of this are skip-links. A [skip-link](https://webaim.org/techniques/skipnav/) is styled with CSS to remain out of view until a user tabs to the element and is then sent back off-screen when it leaves keyboard focus. This behaviour benefits sighted keyboard users, without changing the visual design for mouse users.

<!-- ### Method - Visble when focused: -->

We use a combination of CSS properties to position the content offscreen and the `:focus` pseudo element to bring the position onto the page as the element by the keyboard.

<pre style="margin-bottom:0;">
<code class="language-css">
/* positioned offsceen so not visible */
.skip-link a {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
}
</code>
</pre>
<pre style="margin-top:0">
<code class="language-css">
/* appears back on screen when focused with keyboard */
.skip-link a:focus { 
    position: static; 
    width: auto; 
    height: auto;
}
</code>
</pre>

### Combined approach

An alternative approach is to combine these two methods and use the `:not(:focus)` and `:not(:active)` pseudo elements within the `sr-only` class. This will remove the offscreen styling when an element is focused or active.

<pre>
<code class="language-css">
.sr-only:not(:focus):not(:active) {
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    margin: -1px;
    overflow: hidden;
    padding: 0;
    white-space: nowrap;
}
</code>
</pre>

## Hiding content from screen readers

<!-- ### Usecase: -->

It's uncommon to need content to be hidden from screen readers only, however this can be appropriate when visual content is decorative or duplicative. An example would be SVG or font icons that are accompanied by text labels.

We can hide the icons from assistive technology using `aria-hidden="true"`. This effectively has the opposite behaviour of our `sr-only` class, in that it remains visually on the page while being ignored by assistive technologies.

<!-- ### Method: -->

<pre>
<code class="language-markup">
&lt;button>
    &lt;span class="icon-close-menu" aria-hidden="true">&lt;&sol;span> 
    &lt;span class="sr-only">Close navigation menu&lt;&sol;span>
&lt;/button>
</code>
</pre>

## Further Reading

If you're interested in learning more about hiding content accessibly here are some great resources:

- [Invisible Content Just For Screen Readers by WebAIM](https://webaim.org/techniques/css/invisiblecontent/)
- [How to Hide Content by The A11y Project](https://a11yproject.com/posts/how-to-hide-content/)
- [Inclusively Hidden by Scott O'Hara](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html)
