---
title: Fixing npm EACCESS errors
subtitle: (permission denied, mkdir)
date: 2019-09-15
meta: Build tools like Gulp and Webpack are pretty amazing - but it's really frustrating when you keep getting npm errors! Here's what worked for me.
excerpt: Build tools like Gulp, Grunt and Webpack are pretty amazing - but sometimes when I am using npm to install the node modules required for my project I run into issues. Recently when running the basic...
tags: [post, dev]
categories: test
---

Build tools like Gulp, Grunt and Webpack are pretty amazing - but sometimes when I am using npm to install the node modules required for my project I run into issues.

Recently when running the basic <code>npm install</code> command in the terminal I've been getting quite a few errors along the lines of:

<code class="block"> Error: EACCES: permission denied, mkdir </code>

The first thing I tried was running it with sudo.

<code class="block">
$ sudo npm install
</code>

No dice.

I checked I was running the latest versions of node and npm, and updated to the latest stable release just in case.

<code class="block">\$ sudo npm update </code>

Then I deleted the existing node modules folder in my project and tried running the command again. But I kept getting the same errors for those packages, which was really frustrating.

<!-- <code class="block">$ sudo npm install</code> -->

I did some googling and found adding a particular command worked for quite a few people. So I tried:

<code class="block">\$ sudo npm install --unsafe-perm=true --allow-root</code>

Unfortunately, it didn't work for me.

I went on for more googling and came across [this npm community thread](https://npm.community/t/global-installs-sudo-npm-i-g-fail-on-mac-after-6-5-upgrade-works-fine-after-6-4-1-downgrade/4082/27) where one poster suggested we need to change the permissions of the folder. The code he suggested was:

<code class="block">
$ sudo chown -R $(whoami) ~/.npm </code>

<code class="block">$ sudo chown -R $(whoami) /usr/local/lib </code>

<code class="block">$ sudo chown -R $(whoami) /usr/local/bin</code>
</code>

And it worked, everything installed correctly after that!

I have a basic understanding of how this command updates the folder permissions thanks to a mini command-line course I took a couple years ago, but I wouldn't have gotten there on my own.

I'm one happy chappy and can continue on with the React Gatsby project I was working on. I just wanted to document this for future me next time I come across this issue!
