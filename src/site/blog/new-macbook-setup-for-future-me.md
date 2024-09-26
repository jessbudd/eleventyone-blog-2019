---
title: Automating setup of a new Macbook - for my future self
date: 2024-05-15
meta: A shell script that uses Homebrew to set up a new fresh Macbook - for next time I need to do this and have forgotten.
# img: https://jessbudd.com/images/featured/old-content-warning.jpg
tags: [post, dev]
---

Hello future me! If you're reading this, it means you've got a shiny new MacBook and you're ready to set it up.

Sweet! 

I bet you don't remember how we did that last time, do you? 

Don't worry, I got you.
 
In 2024, you found this great [Medium article](https://medium.com/macoclock/automating-your-macos-setup-with-homebrew-and-cask-e2a103b51af1) by Daria Sova from 2020. You updated the things that had changed in the last few years (like the command to install casks), and tweaked it for the apps you need on a new machine.

## The plan

The shell script you're going to use is written in bash. It automates the process of installing Xcode CLI, Homebrew, your go-to packages and cask apps, and setting zsh as the default shell. 

It was also supposed to enable tap-to-click for your trackpad, just how you like it, but something changed in newer versions of macOS and the old methods no longer work. Booo, sad face.

### Create the shell script file

Create a new shell script in the command line by entering ```touch desktop/setup-script.sh```

Open the file with the command `nano desktop/setup-script.sh`

<!-- 
Use the macOs built in TextEdit app to create a new file on the desktop called `setup-script.sh`. 

You'll need to save this as plaint text by going to **Format** > **Make plain text**. -->

Copy and paste the below code into your new shell script file.

<pre>
{% filename "desktop/setup-script.sh" %}
<code class="language-bash">
#!/usr/bin/env bash
# Setup script for setting up a new macos machine

# function to print arguments in italic bold
bold_echo() {
    echo "\033[1;3m$*\033[0m"
}

bold_echo "Starting MacBook setup... 🏁"

# install xcode CLI which is required for Homebrew
xcode-select --install

# Check for Homebrew to be present, install if it's missing
if test ! $(which brew); then
    bold_echo "🍺 Installing homebrew..."
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

# Update Homebrew recipes if already installed
brew update

PACKAGES=(
    node
    fnm
    git
    zsh
)

bold_echo "📦 Installing packages..."
brew install ${PACKAGES[@]} 


CASKS=(
    adobe-acrobat-reader
    slack
    visual-studio-code
    firefox
    google-chrome
    1password
    miro
)

bold_echo "📦 Installing cask apps..."
brew install --cask ${CASKS[@]}


# set zsh as the default shell
bold_echo "🔄 Switching zsh as the default shell..."
chsh -s $(which zsh)
 
bold_echo "🧹 Cleaning up...."
brew cleanup

echo "✅ Macbook setup successful! 💪"
</code>
</pre>

### Run the script

Open your terminal and `cd` to the desktop folder where your file is located.

Enter the command `sh setup-script.sh`.

This will start the process, and you'll need to enter your password several times during the installation process to give permission for specific apps.

That's it! 

Your MacBook should now be set up with all your must-have standard apps.

Happy coding!