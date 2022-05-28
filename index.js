import { Store, DiscountOffer } from "./store.js";

import fs from "fs";

const discountOffers = [
  new DiscountOffer("Velib", 20, 30),
  new DiscountOffer("Naturalia", 10, 5),
  new DiscountOffer("Vinted", 5, 40),
  new DiscountOffer("Ilek", 15, 40),
  new DiscountOffer("BackMarket", 15, 50)
];
const store = new Store(discountOffers);

let log = "";

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log += `${JSON.stringify(store.updateDiscounts())}\n`;
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
