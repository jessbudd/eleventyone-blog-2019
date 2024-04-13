---
title: The simple joy of building small things
date: 2024-03-29
meta: Rediscovering the joy of building small things in a world of big tasks. 
tags: [post, dev, life]
---

Like many others who code for a living, a lot of my days are spent working on large-scale projects and tackling complex tasks. But recently, I spent a free evening building a small, self-contained site - and rediscovered the simple joy of building small things just for fun.

I’m currently planning a trip to Japan with my small family. Being the type A planner I am, I’ve researched a lot about the country, and the top “must-see” spots and places to visit. Very exciting! 

But I was also put off by the tales of intense shoulder-to-shoulder crowds in some of these locations. As an introvert who works 100% remote by choice, you can imagine my aversion for mosh-pit like crowds. Especially with two kids in tow!

One of the places I read a lot of accounts of overcrowding is [Kyoto](https://kyoto.travel/en/). This is one of the most popular tourist cities in Japan, and has been subject to overtourism over the years.

To help combat this and educate tourists, the City of Kyoto set up some permanent live stream cameras in the most popular locations. I was lucky to stumble upon this great resource that [forecasts the crowd levels](https://global.kyoto.travel/en/comfort/) in Kyoto, along with embeds of these live stream cameras.

<img src="/images/posts/kyoto-crowd-forecast.png" alt="Kyoto crowd forecast website" width="100%">

The only problem was that you had to click the individual location on the map top open a modal and scroll down to see that individual location's live stream.

<img src="/images/posts/kyoto-crowd-forecast2.png" alt="Kyoto crowd forecast website with a modal open for Fushimi Inari and scrolled part way down the page to see the youtube live stream embed" width="100%">

Not very efficient if you want to check back at different times of the day, like I did. 

When I first found it, I opened up each location in a new tab and manually switched between them. Then I tried arranging the multiple tabs across the screen to see a few at the same time, but it took up a lot of real estate and it wasn't practical to do this more than a few times.

What I really needed was a dashboard - like security guards have in movies! - where you can see all the videos at the same time small, and be able to bring them up full screen as needed.

_“Wait a second.._.I’m a developer, I can just make that!”

My next thought was “Can I even remember how to make an old school website?” 🤔

I’ve been in the land of heavy JavaScript frameworks and complicated build pipelines for so long; maybe I've forgotten how to make something simple?

I opened up VS Code and saved a blank HTML page to the desktop, then right clicked the file to open it up in my browser. I actually had to Google the basic HTML boilerplate because it’s not something we really do by hand or memory anymore.

Soon I had a basic HTML page with a couple of manual youtube embeds. Good start!

I added a `<script>` tag to the file and wrote some vanilla JS for populating all the videos. No shadow DOM here - a real DOM!

I added a `<style>` tag directly to the page to lay out a responsive grid. I manually refreshed the page when I wanted to view the changes - no hot reloading magic here!

<img src="/images/posts/kyoto-crowd-code.png" alt="HTML file with javascript and css in same document" width="100%">

When I was (mostly) happy with the functionality and the grid, I moved the CSS and JS into their own files.

Soon it was time to get this bad boy out into the world, where I could easily bring it up on my mobile phone at any time of day.

Since I don’t have my own web hosting anymore, I pushed it up to GitHub and deployed my three little files with Netlify.

No complicated build steps, no compiling, no pre or post-processing – just HTML, CSS, and vanilla JavaScript.

And you know what? It's serving its purpose and it was super fun to make!

In just a few hours and a handful of commits, I created something that may not be impressive or used by anyone but me, but it's out there in the world – a little "I waz here" timestamp on the internet.

And it brings me joy to think about it.

<img src="/images/posts/kyoto-crowd-cams2.png" alt="Kyoto Crowd Cams finished website" width="100%">

P.S Here's the [finished page](https://kyotocrowdcams.netlify.app/). 



