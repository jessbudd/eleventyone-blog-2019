---
title: Typeform input announcing [object object] in screen readers
date: 2024-04-30
meta: A solution to an unusual Typeform bug where form labels are announced incorrectly for screen readers. 
tags: [post, dev, a11y]
---

Typeform is an interactive form builder that enables marketing teams to create complex web forms, and in the past has courted controversy over their accessibility. Or, [lack of accessibility](https://a11y.reviews/#typeform) as it were.

In recent years, Typeform has made significant improvements and is formally striving to comply with the Web Content Accessibility Guidelines (WCAG). When I personally completed accessibility testing to assess their suitablity to use on our marketing website, there were only minor issues found.

Imagine my disappointment when a draft form created for an important product launch was found to not work with screen readers! Although rendering correctly visually, all the radio buttons were being announced as “Object Object”. 

This would prevent a screen reader user from knowing what each radio button option was, and completely prevent them from completing the form.

<figure>
<img src="/images/posts/typeform2.png" alt=""/>
<figcaption>Typeform announcing "[object object]" for a radio button in VoiceOver on macOS</figcaption>
</figure>

Announcing form labels correctly is _fundamental_ functionality for a company that claims WCAG compliance to get wrong - so I was fairly confident there must be something unusual happening. That we must have triggered some unusual bug. 

Googling the issue didn’t return any useful results, and we weren't getting a timely response Typeform, so we were on our own. 

My first thought was that Iframes are tricky beasts, so perhaps it was to do with the iframe embed? No, we had previously tested embedded forms with no issues. 

I kicked off investigations with my first golden rule of troubleshooting; _reproduce the behaviour_. 

I created a new form with just one question and it worked fine, as expected. 

I added as many multiple-choice options as the broken from had. Still working.

I added conditional logic like the broken form had. _Still_ fine.

I brought the original broken form and my new working dummy form up on the screen to compare the accessibility trees side by side. 

<figure>
<img src="/images/posts/typeform4.png" alt=""/>
<figcaption>Side by side comparison of the accessibility tree for each form showing that the broken form has an aria label of "[object object]"</figcaption>
</figure>

The obvious difference was the aria-label. The working form had the same value as the label text, however the original form had an aria-label value of “[Object Object]”.

Aria-labels are not manually set in Typeform, so the field must be being passed a value it wasn’t expecting.

I then moved to comparing the HTML. That's when I noticed the form that wasn't working had `<strong>` tags and bolded text.

<figure>
   <img src="/images/posts/typeform5.png" alt=""/>
   <figcaption>Side by side comparison of the html markup of each form showing that the broken form label text is within strong tags</figcaption>
</figure>

Eureka! This must be it. Easy enough to test right?

Ah, no. 

There was no mechanism or setting in the online interface to make label text bold.

I tried adding html strong tags directly to my label text, which didn’t work.

I tried adding markdown syntax. No dice.

How did the marketing team actually make the text bold?

I was stumped, until a colleague had the idea to try the keyboard shortcut for bolding text,  `cmd + b`. 

Mystery solved!

The keyboard shortcut bolded the label text, and successfully broke the working form. Confirming conclusively that bolding form label text will result in screen readers announcing the input as "[object object]".

The aria-label attribute is expecting to be passed a string. When it gets passed an html node instead, that object gets converted to a string. And in JavaScript, this becomes "[object object]". And screen readers prioritise announcing an aria-label over the text within the element.

The fix was as simple as removing the bolding by highlighting the text and entering the keyboard shortcut again. 

> As of 30 April, this bug is still present. Until Typeform fixes it, you can check out the behaviour on this [dummy Typeform](https://mazwz8p5bmj.typeform.com/to/xp4jURhT). 

<img src="/images/posts/typeform1.png" alt=""/>


(I’ve reported the issue to Typeform, so a fix should be coming for this unusual edge case).

## Key takeaways

### Always test for accessibility! 

If we hadn’t quickly run this lead generation form through a screen reader before launch, we would have never known the experience was completely unusable for a subset of our customers. 

It doesn't take a lot of time or effort to do some accessibility testing, but it can make a huge impact for someone trying to use your product. 

### Users will break your carefully planned UI in unexpected ways

An engineer at Typeform had no idea it was even possible to bold input label text! It's not _supposed_ to be possible, but here we are. 

None of us working in tech should be surprised anymore by the weird and wonderful ways our users will circumvent our safeguards and work around our limitations.

This meme is still doing the rounds for a reason.

<img src="/images/posts/uxmeme.png" alt="A neatly paved pedestrian path with the word Design superimposed. Next to the path is a well worn sand path through the manicured lawn with the words User Experience superimposed."/>

Thanks for reading! 