---
title: Promise chain
# subtitle:
layout: layouts/blank.njk
date: 2021-12-12
meta:
excerpt:
# tags: funstuff, exercises
# img: https://jessbudd.com/images/featured/---.png
draft: true
---

<h1>{{ title }}</h1>

{%- if subtitle %}<p class='subtitle'>{{ subtitle | safe }}</p>{% endif %}

  <div class="go">Click Me</div>

<script>


const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

    wait(200).then(() => {
      console.log('Done!');
    })

    const go = document.querySelector('.go');

    async function animate2(e) {
      const el = e.currentTarget;
      // 1. Change the text to GO when clicked.
      el.textContent = 'GO';
        await wait(200);
        el.classList.add('circle');
        await wait(500);
        el.classList.add('red');
        await wait(250);
        el.classList.remove('circle');
        await wait(500);
        el.classList.remove('red');
        el.classList.add('purple');
        await wait(500);
        el.classList.add('fadeOut');
}

    function animate(e) {
      const el = e.currentTarget;
      // 1. Change the text to GO when clicked.
      el.textContent = 'GO';
      // 2. Make it a circle after 2 seconds
      wait(200)
        .then(() => {
          el.classList.add('circle');
          return wait(500);
        })
        .then(() => {
          // 3. Make it red after 0.5s
          el.classList.add('red');
          return wait(250);
        })
        .then(() => {
          el.classList.remove('circle');
          return wait(500);
        })
        .then(() => {
          el.classList.remove('red');
          el.classList.add('purple');
          return wait(500);
        })
        .then(() => {
          el.classList.add('fadeOut');
        })
    }

    go.addEventListener('click', animate2);

    go.addEventListener('clickXXXX', function go(e) {
      const el = e.currentTarget;
      // 1. Change the text to GO when clicked.
      el.textContent = 'GO';
      setTimeout(function () {
        // 2. Make it a circle after 2 seconds
        el.classList.add('circle');
        setTimeout(function () {
          // 3. Make it red after 0.5s
          el.classList.add('red');
          setTimeout(function () {
            // 4. make it square after 0.25s
            el.classList.remove('circle');
            setTimeout(function () {
              // 5. make it purple
              el.classList.remove('red');
              el.classList.add('purple');
              setTimeout(function () {
                // 6. fade out after 0.5s
                el.classList.add('invisible');
                setTimeout(function () {
                  console.log('You have reacted the 7th layer of callback hell');
                  el.classList.remove('invisible', 'purple');
                }, 500);
              }, 500);
            }, 500);
          }, 500)
        }, 500)
      }, 500)
    });


</script>

<style>
body {
  min-height: 100vh;
  display: grid;
  align-items: start;
  justify-items: center;
}

 .go {
      margin: 5rem;
      background: white;
      padding: 5rem;
      width: 25rem;
      height: 25rem;
      transition: all 0.2s;
    }

    .go.circle {
      border-radius: 50%;
    }

    .go.red {
      background: red;
    }

    .go.purple {
      background: purple;
      color: white;
    }

    .go.fadeOut {
      opacity: 0;
    }
</style>
