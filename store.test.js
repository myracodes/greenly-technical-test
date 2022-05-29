import { Store, DiscountOffer } from "./store";

describe("Store", () => {
  it("should not update discount if discountInPercent is 0", () => {
    expect(new Store([new DiscountOffer("test", 5, 0, 1)]).updateDiscounts()).toEqual(
      [new DiscountOffer("test", 4, 0, 1)]
    );
  });
  it("should decrease the discount and expiresIn by one unit each day", () => {
    expect(new Store([new DiscountOffer("test", 2, 3, -1)]).updateDiscounts()).toEqual(
      [new DiscountOffer("test", 1, 2, -1)]
    );
  });
  it("should decrease the discount by 2 if the partner is BackMarket", () => {
    expect(new Store([new DiscountOffer("BackMarket", 2, 10, -2)]).updateDiscounts()).toEqual(
      [new DiscountOffer("BackMarket", 1, 8, -2)]
    );
  });
  it("should decrease the discount twice as fast after expiration date has passed", () => {
    expect(new Store([new DiscountOffer("test", -1, 4, -1)]).updateDiscounts()).toEqual(
      [new DiscountOffer("test", -2, 2, -1)]
    );
  });
  it("should increase the discount if the partner is Naturalia", () => {
    expect(new Store([new DiscountOffer("Naturalia", 5, 10, 1)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Naturalia", 4, 11, 1)]
    );
  });
  it("should increase the discount twice as fast if the partner is Naturalia and expiration date is passed", () => {
    expect(new Store([new DiscountOffer("Naturalia", -1, 10, 1)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Naturalia", -2, 12, 1)]
    );
  });
  it("should increase the discount by 2 if the partner is Vinted and expiration date is in 10 days or less", () => {
    expect(new Store([new DiscountOffer("Vinted", 10, 10, 1)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Vinted", 9, 12, 1)]
    );
  });
  it("should increase the discount by 3 if the partner is Vinted and expiration date is in 5 days or less", () => {
    expect(new Store([new DiscountOffer("Vinted", 5, 10, 1)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Vinted", 4, 13, 1)]
    );
  });
  it("should change discount to 0 if the partner is Vinted and expiration date was reached", () => {
    expect(new Store([new DiscountOffer("Vinted", 0, 10, 1)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Vinted", -1, 0, 1)]
    );
  });
  it('should throw an error if discount is superior to 50', () => {
    const checkMaximumDiscount = () => {
      new Store([new DiscountOffer("test", 2, 55, -1)]).updateDiscounts();
    }
    expect(checkMaximumDiscount).toThrowError(new Error('discount should not be over 50'));
  });
  it("should neither expire nor decrease if partner is Ilek", () => {
    expect(new Store([new DiscountOffer("Ilek", 15, 15, 0)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Ilek", 15, 15, 0)]
      );
  });
});
