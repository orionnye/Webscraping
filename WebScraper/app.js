const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

const markup = `
<ul class="fruits">
  <li class="fruits__mango"> Mango </li>
  <li class="fruits__apple"> Apple </li>
</ul>
`;

const $ = cheerio.load(markup);
// console.log(pretty($.html()));

// const mango = $(".fruits__mango");
// console.log(mango.html()); // Mango

// const apple = $(".fruits__apple");
// console.log(apple.attr("class")); //fruits__apple

const listItems = $("li");
console.log(listItems.length); // 2
listItems.each(function (idx, el) {
  console.log($(el).text());
});