// import inquirer from 'inquirer';
const cheerio = require('cheerio');
const axios = require('axios');

// https://distillique.co.za/blogs/default-blog/is-it-worthwhile-to-distill-bio-ethanol-as-fuel
// https://npm.io/package/cheerio
// https://npm.io/package/inquirer
// https://npm.io/package/axios

console.log("app start");

// scrape current global food costs
axios.get("https://markets.businessinsider.com/commoditie")
    .then((response) => {
        console.log("business insider scrape successful");

        var $ = cheerio.load(response.data);

        var agricultureData = $(".table__th:contains('Agriculture')").parents().parents().parents();

        var scrappedData = [];
        var name;
        var price;
        var units;
        agricultureData.children("tbody").children("tr").each((i, parentData) => {
            $(parentData).children("td").each((i2, childData) => {
                if (i2 == 0) name = $(childData).text();
                if (i2 == 1) price = $(childData).text();
                if (i2 == 4) units = $(childData).text();
            })

            scrappedData.push({
                name: name,
                price: price,
                units: units
            })
        })

        console.log(scrappedData)
    })
    .catch((error) => {
        // handle error
        console.log(error);
        console.log("Buisness Insider scrape failed, sorry. error code above");
    })
    // inquirer.prompt([{

    // }])


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
