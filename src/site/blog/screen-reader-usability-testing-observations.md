---
title: Observations from 5 screen reader user interviews
date: 2022-08-15
meta: Some interesting details I observed when conducting user testing with frequent screen reader users.
img: https://jessbudd.com/images/featured/web-scraper.png
excerpt: Some interesting details I observed when conducting user testing with frequent screen reader users.
tags: [post, a11y, dev]
---

I've recently been working on the re-development of my company's primary website navigation. There were some known accessibility issues with the original navigation menu and we really wanted to make sure we got this one right.

As part of our overall user testing strategy, we included 5 frequent screen reader user testers.

I’m pretty comfortable with the mechanics of complying with the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) (thanks to a previous role as a digital accessibility auditor), yet there was still plenty to learn from real users.

<p class="quote">This post is a longer version of a <a href="https://twitter.com/jessbudd4/status/1537620188324978688">tweet thread</a> that summarised my main takeaways.</p>

Here are some of the things I observed during our screen reader usability interviews.

## 1. Lack of tab key for navigating

I've always had it drilled into me that all interactive elements must be accessible by tabbing to it. This is the main way I conduct my own keyboard testing. Tab, tab tab.

Yet, not one of our interviewees actually used the tab key as their primary method of navigating. _(That's not to say tabbing through a page is not a good way to test keyboard accessibility, just that it's not necessarily how navigation usually happens.)_

The most common method of navigation was to bring up a list of all the links or headings on the page and then traverse through those.

_Takeaway_: Semantic headings (using the appropriate html elements) and descriptive link text are so important for screen navigation.

## 2. Part screen? No worries

When the interviewees opened their web browser, the window only filled about half their screen - and they only enlarged it because we asked them to.

This was super relevant tofor us, because we were testing a feature that has a different layout/behaviour based on viewport size.

_Takeaway_: Reminds me that we can't assume people are experiencing our "desktop" layouts just because their device is a computer.

## 3. Company logo alt text

You know that company logo every website has in the top left corner that links back to their homepage?

All our interviewees looked for (and expected) that link to be announced as "Home", _not_ the name of our company.

_Takeaway_: Good reminder that when images are the only content in a link, the alt text should describe the function of the link, not what the image is.

## 4. The importance of link names

When our interviewees navigated by a list of links to search for a specific page, they typed the first letter of the word they expected the link to start with. Eg "p" for "pricing", "c" for "contact us".

_Takeaway_: Having fun with your link text ("Get in touch!") may be on brand, but it might not be helpful.

## 5. Skip links out of favour

None of our users were interested in using skip to content links. This one surprised me, but I now see is backed up by the latest @webaim screen reader survey which says:

“It's important to note that "skip" links provide distinct benefits for sighted keyboard users, even if their usage among screen reader users is mixed.” So turns out they our interviewees were not necessarily the main users of these.

3/5 users also mentioned part of the reason they don't bother is most of the time _skip links are broken_ and actually don't move keyboard focus.

_Takeaway_: Different accessibility features benefit some disabilities more than others. And make sure your skip links actually work!

A number of people asked where we found our screen reader user testers.
