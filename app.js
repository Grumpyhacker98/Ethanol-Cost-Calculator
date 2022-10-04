import inquirer from 'inquirer';
import cheerio from 'cheerio';
import axios from 'axios';

// https://distillique.co.za/blogs/default-blog/is-it-worthwhile-to-distill-bio-ethanol-as-fuel
// https://npm.io/package/cheerio
// https://npm.io/package/inquirer
// https://npm.io/package/axios

console.log("app start");

// scrape current global food costs
axios.get("https://markets.businessinsider.com/commodities")
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

        // mash/wash that reaches higher ABV is more efficient
        // calculate all sugar wash, grain mash, corn mash and their cost/effectiveness, chose cheapest OR prompt to chose 


        // grab energy bill info + distillery size + labor costs + capital investment
        inquirer.prompt([{
            type: 'number',
            name: 'stillSize',
            message: 'How large is the size of your distillery? (Gallons)'
        }, {
            type: 'number',
            name: 'electricCost',
            message: 'What is the current rate of your electric bill? (KW/hr)'
            // if defaulted scrape for global average cost?
        }, {
            type: 'number',
            name: 'laborCost',
            message: 'What price do you value your free time? (USD/Hour)'
        }, {
            type: 'number',
            name: 'capitalInvestment',
            message: 'How much capital for all the equipment? (USD)'
        }]).then((answers) => {

            console.log(answers)

            // calculate energy required to boil
            // total yield/cost for a single run


            // find gals require to return capital investment using ...
            // 100% Ethanol
            // 85% E85
            // 15% E15
            // add cost of labor variable



        }).catch((error) => {
            console.log(error);
            console.log("Sorry, inqurirer ran into an error")
        });
    })
    .catch((error) => {
        console.log(error);
        console.log("Buisness Insider web scrape failed, sorry");
    })




