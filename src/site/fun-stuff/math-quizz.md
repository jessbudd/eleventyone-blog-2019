---
title: Math Quiz Buddy
layout: layouts/blank.njk
date: 2023-05-19
meta:
# tags: funstuff
# img: https://jessbudd.com/images/featured/quoteGenerator.png
excerpt: Does your kid ask you to quiz them on their times tables? Introducing my little helper...
---

<h1>{{title}}</h1>

Does your kid ask you to quiz them on their times tables? Mine does, especially when my brain is too tired to come up with random calculations and remember third grade math.

Introducing my little helper...

<section class="generator">

  <div id="quiz" class="generated"><span style="opacity: 0;" aria-hidden="true">HoldingSpace</span></div>

<button class="btn" id="button">Get a question</button>

</section>

<section class="info">
Randomly displays an equation from 1 to 12 times tables.
</section>

<style>
body {
  min-height: 100vh;
  display: grid;
}
.container {
  margin: 5% auto 0;
  text-align: center;
}
.generated {
    font-size: 5rem;
}
.answer {
  display: block;
  font-size: 3rem;
}
.btn {
    text-decoration: none;
    background-color: transparent;
    color: #00ffd2;
    border: #00ffd2 1px solid;
    font-size: 1.2rem;
    padding: 12px 24px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
}

</style>

<script>

const handleClick = (e) => {
quiz.innerHTML = multiply();
}
const button = document.getElementById('button');
button.addEventListener('click', handleClick);
const quiz = document.getElementById('quiz');

const multiply = () => {
  const number1 = Math.floor(Math.random() * 12) + 2;
  const number2 = Math.floor(Math.random() * 12) + 2;
  return `${number1} x ${number2} <span class="answer"> = ${number1*number2}</span>`
}

</script>
