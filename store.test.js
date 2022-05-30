import { Store, DiscountOffer } from "./store";

describe("Store", () => {

  // EXPIRES IN / NEVER EXPIRES
  it("should decrease expiresIn by 1 if neverExpires is false", () => {
    expect(new Store([new DiscountOffer("La Poste", 5, 0, -1, {"4": -1, "5": -1}, true, false)]).updateDiscounts()[0].expiresIn).toEqual(4);
  });
  it("should not decrease expiresIn if neverExpires is true", () => {
    expect(new Store([new DiscountOffer("Swile", 5, 0, -1, {"4": -1, "5": -1}, true, true)]).updateDiscounts()[0].expiresIn).toEqual(5);
  });

  // DISCOUNT IN PERCENT / DISCOUNT CHANGE PER DAY
  it("should not update discountInPercent if it is already 0", () => {
    expect(new Store([new DiscountOffer("Emerton", 5, 0, -1, {"4": -1, "5": -1}, true, false)]).updateDiscounts()[0].discountInPercent).toEqual(0)
  });
  it("should update discountInPercent if it is superior to 0", () => {
    expect(new Store([new DiscountOffer("Quitoque", 5, 37, -1, {"4": -1, "5": -1}, true, false)]).updateDiscounts()[0].discountInPercent).toEqual(36)
  });
  it("should decrease the discount according to discountChangePerDay value", () => {
    expect(new Store([new DiscountOffer("BackMarket", 2, 30, -10, {}, true, false)]).updateDiscounts()[0].discountInPercent).toEqual(20);
    expect(new Store([new DiscountOffer("BackMarket", 2, 30, 7, {}, true, false)]).updateDiscounts()[0].discountInPercent).toEqual(37);
  });
  it("should increase the discount if discountChangePerDay is a positive integer", () => {
    expect(new Store([new DiscountOffer("Naturalia", 5, 10, 1, {}, true, false)]).updateDiscounts()[0].discountInPercent).toEqual(11);
  });
  it("should decrease the discount if discountChangePerDay is a negative integer", () => {
    expect(new Store([new DiscountOffer("Swan", 5, 10, -1, {}, true, false)]).updateDiscounts()[0].discountInPercent).toEqual(9);
  });

  // AFTER EXPIRATION
  it("should discount twice as fast after expiration date has passed if stopsAfterExpiration is false", () => {
    expect(new Store([new DiscountOffer("LeHibou", -1, 4, -1, {}, false, false)]).updateDiscounts()[0].discountInPercent).toEqual(2);
  });
  it("should not decrease the discount after expiration date has passed if stopsAfterExpiration is true", () => {
    expect(new Store([new DiscountOffer("BGene", -1, 4, -1, {}, true, false)]).updateDiscounts()[0].discountInPercent).toEqual(0);
  });
    
  // CHANGING DISCOUNT
  it.skip("should properly apply specific discounts if they are set (ex: x days before expiration, discount changes to y)", () => {
    expect(new Store([new DiscountOffer("Vinted", 15, 10, 1, {"10": 2, "5": 3}, true, false)]).updateDiscounts()[0].discountInPercent).toEqual(11);
    expect(new Store([new DiscountOffer("Vinted", 8, 10, 1, {"10": 2, "5": 3}, true, false)]).updateDiscounts()[0].discountInPercent).toEqual(12);
    expect(new Store([new DiscountOffer("Vinted", 3, 10, 1, {"10": 2, "5": 3}, true, false)]).updateDiscounts()[0].discountInPercent).toEqual(13);
  });

  // INVALID DISCOUNT
  it('should throw an error if discount is superior to 50', () => {
    const checkMaximumDiscount = () => {
      new Store([new DiscountOffer("Sia Partners", 2, 55, -1, {}, false, false)]).updateDiscounts();
    }
    expect(checkMaximumDiscount).toThrowError(new Error('discount should not be over 50'));
  });
});
