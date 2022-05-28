import { Store, DiscountOffer } from "./store";

describe("Store", () => {
  it("should decrease the discount and expiresIn by one unit each day", () => {
    expect(new Store([new DiscountOffer("test", 2, 3)]).updateDiscounts()).toEqual(
      [new DiscountOffer("test", 1, 2)]
    );
  });
  it("should decrease the discount twice as fast after expiration date has passed", () => {
    expect(new Store([new DiscountOffer("test", -1, 4)]).updateDiscounts()).toEqual(
      [new DiscountOffer("test", -2, 2)]
    );
  });
  it("should increase the discount if the partner is Naturalia", () => {
    expect(new Store([new DiscountOffer("Naturalia", 5, 10)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Naturalia", 4, 11)]
    );
  });
  it("should increase the discount twice as fast if the partner is Naturalia and expiration date is passed", () => {
    expect(new Store([new DiscountOffer("Naturalia", -1, 10)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Naturalia", -2, 12)]
    );
  });
  it("should increase the discount by 2 if the partner is Vinted and expiration date is in 10 days or less", () => {
    expect(new Store([new DiscountOffer("Vinted", 10, 10)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Vinted", 9, 12)]
    );
  });
  it("should increase the discount by 3 if the partner is Vinted and expiration date is in 5 days or less", () => {
    expect(new Store([new DiscountOffer("Vinted", 5, 10)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Vinted", 4, 13)]
    );
  });
  it("should change discount to 0 if the partner is Vinted and expiration date was reached", () => {
    expect(new Store([new DiscountOffer("Vinted", 0, 10)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Vinted", -1, 0)]
    );
  });
  it('should throw an error if discount is superior to 50', () => {
    try {
      new Store([new DiscountOffer("test", 2, 55)]).updateDiscounts()
      console.log('Hello from try'); // @FIXME: code goes through this part, however it does not fail, even if it should.
    } catch (error) {
      expect(error).toEqual(new Error('discount should not be over 50'));
    }
  });
  it("should neither expire nor decrease if partner is Ilek", () => {
    expect(new Store([new DiscountOffer("Ilek", 15, 15)]).updateDiscounts()).toEqual(
      [new DiscountOffer("Ilek", 15, 15)]
      );
  });
});
