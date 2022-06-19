---
title: How I set up git aliases on bash
# subtitle: And speed up your development
date: 2019-08-13
meta: Setting up aliases for commonly used commands in the terminal can save yourself a lot of time during development. Here's how I added Git aliases on my mac through bash.
excerpt: It was almost 2 year agos I first saw someone in a tutorial using an alias for their git commands. I thought at the time it was something I should set up, but not being incredibly comfortable in the command line, I didn't look into it much further...
tags: [post, dev]
---

It was almost 2 year agos I first saw someone in a tutorial using an alias for their git commands. I thought at the time it was something I should set up, but not being incredibly comfortable in the command line, I didn't look into it much further.

## What's an alias?

For those that may not have heard of aliases before, they're like shortcut commands in your terminal. You type the shortcut in place of typing the whole command.

For example instead of typing `git push` whenever I want to push my repo, I can assign a shortcode for that command and simply type `gp` (or whatever shortcut I set) to do the same thing.

Magic!

## Setting up an alias

This week, thinking it was about time I set up these aliases, I went off to google. I found a bunch of posts on how to create git aliases like [this one](https://stackoverflow.com/questions/2553786/how-do-i-alias-commands-in-git) and [this one](https://githowto.com/aliases), but got a little overwhelmed by the different options and as with most tutorials they assumed a fair bit of up front knowledge.

Following the most simple format example, I typed my most common git actions into the command line window I already had open for my current project.

<pre>
<code >

<span class="token selector">alias</span> gs='git status '

<span class="token selector">alias</span> ga='git add '

<span class="token selector">alias</span> gc='git commit -m '

<span class="token selector">alias</span> gp='git push'

<span class="token selector">alias</span> gb='git branch '

<span class="token selector">alias</span> go='git checkout '

<span class="token selector">alias</span> gm='git merge '

<span class="token selector">alias</span> gpl='git pull'

<span class="token selector">alias</span> gl='git log'

</code>
</pre>

I then tentatively tested my shiny new aliases with a `gs`.

It worked! Huzzah!

I went along my merry away.

Until the next day, when I got my dev environment up again and tried to use my new aliases. They didn't work.

    -bash: gs: command not found

_Sad face_.

## Setting up an alias _globally_

It turns out I had only created temporary aliases that existed in that sinlge CLI window only. To create global aliases that would persist in all future windows I needed to add them to my `.bash_profile`.

On a mac, the `.bash_profile` file is located in the home username folder. This was a hidden file, so I needed to show all hidden files by pressing `cmd + shft + .` to find it.

So in my `.bash_profile` file I typed the exact same code as I'd typed the day before.

<pre>
<span class="token selector">alias</span> gs='git status '

<span class="token selector">alias</span> ga='git add '

<span class="token selector">alias</span> gc='git commit -m '

<span class="token selector">alias</span> gp='git push'

<span class="token selector">alias</span> gb='git branch '

<span class="token selector">alias</span> go='git checkout '

<span class="token selector">alias</span> gm='git merge '

<span class="token selector">alias</span> gpl='git pull'

<span class="token selector">alias</span> gl='git log'

</pre>

I saved the file, closed down all my terminal windows and tested the alias in a fresh window and they worked. Yay!

## Other methods

Over the next couple days (thanks to the twitterverse) I found there are possibly better ways to do this. For example Atlassian has a good article that describes [how to set up your aliases through the gitconfig file](https://www.atlassian.com/git/tutorials/git-alias). One fender mentioned [oh-my-zsh comes with git aliases built in](https://ohmyz.sh/). Another fender mentioned putting the git aliases in a seperate alias file and then referencing that in your .bashrc file.

I'm sure there are good reasons to choose one method over the other, but for now I'm happy with the way I've done mine as it's fine for my situation.
