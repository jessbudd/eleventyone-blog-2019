---
title: 5 takeaways from screen reader usability interviews
date: 2022-11-05
meta: Some common patterns that stood out to me during usability interviews with frequent screen reader users.
excerpt: Common patterns that stood out during usability testing with frequent screen reader users.
img: https://jessbudd.com/images/featured/takeaways-screen-reader-testing.png
tags: [post, a11y, dev]
---

Earlier this year I worked on the re-development of my workplace's primary website navigation. We went from a simple, single-tier nav with no drop-downs to a two-tier nav with a drop-down mega menu.

I was pretty confident we were ticking the major boxes of complying with the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) (WCAG), but I also know that technical compliance does not necessarily equal a good user experience for people with disabilities. As part of the overall user testing strategy, it was important to us to include people with disabilities.

Of the five usability interviews we conducted with frequent screen reader users, some common patterns stood out to me:

## 1. Not using the tab key for navigating

It's always been drilled into me that interactive elements (links, buttons, form elements etc) must be accessible by tabbing to it with the keyboard.

This is the main way I conduct my own manual keyboard testing. Tab, tab tab.

Yet, not one of our interviewees used the tab key as their primary method of navigating. That's not to say tabbing through a page isn't a good way to test keyboard accessibility, just that it's not necessarily how navigation usually happens for screen reader users.

The most common method of navigation was to use the screen reader software to bring up a list of all the links or headings on the page. The user could then jump directly to the heading or link that sounded like what they were looking for.

<p class="quote"><strong><em>Takeaway</em></strong>: Semantically marked-up headings (using the appropriate HTML elements) and descriptive link text are incredibly important for efficient page navigation.</p>


## 2. Home link alt text

When we asked users to navigate from an internal page to the homepage, we expected them to use the company logo link.
Like most websites, the link to our homepage is an image of our company logo in the top left corner, with the alt text being the company name.

Instead, all of our interviewees searched for a link being announced as "Home". Some even passed over the homepage link with our company name announced without realising the link was the way back to the home page.

<p class="quote"><strong><em>Takeaway</em></strong>: Usually when we think of alt text, we think "What is this a picture of?" - but in the case of links where the <em>only content is an image</em>, the alt text needs to describe the <em><a href="https://webaim.org/blog/alt-text-and-linked-images/#:~:text=However%2C%20any%20time%20an%20image%20is%20the%20only%20content%20within%20a%20link%2C%20the%20image%20MUST%20be%20given%20alternative%20text%20that%20presents%20the%20function%20of%20that%20link.">function of that link</a></em>. Not the image itself. </p>

## 3. The importance of descriptive link text

During our testing, we asked our interviewees to navigate to certain pages, for example Pricing and Contact Us. Instead of navigating sequentially through the menu items, users opened a list of all the links on the page (see point one).

With this list open, it was common to type the letter on the keyboard to search for the available links starting with the first letter of what they would expect the page name to start with. For example "p" for "Pricing", "c" for "Contact".

<p class="quote"><strong><em>Takeaway</em></strong>: Having fun with your link text, for example "Get in touch!" instead of "Contact us", may be on brand - however it also might make it harder for screen reader users to find what they're looking for.</p>


##  4. Not using the full screen

When the interviewees opened our website, the browser window would, by default, only take up a portion of their monitor screen. None of the interviewees enlarged the window until we asked them to.

This means some users will experience the mobile layout and behaviour of the menu navigation, rather than the desktop version we intended.

<p class="quote"><strong><em>Takeaway</em></strong>: We can't assume people are experiencing our "desktop" layouts just because their device is a computer.</p>


## 5. None used skip links

We asked our testers how they would bypass the navigation menu on subsequent pages. None mentioned [skip-to-content](https://webaim.org/techniques/skipnav/#overview) links.

 We asked them to confirm if our skip link was accessible for them, whether it was useful to them and if they normally use skip links.

The majority of users suggested skip links are less efficient for them than other methods of bypassing repeated content. (They also mentioned that much of the time skip links are _broken_ because often the keyboard focus does not move.)

Later, I went on to read the latest WebAim [screen reader survey](https://webaim.org/projects/screenreadersurvey9/#skip) which states:

_“It's important to note that "skip" links provide distinct benefits for sighted keyboard users, even if their usage among screen reader users is mixed.”_


<p class="quote"><strong><em>Takeaway</em></strong>: Sometimes we assume a certain demographic will benefit from specific accessibility features (and you know what they say about assuming.)<br>Also, make sure your skip links move the keyboard focus!</p>


## The biggest takeaway

I shared my headliner thought in the [twitter thread](https://twitter.com/jessbudd4/status/1537620188324978688) that inspired this post:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Testing your product for <a href="https://twitter.com/hashtag/accessibility?src=hash&amp;ref_src=twsrc%5Etfw">#accessibility</a> yourself will *never* compare with testing with real users. <br><br>This week we conducted 5 usability interviews with frequent screen reader users. Here are some things I observed:<br><br>(a thread) 🧵👇</p>&mdash; Jess Budd (@jessbudd4) <a href="https://twitter.com/jessbudd4/status/1537620188324978688?ref_src=twsrc%5Etfw">June 17, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Testing your product for accessibility yourself will never compare with testing with real users. [Even if you have a disability yourself](https://twitter.com/jessbudd4/status/1537757945081233408?s=20&t=sTCj35qtmEWYRfagfjHjZg).


Test for accessibility with automated tools, test manually yourself, then _test with people with disabilities_.