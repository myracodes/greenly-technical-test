import { Store, DiscountOffer } from "./store.js";

import fs from "fs";

/**
* PARAMS:
partnerName,
expiresIn,
discountInPercent,
discountChangePerDay,
changingDiscount,
stopsAfterExpiration,
neverExpires
*/
const discountOffers = [
  new DiscountOffer("Velib", 20, 30, -1, {}, false, false),
  new DiscountOffer("Naturalia", 10, 5, 1, {}, false, false),
  new DiscountOffer("Vinted", 5, 40, 1, {10: 2, 5: 3}, true, false),
  new DiscountOffer("Ilek", 15, 15, 0, {}, false, true),
  new DiscountOffer("BackMarket", 15, 50, -2, {}, false, false),
];
const store = new Store(discountOffers);

let log = "";

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log += `Day ${elapsedDays + 1}:\n${JSON.stringify(store.updateDiscounts())} \n\n`;
}

fs.writeFile("output.txt", log, {
  encoding: "utf-8"
}, (err) => {
  if (err) {
    console.log("error");
  } else {
    console.log("Output file was successfully written, with the following content:");
    console.log(fs.readFileSync("output.txt", "utf8"));
  }
});
