---
title: Automate checking a ticket system's availability with Node.js
date: 2022-07-27
meta: How I used Node.js and Pipedream to automatically scrape a ticket booking site and notify me if availability had changed.
img: https://jessbudd.com/images/featured/web-scraper.png
excerpt: How I used Node.js and Pipedream to automatically scrape a ticket booking site and notify me if the availability on the weekend had changed.
tags: [post, dev]
---

This post is about how I recently built a workflow to notify me when tickets became available on a particular site.

I was recently on holiday and wanted to book seats on a tour bus for the coming weekend. Unfortunately, being peak season, the tickets were sold out on their booking page. I asked the service company if there was a wait list we could join but there wasn’t. They advised I should keep checking back to the website as it will automatically update the availability when someone cancels or moves their booking.

The thought of spending time manually checking and refreshing the booking page repetitively did not appeal. But it did seem like the perfect task for a computer.

## The idea

I’d not built a web scraper before, but it seemed like something a front end dev could figure out without too much trouble.

The bus bookings are made with popular online booking system Trybooking. From googling, I knew they had an API that needed authentication with a API key, so my first thought was that perhaps the key was sent in a query string or a cookie I could find in inspector dev tools.

When I was scanned the network tab I found a fetch request with a name matching the number in the Trybooking url. The request url included the terms "calendar session times" which sounded like a winner!

<img src="/images/posts/2022/5.png" alt="Screenshot of Chrome dev tools windows showing a network request with the same number as the included in the address bar url"/>

Lucky for me, the url was unauthenticated.

## The data

Opening the url returned a simple array of objects, each with an event date and an `isAvailable` boolean property.

<pre class ="wrap sml">
<code class="lang-js">

[
    {"eventDate":"2022-07-16T00:00:00","isAvailable":false}, 
    {"eventDate":"2022-07-17T00:00:00","isAvailable":false},
    {"eventDate":"2022-07-23T00:00:00","isAvailable":false}, 
    {"eventDate":"2022-07-24T00:00:00","isAvailable":true}, 
    {"eventDate":"2022-07-30T00:00:00","isAvailable":true}, 
    {"eventDate":"2022-07-31T00:00:00","isAvailable":true}
]
</code>
</pre>

I could see the dates I wanted were the first two objects; 16 July and 17 July. I would just need to check if either of those date's `isAvailable` key value was true. This should be pretty easy!

I started writing some pseudo code to plan out what I needed to do.

<pre class="wrap sml">
// every X minutes (chron job?)
// get the page contents
// check for event date and value
// if available is true
// notify me by email or sms
</pre>

## The execution

I didn't have any spare servers to run a script, so looked for some kind of service that could host and run it for free. I came across [Pipedream](https://pipedream.com/) which fit the bill perfectly.

It allows 333 "invocations" per day on their free plan. I only needed this web scraper for 3-4 days, so this would determine how often I could run my script.

333 invocations divided by 24 hours a day, divide 60 minutes per hour by that, gives you roughly an invocation every 5 minutes.

I signed up for Pipedream's free tier and started a new workflow.

### Set up intervals

It first asks what type of trigger you need. I selected "Schedule" to set up a regular chron job.

<img src="/images/posts/2022/7.png" alt="Screenshot of Pipedream interface prompting user to select a trigger"/>

I then chose a "Custom interval" of every 5 minutes. I needed to generate and select a sample event to move on to the next step.

<img src="/images/posts/2022/11.png" alt="Screenshot of Pipedream interface confirming an interval chosen of 5 mintues"/>

### Write the node script

Next I added a node step to the workflow.

<img src="/images/posts/2022/13.png" alt="Screenshot of Pipedream interface prompting user to select the next step with many options to choose from"/>

I wrote a basic script that:

- uses the [Axios library](https://axios-http.com/) to request the web page
- adds the response data to a JavaScript object variable
- checks if there was availability on Saturday or Sunday
- prints a message to the console based on the availability (or not)

Pipedream has a "test workflow" function to check what I had so far. Running it worked.

<img src="/images/posts/2022/15.png" alt="Screenshot of Pipedream workflow confirming a successful test run"/>

### Set up notification alerts

I knew the ability to email yourself results was built into Pipedream, but since I was on holidays I wasn’t planning to be checking my emails often.

[Twillio](https://www.twilio.com/messaging/sms) has API’s for sending messages so I signed up for a free trial. Unfortunately, the rules on sending sms in Australia are pretty strict and it takes around 3 business days to be verified and approved to do so. More time than I really had to get this up and running, so I stuck with the built in email method. It would be cool to add sms notifications down the track.

There are [two ways to email yourself](https://pipedream.com/docs/destinations/email/#using-send-email-in-workflows) in Pipedream. One as a separate step in the workflow and one inside the node code and step. I wanted to keep as much as possible within the code as possible, so went with the second option.

<pre class="wrap sml">
<code class="lang-js">

if ( data[0].isAvailable || data[1].isAvailable) {
    $.send.email({
    subject: `Availability!`,
    text: `They have availability! Yay!`
    })

} else {
    $.send.email({
    subject: `No availability :(`,
    text: `They have no availability yet - booooo`
    })
}
</code>
</pre>

I deployed my workflow and triggered a test run. Within 30 seconds I had an email to the email address I signed up to Pipedream with. It showed the correct flow that there was no availability.

Now, while I want the workflow to _run_ every 5 minutes - I don't want _an email_ every 5 minutes.

This is where Pipedreams Data Stores comes in.

### Persistng state

[Data Stores](https://pipedream.com/docs/code/nodejs/using-data-stores) allow you to pass information from one instance of a workflow to the next instance of the workflow. So I can set a workflow state of whether there is availability, and set an `if/else` statement to only send an email if the availability actually changes.

First I add a props state to create and access a data store for this workflow.

<pre class="wrap sml">
<code class="lang-js">
props: {
    data: { type: "data_store" }
  },
</code>
</pre>

Next I retrieve the last state from the data store (though there isn't one yet, we'll be setting that soon). I also set a variable for when the availability is on _this_ instance of the workflow.

<pre class="wrap sml">
<code class="lang-js">
const previousAvailability = await this.data.get('previousAvailability');
const currentAvailability = isSaturdayAvailable || isSundayAvailable
</code>
</pre>

Then compare the availability status in the data store with the availability status from this instance.

If they're the same, we can bail out and do nothing. I don't need an email notification to tell me nothing has changed.

If they're different and availability _has changed_, then send me an email to tell me what the current state is.

<pre class="wrap sml">
<code class="lang-js">
if (currentAvailability !== previousAvailability) {
    if (isSaturdayAvailable || isSundayAvailable) {
        $.send.email({
        subject: `Availability!`,
        text: `They have availability on ${isSaturdayAvailable ? 'Saturday' : 'Sunday'} - yay!`
        })
    } else {
        $.send.email({
        subject: `No Availability :(`,
        text: `They have no availability.`
        })
    }
}
</code>
</pre>

The last step was to set or update the data store availability prop to the value returned from this instance of the workflow.

<pre class="wrap sml">
<code class="lang-js">
    await this.data.set('previousAvailability', currentAvailability);
</code>
</pre>

### Deploy

With this last step done and dusted, I deployed the app live.

This is what the final node script looked like:

<pre class="wrap sml">
<code class="lang-js">
import axios from "axios";

export default defineComponent({
    // Define that the "db" variable in our component is a data store
    props: {
        data: { type: "data_store" }
    },

    async run({ steps, $ }) {

        async function fetchHTML(url) {
        const { data } = await axios.get(url)
        return data;
        }

        // fetch the booking site availability as array
        const data = await fetchHTML("https://www.trybooking.com/events/calendar-session-times/911314");

        const isSaturdayAvailable = data[0].isAvailable;
        const isSundayAvailable = data[1].isAvailable;

        // retrieve the last availability status from the data store
        const previousAvailability = await this.data.get('previousAvailability');

        // store the availability status from this instance of the workflow
        const currentAvailability = isSaturdayAvailable || isSundayAvailable


        // compare the previous availability with the current availability
        // send email only if the availability has CHANGED
        if (currentAvailability !== previousAvailability) {
            if (isSaturdayAvailable || isSundayAvailable) {
                $.send.email({
                    subject: `Availability!`,
                    text: `They have availability on 
                    ${isSaturdayAvailable ? 'Saturday' : 'Sunday'}`
                })
            } else {
                $.send.email({
                    subject: `No Availability :(`,
                    text: `They have no availability.`
                })
            }
        }

        // Update the data store to the current availability status
        await this.data.set('previousAvailability', currentAvailability);
    }
});
</code>
</pre>

And that's it!

I was able to get notified by email when tickets became available for our chosen dates (or if they very quickly sold out again before I had time to get to buy them).

Overall, I was pleasantly surprised how fast and easy it was to set up, and can definitely see myself creating similar workflows in the future.
