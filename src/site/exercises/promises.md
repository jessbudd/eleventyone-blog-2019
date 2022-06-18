---
title: promises, bind call apply & prototypes
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
function makePizza(toppings = []) {
    return new Promise(function(resolve, reject) {
        // wait 1 second for the pizza to cook
        setTimeout(function() {
        // when you are ready, you ca resolve this promise
        resolve(`Here is your :pizza: with the ${toppings.join(' ')}`);
        }, 1000);
        // if something went wrong, you can reject this promise
    });
    return pizzaPromise; 
}
const pepperoniPromise = makePizza([`pepperoni`]);
const canadianPromise = makePizza(['pinapple','cheese','onion']);

console.log(pepperoniPromise, canadianPromise); // logs the promise with promise state

pepperoniPromise.then(function(pizza) {
    console.log(`Ahh got it`); // runs when promise is fulfilled
    console.log(pizza);    // runs when promise is fullfilled
})

const pizzaPromise1 = makePizza(['hot peppers', 'onion']);
const pizzaPromise2 = makePizza(['hot peppers', 'onion', 'fetta', 'spinach']);
const pizzaPromise3 = makePizza(['hot peppers', 'onion', 'fetta', 'spinach', 'more stuff', 'anchovies', 'more again', 'shrimp', 'even more']);

const dinnerPromise = Promise.all([pizzaPromise1, pizzaPromise2, pizzaPromise3]);

dinnerPromise.then(pizzas => {
    console.log(pizzas);   
})

// destructured 
dinnerPromise.then(function(pizzas) {
    const [hottie, hamAndCheese, garbagePail] = pizzas;
    console.log(hottie, hamAndCheese, garbagePail);
})

// destructured 2
dinnerPromise.then(function([hottie, hamAndCheese, garbagePail]) {
    console.log(hottie, hamAndCheese, garbagePail);
})

const firstPizzaPromise = Promise.race([pizzaPromise1, pizzaPromise2, pizzaPromise3]);

firstPizzaPromise.then(pizza => {
    console.log('You must be hungry, here is the first one ready');
    console.log(pizza);   
})


// prototypes
// const pepperoniPizza = new Pizza();
// const canadianPizza = new Pizza();
// console.log(pepperoniPizza);


// function Pizza(toppings = [], customer) {
//     console.log('Making a pizza');
//     // save the toppings that were passed in 
//     // to this instance of pizza
//     this.toppings = toppings;
//     this.customer = customer;
//     this.id = Math.floor(Math.random() * 16777215).toString(16);
// };
// console.log(canadianPizza);

// Pizza.protoype.decribe = function() {
//     return `This pizza is for ${this.customer} with the toppings ${this.toppings} with`;
// };


// bind, call and apply
const person = {
    name: 'Jess Budd',
    sayHi() {
        console.log('what is "this"? - ', this);
        console.log(`Hey ${this.name}`);
        return `Hey ${this.name}`;
    }
};

// person.sayHi(); // "this" equals person, it is bound to bound to the object it was called on (left of the dot)
// sayHi(); // "this" equals the window, it is not bound to where it is defined

const jenna = {name: 'Jenna'};

const sayHi = person.sayHi.bind();  
const sayHi2 = person.sayHi.bind(jenna);  
const sayHi3 = person.sayHi.bind(person);  

console.log(sayHi);





</script>

<style>
body {
  min-height: 100vh;
  display: grid;
  align-items: start;
  justify-items: center;
}
</style>
