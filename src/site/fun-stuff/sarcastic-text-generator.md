---
title: Sarcastic Text Generator
# subtitle:
layout: layouts/blank.njk
date: 2019-12-12
meta: Convert your inputted text into another writing style.
excerpt:
# tags: funstuff, exercises
# img: https://jessbudd.com/images/featured/---.png
draft: true
---

<h1>{{ title }}</h1>

 <div class="typer">
    <label for="sarcastic">
      <input type="radio" value="sarcastic" id="sarcastic" name="filter" checked>
      Sarcastic
    </label>
    <label for="funky">
      <input type="radio" value="funky" id="funky" name="filter" >
      Funky
    </label>
    <label for="unable">
      <input type="radio" value="unable" id="unable" name="filter">
      Unable to Structure a Sentence
    </label>
    <textarea name="text" placeholder="Type your text here"></textarea>
    <p class="result"></p>
  </div>

<script>
const textarea = document.querySelector('[name="text"');
const result = document.querySelector('.result');
const inputs = Array.from(document.querySelectorAll('.typer input[name=filter]'));

// create object that holds our transform functions
const filters = {
    sarcastic: function(letter, index) {
        if(index % 2) {
            return letter.toUpperCase()
        }
        return letter.toLowerCase();        
    },
    funky: function() {
        console.log("funky");
        
    },
    unable: function() {
        console.log("unable");
        
    },
}

function transformText(text) {
    const filter = inputs.find( input => input.checked).value;
    console.log(filter);
    
    // take the text, and loop over each letter
    const mod = Array.from(text).map(filters[filter]);
    result.textContent = mod.join('');
}



function handleInput() {
    // set updated value of text
    // result.textContent = text.value;
    const updatedText = textarea.value
    // get which radio button is selected
    // console.log(style);
    // match that name to function
    
    // put text through function to style

    // output text on page
    // result.textContent = value(updatedText);

}

// listen for keyup
textarea.addEventListener('input', event => transformText(event.target.value));

// TODO: Add copy to clipboard button

</script>

<style>
    body {
        min-height: 100vh;
        display: grid;
        align-items: center;
        justify-items: center;
    }
    .container {
        text-align: center;
        margin: 2% auto 0;
        display: grid;
        align-items: center;
        justify-items: center;
    }
    .typer {
      margin: 40px auto;
      background: white;
      width: 500px;
      padding: 2rem;
      padding: 2rem;
      border-radius: 3px;
      display: grid;
      text-align: left;
      color: #666;
    }
    p {
        color: #666;
    }
    textarea {
      width: 100%;
    }
    label,
    textarea {
        margin: 5px 0;
    }
  </style>
