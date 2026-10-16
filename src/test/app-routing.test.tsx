import { describe, expect, it } from "vitest";
import { getArticles, getCategories, getIssues } from "@/lib/queries";

describe("Publication routes and data", () => {
  it("has valid articles for routes", () => {
    const articles = getArticles();
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0]?.slug).toBeTruthy();
  });

  it("has valid categories for routes", () => {
    const categories = getCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0]?.slug).toBeTruthy();
  });

  it("has valid magazine issues for routes", () => {
    const issues = getIssues();
    expect(issues.length).toBeGreaterThan(0);
    expect(issues[0]?.slug).toBeTruthy();
  });
});
