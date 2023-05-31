const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://nextspaceflight.com/launches/";

// Async function which scrapes the data
async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    const parentClass = ".mdl-grid";
    const cellClass = ".mdl-cell mdl-cell--6-col";

    // // Select all the list items in plainlist class
    // console.log("look at data:", data)
    // const listItems = $(parentClass).children();
    const list = $(parentClass)[1].children;
    console.log("list:", list.length);

    // // Stores data for all countries
    // const countries = [];
    // Use .each method to loop through the li we selected
    console.log("list:", list[1]);
    // list.forEach((child, i) => {
    //     console.log(child);
    // })
    // for (let i = 0; i < 1; i++) {
    // }
    // listItems.each((i, el) => {
    //     const titleDiv = ".mdl-card__title-text";
    //     let title = element.children;
    //     console.log("element:", element);
    //  // Object holding data for each country/jurisdiction
    //   const country = { name: "", iso3: "" };
    //   // Select the text content of a and span elements
    //   // Store the textcontent in the above object
    //   country.name = $(el).children("a").text();
    //   country.iso3 = $(el).children("span").text();
    //   // Populate countries array with country data
    //   countries.push(country);
    // });
    // Logs countries array to the console
    // console.dir(countries);
    // Write countries array in countries.json file
    fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeData();