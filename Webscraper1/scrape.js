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
    const parentClass = "div.mdl-grid";
    const cellClass = "mdl-cell mdl-cell--6-col";
    const nestedCell = "div.launch a6936 mdl-card mdl-shadow--6dp"
    const abcCell = "div.mdl-card__supporting-text"

    // const list = $(parentClass);
    let list = []
    let rockets = []
    list = $(parentClass).children().map( (i, element) => {
        let rocket = { a: "", b: "", c: "", d: "", e: "", f: "", g: ""}
        if (element.type ==='tag') {
            let date = $(element).find(abcCell).text().trim().split("\n")[0].replace(",", "").split(" ")
            switch (date.length) {
                case(3): {
                    rocket.a = date[2];
                    rocket.b = date[1];
                    break;
                }
                case(4 || 6): {
                    rocket.a = date[3]
                    rocket.b = date[1]
                    rocket.c = date[2]
                    break;
                }
                default: {
                    break;
                }
            }
            let title = $(element).find("h5:first").text().trim().split(" | ");
            let origin = $(element).find("span:first").text().trim();
            let details = $(element).find("div.mdl-card__supporting-text:first").text().trim().split("\n");
            details.splice(0, 2);
            let location = details[0].trim()
            // console.log(details);
            rocket.d = title[1];
            rocket.e = origin;
            rocket.f = title[0];
            rocket.g = location;
            // console.log(rocket);
            rockets.push(rocket);
            return rocket

        }
    })
    // console.log(rockets)
    fs.writeFile("rocketData.json", JSON.stringify(rockets, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });
    console.log("list:", list);
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeData();