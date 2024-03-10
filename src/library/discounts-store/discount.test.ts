import { describe, expect, test } from "vitest";
import { Discount } from "./discount";
import { MarketingCampaign } from "./marketing-campaign";
import { Money } from "./money";

describe("Given the Discount class", () => {
  describe("When it's Crazy Sales day", () => {
    test("Then it should apply a 15% of discount", () => {
      const expectedMoney: Money = new Money(85);
      const money: Money = new Money(100);
      const marketingCampaign: MarketingCampaign = {
        isActive: () => false,
        isCrazySalesDay: () => true,
      };

      const discount = new Discount(marketingCampaign);
      const resultedMoney = discount.discountFor(money);

      expect(resultedMoney).toEqual(expectedMoney);
    });
  });

  describe("When the net price is over 1000€", () => {
    test("Then it should apply a discount of 10%", () => {
      const expectedMoney: Money = new Money(990);
      const money: Money = new Money(1100);
      const marketingCampaign: MarketingCampaign = {
        isActive: () => false,
        isCrazySalesDay: () => false,
      };

      const discount = new Discount(marketingCampaign);
      const resultedMoney = discount.discountFor(money);

      expect(resultedMoney).toEqual(expectedMoney);
    });

    describe("And if it's Crazy Sales day", () => {
      test("Then it should apply a discount of 15%", () => {
        const expectedMoney: Money = new Money(935);
        const money: Money = new Money(1100);
        const marketingCampaign: MarketingCampaign = {
          isActive: () => false,
          isCrazySalesDay: () => true,
        };

        const discount = new Discount(marketingCampaign);
        const resultedMoney = discount.discountFor(money);

        expect(resultedMoney).toEqual(expectedMoney);
      });
    });
  });

  describe("When the price is over 100€ but under 1000€ and the campaign is active", () => {
    test("Then it should apply a 5% of discount", () => {
      const expectedMoney: Money = new Money(190);
      const money: Money = new Money(200);
      const marketingCampaign: MarketingCampaign = {
        isActive: () => true,
        isCrazySalesDay: () => false,
      };

      const discount = new Discount(marketingCampaign);
      const resultedMoney = discount.discountFor(money);

      expect(resultedMoney).toEqual(expectedMoney);
    });

    describe("And if it's Crazy Sales day", () => {
      test("Then it should apply a 15% of discount", () => {
        const expectedMoney: Money = new Money(170);
        const money: Money = new Money(200);
        const marketingCampaign: MarketingCampaign = {
          isActive: () => true,
          isCrazySalesDay: () => true,
        };

        const discount = new Discount(marketingCampaign);
        const resultedMoney = discount.discountFor(money);

        expect(resultedMoney).toEqual(expectedMoney);
      });
    });
  });

  describe("When the price is under 100€", () => {
    test("Then it should return the same price", () => {
      const expectedMoney: Money = new Money(100);
      const money: Money = new Money(100);
      const marketingCampaign: MarketingCampaign = {
        isActive: () => false,
        isCrazySalesDay: () => false,
      };

      const discount = new Discount(marketingCampaign);
      const resultedMoney = discount.discountFor(money);

      expect(resultedMoney).toEqual(expectedMoney);
    });
  });
});
