export class DiscountOffer {
  constructor(partnerName, expiresIn, discountRateInPercent) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }
}

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }
  updateDiscounts() {
    for (const discountOffer of this.discountOffers) {
      if (discountOffer.discountInPercent > 50) {
        throw new Error("discount should not be over 50");
      }
      if (
        discountOffer.partnerName != "Naturalia" &&
        discountOffer.partnerName != "Vinted"
      ) {
        if (discountOffer.discountInPercent > 0) {
          if (
            discountOffer.partnerName != "Ilek" &&
            discountOffer.partnerName != "BackMarket"
          ) {
            discountOffer.discountInPercent = discountOffer.discountInPercent - 1;
          }
          if (discountOffer.partnerName === "BackMarket") {
            discountOffer.discountInPercent = discountOffer.discountInPercent - 2;
          }
        }
      } else {
        if (discountOffer.discountInPercent < 50) {
          discountOffer.discountInPercent = discountOffer.discountInPercent + 1;
          if (discountOffer.partnerName == "Vinted") {
            if (discountOffer.expiresIn < 11) {
              if (discountOffer.discountInPercent < 50) {
                discountOffer.discountInPercent = discountOffer.discountInPercent + 1;
              }
            }
            if (discountOffer.expiresIn < 6) {
              if (discountOffer.discountInPercent < 50) {
                discountOffer.discountInPercent = discountOffer.discountInPercent + 1;
              }
            }
          }
        }
      }
      if (discountOffer.partnerName != "Ilek") {
        discountOffer.expiresIn = discountOffer.expiresIn - 1;
      }
      if (discountOffer.expiresIn < 0) {
        if (discountOffer.partnerName != "Naturalia") {
          if (discountOffer.partnerName != "Vinted") {
            if (discountOffer.discountInPercent > 0) {
              if (discountOffer.partnerName != "Ilek") {
                discountOffer.discountInPercent = discountOffer.discountInPercent - 1;
              }
            }
          } else {
            discountOffer.discountInPercent =
              discountOffer.discountInPercent - discountOffer.discountInPercent;
          }
        } else {
          if (discountOffer.discountInPercent < 50) {
            discountOffer.discountInPercent = discountOffer.discountInPercent + 1;
          }
        }
      }
    }

    return this.discountOffers;
  }
}
