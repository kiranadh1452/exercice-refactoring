export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }

  updateQualityV2() {
    // Adding helper functions inside here as I am not allowed to add any new properties or methods to this class
    function updateNormalItem(item: Item) {
      item.sellIn -= 1;
      let degradation = item.sellIn >= 0 ? 1 : 2;
      item.quality -= degradation;
    }

    function updateAgedBrie(item: Item) {
      item.sellIn -= 1;
      let increment = item.sellIn >= 0 ? 1 : 2;
      item.quality += increment;
    }

    function updateBackstagePass(item: Item) {
      item.sellIn -= 1;
      if (item.sellIn < 0) {
        item.quality = 0;
      } else if (item.sellIn <= 5) {
        item.quality += 3;
      } else if (item.sellIn <= 10) {
        item.quality += 2;
      } else {
        item.quality += 1;
      }
    }

    function updateConjuredItem(item: Item) {
      item.sellIn -= 1;
      let degradation = item.sellIn >= 0 ? 2 : 4;
      item.quality -= degradation;
    }

    function updateSulfuras(item: Item) {
      // nothing to do as of now except for strictly assigning it quality 80
      item.quality = 80;
      return;
    }

    function getUpdateStrategy(itemName: string) {
      const strategies = {
        "Aged Brie": updateAgedBrie,
        "Backstage passes to a TAFKAL80ETC concert": updateBackstagePass,
        "Sulfuras, Hand of Ragnaros": updateSulfuras,
      };

      if (itemName?.includes("Conjured")) return updateConjuredItem;
      return strategies?.[itemName] || updateNormalItem;
    }

    for (const item of this.items) {
      const updateStrategy = getUpdateStrategy(item.name);
      updateStrategy(item);

      // Ensure quality bounds of 0 - 50 for products other that sulfuras
      if (item.name !== "Sulfuras, Hand of Ragnaros") {
        item.quality = Math.max(0, item.quality);
        item.quality = Math.min(50, item.quality);
      }
    }

    return this.items;
  }
}
