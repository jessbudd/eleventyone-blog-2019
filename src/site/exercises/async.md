---
title: Async Await
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

<script>
// function wait(ms = 0) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     })
// }

// async function go() {
//     console.log("staring");
//     await wait(2000);
//     console.log("ending");
// }

// go();

// // works on all function types eg

// // function declaration
// async function fd() {}

// // call back function
// window.addEventListener('click', async function() { })

// // arrow function
// const arrowFn = async () => { }

// // methods
// const person = {
//     // method
//     sayHi: async function() { },
//     //method shorthand
//     async sayHello() { },
//     // function property
//     sayHey: async () => { }
// }



function makePizza(toppings = []) {
    return new Promise(function (resolve, reject) {
    // reject if people try with pineapple
    if (toppings.includes('pineapple')) {
        reject('Seriously? Get out 🍍');
    }
    const amountOfTimeToBake = 500 + (toppings.length * 200);
    // wait 1 second for the pizza to cook:
    setTimeout(function () {
        // when you are ready, you can resolve this promise
        resolve(`Here is your pizza 🍕 with the toppings ${toppings.join(' ')}`);
    }, amountOfTimeToBake);
    // if something went wrong, we can reject this promise;
    });
}

// potentially inefficient because it has to wait for first pizza to cook, 
// before starting on the second pizza
// async function makeDinner() {
//     const pizza1 = await makePizza(['pepperoni']);
//     const pizza2 = await makePizza(['mushrooms']);
//     console.log(pizza1);
//     console.log(pizza2);
// }

// // more efficient because pizzas can be made at the same time
// async function makeDinnerFaster() {
//     const pizzaPromise1 = makePizza(['pepperoni']);
//     const pizzaPromise2 = makePizza(['mushrooms']);
//     const [pep, mush] = await Promise.all([pizzaPromise1, pizzaPromise2]);
//     console.log(pep, mush);
// }

// makeDinner();
// makeDinnerFaster();


async function go() {
    try {
        const pizza = await makePizza(["pineapple"]);
        console.log(pizza);
    } catch(err) {
        console.warn('oh noooooo! Pizza pineapple fail!', err);
    }
}

go();


</script>

<style>
body {
  min-height: 100vh;
  display: grid;
  align-items: start;
  justify-items: center;
}
</style>
