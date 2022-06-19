const {DateTime} = require('luxon');

// Determine the number of months between
// today and the passed in date object

module.exports = (date) => {
  let dateToISO = DateTime.fromJSDate(date);
  let difference = dateToISO.diffNow('months').toObject();

  if (difference.months < -24) {
    // show old content warning
    return `<p class="warning--lg">This post is over two years old, the content may be out of date.</p>`;
  } else {
    // bail out
    return ``;
  }
};
