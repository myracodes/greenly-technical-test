
/**
 * @param partnerName string // indicates the brand / partner
 * @param expiresIn number // amount of days left before discount expires
 * @param discountInPercent number // current total amount of discount
 * @param discountChangePerDay number // amount of discount per day; has a positive value if discount increases, and a negative value if discount decreases.
 * @param changingDiscount object {number: number} // empty by default; if the discountChangePerDay value changes depending on the expiresIn value, we set the date (expiresIn) as the key, and the discount to apply (discountChangePerDay) as the value
 * @param stopsAfterExpiration boolean // set to true if discountInPercent drops to 0 when expiresIn has reached 0
 * @param neverExpires boolean // set to true if the discount never expires
 */
export class DiscountOffer {
  constructor(
    partnerName = "",
    expiresIn,
    discountInPercent,
    discountChangePerDay = -1,
    changingDiscount = {},
    stopsAfterExpiration = false,
    neverExpires = false,
  ) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountInPercent;
    this.discountChangePerDay = discountChangePerDay;
    this.changingDiscount = changingDiscount;
    this.stopsAfterExpiration = stopsAfterExpiration;
    this.neverExpires = neverExpires;
    if (Object.keys(changingDiscount).length === 0) { // if changingDiscount is an empty object, replace it with the value of expiresIn as the key, and the value of discountChangePerDay as the value
      this.changingDiscount = { [expiresIn]: discountChangePerDay };
    } else {
      this.changingDiscount = changingDiscount;
      if (!(expiresIn in this.changingDiscount)) { // check if the expiresIn key exists in changingDiscount. If it does not, this if statement creates it.
        this.changingDiscount[expiresIn] = discountChangePerDay;
      }
    }
  }
}

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }
  
  /**
   * Updates discounts each day depending on various parameters: amount of discount, expiration date, specific discounts x days before expiration, etc.
  */
  updateDiscounts() {
    
    for (const offer of this.discountOffers) {
      if (offer.discountInPercent > 50) { // Throw an error if a discount is > 50 percent
          console.log(`${offer.partnerName}'s discount is superior to 50`);
          throw new Error("discount should not be over 50");
        }

      /**
       * Determines the amount of discount that needs to be applied at a given time
      */
      const getDiscount = () => {
        const sorted = Object.keys(offer.changingDiscount).sort(function(a, b) { return a - b }) // sort discounts by the amount of days left before expiration date, from the smaller to the bigger
        let currentDiscount;
        
        for (const sortedValue of sorted) {
          if (offer.expiresIn <= sortedValue) {
            currentDiscount = offer.changingDiscount[sortedValue];
            return currentDiscount;
          }
        }
      }

      // DETERMINE & APPLY THE CORRECT DISCOUNT
      let discountToApply = getDiscount();
      if (offer.expiresIn <= 0) {
        discountToApply = discountToApply*2;
      }

      offer.discountInPercent = offer.discountInPercent + discountToApply;
      if (offer.discountInPercent > 50) {
        offer.discountInPercent = 50;
      } else if (offer.discountInPercent <= 0 && discountToApply <= 0) {
        offer.discountInPercent = 0;
      }
      if (offer.stopsAfterExpiration && offer.expiresIn <= 0) {
        offer.discountInPercent = 0;
      }
      
      // UPDATE AMOUNT OF DAYS LEFT BEFORE OFFER EXPIRES
      if (offer.neverExpires == false) {
        offer.expiresIn = offer.expiresIn - 1;
      }

    }
    return this.discountOffers;
  }
}
