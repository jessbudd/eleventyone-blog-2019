---
title: APIs
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

<!-- <p class="user"></p> -->

  <form class="search" autocomplete="off">
    <input type="text" name="query">
    <button name="submit" type="submit">Submit</button>
  </form>
  <div class="recipes"></div>


<script>








// const baseEndpoint = 'https://api.github.com';
// const userEndpoint = `${baseEndpoint}/users`;
// const userEl = document.querySelector('.user');

// async function displayUser(username) {
//   userEl.textContent = 'Loading....';

//   const response = await fetch(`${userEndpoint}/${username}`);
//   const data = await response.json();

//   console.log(data);
//   console.log(data.name);
//   console.log(data.id);
//   console.log(data.email);

//   userEl.textContent = `${data.name} - ${data.id}`;
// }

// function handleError(err) {
//   console.warn('oh no!');
//   console.warn(err);
//   userEl.textContent = 'Something went wrong!';
// }

// displayUser('joebloggs394857').catch(handleError);

</script>

<style>
body {
  min-height: 100vh;
  display: grid;
  align-items: start;
  justify-items: center;
}


/* Variables */
html {
  --grey: #e7e7e7;
  --gray: var(--grey);
  --blue: #0072B9;
  --pink: #D60087;
  --yellow: #ffc600;
  --black: #2e2e2e;
  --red: #c73737;
  --green: #61e846;
  --text-shadow: 2px 2px 0 rgba(0,0,0,0.2);
  --box-shadow: 0 0 5px 5px rgba(0,0,0,0.2);
}


/* Table Styles */

table {
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 2rem;
  border-collapse: collapse;
}

td, th {
  border: 1px solid var(--grey);
  padding: 0.5rem;
}


/* Helper Divs */

a {
  color: var(--blue);
  text-decoration-color: var(--yellow);
}


a.button, button, input[type="button"] {
  color: white;
  background: var(--pink);
  padding: 1rem;
  border: 0;
  border: 2px solid transparent;
  text-decoration: none;
  font-weight: 600;
  font-size:2rem;
}

:focus {
  outline-color: var(--pink);
}

fieldset {
  border: 1px solid black;
}

input:not([type="checkbox"]):not([type="radio"]), textarea, select {
  display: block;
  padding: 1rem;
  border: 1px solid var(--grey);
}

.success {
  border: 1px solid red;
}


</style>
