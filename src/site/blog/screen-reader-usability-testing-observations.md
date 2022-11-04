---
title: 5 takeaways from screen reader usability interviews
date: 2022-11-05
meta: Some interesting details I observed when conducting user testing with frequent screen reader users.
# img: https://jessbudd.com/images/featured/web-scraper.png
excerpt: Some interesting details I observed when conducting user testing with frequent screen reader users.
tags: [post, a11y, dev]
---

Earlier this year I worked on the re-development of my workplace's primary website navigation. We went from a simple, single tier nav with no drop downs to a two tier nav with a drop down mega menu.

I was pretty confident we were ticking the major boxes of complying with the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/), but I also know that technical compliance does not necessarily equal a good user experience for people with disabilities. As part of the overall user testing strategy, it was important to us to include people with disabilities.

Of the five interviews we conducted with frequent screen reader users, there were a number of common patterns that stood out or surprised me:

## 1. Not using the tab key for navigating

It's always been drilled into me that interactive elements, for example buttons, links and form elements, must be accessible by tabbing to it with the keyboard. This is the main way I conduct my own manual keyboard testing. Tab, tab tab.

Yet, not one of our interviewees actually used the tab key as their primary method of navigating. That's not to say tabbing through a page is not a good way to test keyboard accessibility, just that it's not necessarily how navigation usually happens.

The most common method of navigation was to use their screen reader software to bring up a list of all the links or headings on the page. They would then jump directly to the heading or link that sounded like what they were looking for.

<p class="quote"><strong><em>Takeaway</em></strong>: Semantically marked up headings (using the appropriate HTML elements) and descriptive link text are incredibly important for efficient page navigation.</p>


##  2. Not using the full screen

When the interviewees opened our website, the browser window would by default only take up a portion of their monitor screen. None of the interviewees enlarged the window unless we asked them to.

The users in these interviewees did not rely on sight to perceive our website, so it made perfect sense. But This meant the users would not have been experiencing the desktop version of our primary navigation, but the mobile version. This was important because we were testing a feature that has a different layout/behaviour based on viewport size.

<p class="quote"><strong><em>Takeaway</em></strong>: We can't assume people are experiencing our "desktop" layouts just because their device is a computer.</p>

## 3. Home link expectations

When we asked users to navigate from the page they were on to the home page, we expected them to use the company logo link. You know that company logo almost every website has in the top left corner that links back to their homepage?

Instead, all of our interviewees looked for a link being announced as "Home", _not_ the name of our company.

<p class="quote"><strong><em>Takeaway</em></strong>: Usually when we think of alt text, we think "What is this a picture of?" - but in the case of links where the <em>only content is an image</em>, the alt text needs to describe the <em><a href="https://webaim.org/blog/alt-text-and-linked-images/#:~:text=However%2C%20any%20time%20an%20image%20is%20the%20only%20content%20within%20a%20link%2C%20the%20image%20MUST%20be%20given%20alternative%20text%20that%20presents%20the%20function%20of%20that%20link.">function of the link</a></em>, not the image. </p>

## 4. The importance of descriptive link text

During our testing, we asked our interviewees to navigate to certain pages, for example Pricing and Contact Us. Instead of navigating sequentially through the menu items, users opened a list of all the links on the page (see point one).

Once this was open, many used the letters on the keyboard to search for the available links starting with the first letter of what they would expect the page name to start with. For example "p" for "Pricing", "c" for "Contact".

<p class="quote"><strong><em>Takeaway</em></strong>: Having fun with your link text, for example "Get in touch!" instead of "Contact us" may be on brand, but it also might make it harder for screen reader users to find what they're looking for.</p>

## 5. None used skip links

None of our users were interested in using [skip-to-content links](https://webaim.org/techniques/skipnav/#overview). This surprised me, but I've since see is backed up by the latest [WebAim screen reader survey](https://webaim.org/projects/screenreadersurvey9/#skip) which states:

_“It's important to note that "skip" links provide distinct benefits for sighted keyboard users, even if their usage among screen reader users is mixed.”_

So turns out they our interviewees were not necessarily the main users of these.

3/5 users also mentioned part of the reason they don't bother is most of the time _skip links are broken_ and actually don't move keyboard focus.

<p class="quote"><strong><em>Takeaway</em></strong>: Sometimes we assume who will benefit from specific accessibility features. (And you know what they say about assuming.) Also, make sure your skip links actually work!</p>


## The biggest takeway

I shared my biggest takeaway in the twitter thread that inspired this post:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Testing your product for <a href="https://twitter.com/hashtag/accessibility?src=hash&amp;ref_src=twsrc%5Etfw">#accessibility</a> yourself will *never* compare with testing with real users. <br><br>This week we conducted 5 usability interviews with frequent screen reader users. Here are some things I observed:<br><br>(a thread) 🧵👇</p>&mdash; Jess Budd (@jessbudd4) <a href="https://twitter.com/jessbudd4/status/1537620188324978688?ref_src=twsrc%5Etfw">June 17, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Testing your product for accessibility yourself will *never* compare with testing with real users. [Even if you have a disability yourself](https://twitter.com/jessbudd4/status/1537757945081233408?s=20&t=sTCj35qtmEWYRfagfjHjZg)!

To sum up my Accessibility Testing recommendation:

- Test with automated tools.
- Test manually yourself.
- Then test with people with disabilities.


<!-- _Side note_: This post started as a <a href="https://twitter.com/jessbudd4/status/1537620188324978688">twitter thread</a>. -->