import { describe, it, expect } from "vitest";
import mockData from "./mock-data/sampleData.json";
import { Item, GildedRose } from "../../app/index";

/**
 * description: This compares the response data from updateQuality and updateQualityV2
 *
 * @Note This does not concern to the correctness of the updateQualityV2 but its resemblance to updateQuality
 */
describe("Comparing two versions of updateQuality", () => {
  Object.keys(mockData).forEach((productType: string) => {
    // Exclude Conjured Item as the v1 does not support conjured items
    if (productType?.includes("Conjured")) return;

    mockData[productType].forEach(({ description, input, expected }) => {
      it(`${productType}-${description}`, () => {
        const gildedRose = new GildedRose([
          new Item(productType, input.sellIn, input.quality),
        ]);
        const gildedRose2 = new GildedRose([
          new Item(productType, input.sellIn, input.quality),
        ]);
        const itemsFromV1 = gildedRose.updateQuality();
        const itemsFromV2 = gildedRose2.updateQualityV2();

        expect(itemsFromV1).toStrictEqual(itemsFromV2);
      });
    });
  });
});

/**
 * description: This test case handles the correctness of the updateQualityV2 function
 */
describe("Update Quality Handler Test for multiple product", () => {
  Object.keys(mockData).forEach((productType: string) => {
    mockData[productType].forEach(({ description, input, expected }) => {
      it(`${productType}-${description}`, () => {
        const gildedRose = new GildedRose([
          new Item(productType, input.sellIn, input.quality),
        ]);
        const itemsFromV2 = gildedRose.updateQualityV2();

        expect(itemsFromV2[0].name).toBe(productType);
        expect(itemsFromV2[0].sellIn).toBe(expected.sellIn);
        expect(itemsFromV2[0].quality).toBe(expected.quality);
      });
    });
  });
});
