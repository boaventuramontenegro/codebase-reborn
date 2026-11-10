import { describe, expect, it } from "vitest";
import { siteSchema } from "@/lib/seo";

describe("Factual structured data", () => {
  it("does not claim ratings, awards, customer totals or prices", () => {
    const serialized = JSON.stringify(siteSchema);
    for (const key of ["aggregateRating", "review", "award", "numberOfEmployees", "price"]) {
      expect(serialized).not.toContain(`"${key}"`);
    }
  });
  it("includes only the existing three offered services", () => {
    const agency = siteSchema["@graph"].find(node => node["@type"] === "ProfessionalService");
    expect(agency?.hasOfferCatalog?.itemListElement.map(offer => offer.itemOffered.name)).toEqual([
      "Agenciamento de Modelos", "Aluguel de Estúdio de Fotografia", "Estúdio de Fotografia",
    ]);
  });
});