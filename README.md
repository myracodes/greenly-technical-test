# Hi reviewer!

Thank you very much for reviewing my work. :)

A few notes on what I did:
- I spent the weekend on this assignment (not the whole weekend, but the weekend :)). It was the right amount of "challenging" for me (not easy at all, but definitely not impossible!)
- I was given two different instructions regarding whether or not I should fork it, so I went for what was on the readme instructions (which was to **not** fork it :) ).
- In order to make the review easier, I used commit extended descriptions (with a commit title and body); I hope that will make my process and intentions very clear! If not, I will be happy to discuss anything unclear with you.
- I knew I was not supposed to change API-related things, I might have broken that rule by renaming discountRateInPercent. In a real-life project, I would have checked how/where this was implemented and updated it everywhere / or not updated it. For the sake of the exercise and consistency, and since I don't have access to the rest of the product, I changed it. I hope this is okay!

Possible enhancements:
- Type project using Typescript
- Generate a JSON file, just like the output.txt, if that can be useful

# Greenly Take-Home Test Specification

You are a new developer in the Greenly team, and your first job is to add a feature to an old existing piece of code.

## System specifications

Hi and welcome to the team. We are in the future, and Greenly has extended its activities by opening an ecommerce store that gathers several Greenly partners offering their products with discount offers. Your task is to add a new feature to our system: we want to add a new partner to our ecommerce store which has a different type of discount offer . First an introduction to our system:

- All discount offers have an `expiresIn` value which denotes the number of days we have until the offer expires.
- All discount offers have a `discountInPercent` value which gives the percent of discount on the partner products.
- At the end of each day, our system lowers the discountInPercent by 1 unit (percent).

But there is more:

- Once the expiration date has passed, the discount is lowered twice as fast.
- The discount for Naturalia actually increases the older it gets. The discount increases twice as fast after the expiration date.
- The discount for a partner is never more than 50.
- Ilek discount never expires nor decreases.
- Vinted discount, like Naturalia, increases as its expiration date approaches. Discount increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but discount drops to 0 after the expiration date.

We have recently signed a new partner BackMarket. This requires an update to our system:

- BackMarket discounts decreases twice as fast as normal partners.

## Instructions

- [x] Clone this repository (do **not** fork it)
- [x] Implement the required feature
- [x] Publish it on GitHub
- [x] Send us the link and tell us approximatively how much time you spent on this assignment

You are encouraged to refactor the existing code before adding your own, as you would do if this was a real task in real life. We strongly recommend that you write tests to help you during this process.

Feel free to make any changes to the `updateDiscounts` method implementation and add any new code as long as everything still works correctly. However, do not break the public API of the `DiscountOffer` and `Store` classes, as those are used by other pieces of the software (you can add new methods though).

Please commit as frequently as possible to make the review easier.

## Test

To make sure that you will not break anything in the existing code, we added a log of the simulation in the _output.txt_ file. Make sure that your code is able to generate the same file. You can generate a new file by running one of the following commands:

```sh
yarn && yarn start
```

```sh
docker-compose up
```
