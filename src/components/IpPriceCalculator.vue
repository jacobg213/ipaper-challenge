<template>
  <div>
    <div>
      <label for="flipBooks">FlipBooks needed:</label>
      <strong>{{ flipBooks }}</strong>
    </div>
    <input
      type="range"
      min="1"
      max="25"
      id="flipBooks"
      :value="flipBooks"
      @change="calculate($event, 'flipBooks')"
    />

    <div>
      <label for="visitors">Expected visitors per month:</label>
      <strong>{{ visitors }}</strong>
    </div>
    <input
      type="range"
      min="250"
      max="100000"
      id="visitors"
      :value="visitors"
      step="250"
      @change="calculate($event, 'visitors')"
    />

    <div>Your price: &euro;{{ price }}/month.</div>
  </div>
</template>

<script lang="ts">
export interface FlipBookTier {
  minimumFlipBooks: number;
  maximumFlipBooks: number;
  includedVisitors: number;
  pricePerFlipBook: number;
}

export interface ExtraVisitorsTier {
  minimumVisitors: number;
  maximumVisitors: number;
  pricePerThousand: number;
}

type ChangedRange = "flipBooks" | "visitors";

import { Component, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  private flipBooks = 1;
  private visitors = 250;
  private price = 5;
  private visitorsIncluded = 0;

  private flipBookTiers: FlipBookTier[] = [
    {
      minimumFlipBooks: 1,
      maximumFlipBooks: 5,
      includedVisitors: 2000,
      pricePerFlipBook: 5
    },
    {
      minimumFlipBooks: 6,
      maximumFlipBooks: 10,
      includedVisitors: 1000,
      pricePerFlipBook: 2
    },
    {
      minimumFlipBooks: 11,
      maximumFlipBooks: 25,
      includedVisitors: 250,
      pricePerFlipBook: 1
    }
  ];

  private extraVisitorsTiers: ExtraVisitorsTier[] = [
    {
      minimumVisitors: 1,
      maximumVisitors: 10000,
      pricePerThousand: 1.5
    },
    {
      minimumVisitors: 10001,
      maximumVisitors: 50000,
      pricePerThousand: 1
    },
    {
      minimumVisitors: 50001,
      maximumVisitors: 100000,
      pricePerThousand: 0.75
    }
  ];

  calculate(event: Event, changedRange?: ChangedRange): void {
    const value = (event.target as HTMLInputElement).value;
    switch (changedRange) {
      case "flipBooks": {
        this.flipBooks = parseInt(value);
        break;
      }
      case "visitors": {
        this.visitors = parseInt(value);
        break;
      }
    }

    // Reset values for recalculation.
    this.price = 0;
    this.visitorsIncluded = 0;

    this.calculateFlipBooks();
    this.calculateVisitors();
  }

  calculateFlipBooks(): void {
    for (
      let flipBooksToCalculate = this.flipBooks;
      flipBooksToCalculate > 0;
      flipBooksToCalculate--
    ) {
      const currentFlipBookTier = this.flipBookTiers.find(
        tier =>
          tier.minimumFlipBooks <= flipBooksToCalculate &&
          tier.maximumFlipBooks >= flipBooksToCalculate
      );

      if (!currentFlipBookTier) {
        throw new Error("FlipBook tier not found! Cannot calculate the price.");
      }

      this.price += currentFlipBookTier.pricePerFlipBook;
      this.visitorsIncluded += currentFlipBookTier.includedVisitors;
    }
  }

  calculateVisitors(): void {
    const extraVisitorsNeeded = this.visitors - this.visitorsIncluded;
    if (extraVisitorsNeeded > 0) {
      for (
        let extraVisitors = extraVisitorsNeeded;
        extraVisitors > 0;
        extraVisitors -= 1000
      ) {
        const currentVisitorsTier = this.extraVisitorsTiers.find(
          tier =>
            tier.minimumVisitors <= extraVisitors &&
            tier.maximumVisitors >= extraVisitors
        );

        if (!currentVisitorsTier) {
          throw new Error(
            "Visitors tier not found! Cannot calculate the price."
          );
        }

        this.price += currentVisitorsTier.pricePerThousand;
      }
    }
  }
}
</script>

<style>
label {
  margin-right: 0.25rem;
}

input[type="range"] {
  width: 300px;
}
</style>
