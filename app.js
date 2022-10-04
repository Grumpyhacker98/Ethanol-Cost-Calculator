// import inquirer from 'inquirer';
const cheerio = require('cheerio');
const axios = require('axios');

// https://distillique.co.za/blogs/default-blog/is-it-worthwhile-to-distill-bio-ethanol-as-fuel
// https://npm.io/package/cheerio
// https://npm.io/package/inquirer
// https://npm.io/package/axios

function startApp() {
    console.log("app start");
    axios.get("https://markets.businessinsider.com/commodities")
        .then((response) => {
            console.log("business insider scrape successful");

            var $ = cheerio.load(response.data);

            var test = $('.header_underline').text();

            console.log(test);
            console.log($.html());
        })
        .catch((error) => {
            // handle error
            console.log(error);
        })
    // inquirer.prompt([{

    // }])
};

// scrape current global food costs
// calculate all sugar wash, grain mash, corn mash and their cost/effectiveness, chose cheapest

// grab energy bill/kwh from user
// might need still size + other
// calculate energy required to boil
// total yield/cost for a single run

// find gals require to return capital investment using ...
// 100% Ethanol
// 85% E85
// 15% E15
// add cost of labor variable

startApp();