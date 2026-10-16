import { describe, expect, it } from "vitest";
import { getArticles, isLive, shouldShowRegionSwitcher } from "@/lib/queries";
import { newsletterSchema, enquirySchema } from "@/lib/schemas";
describe("Publication rules from the TRD", () => {
  const article = getArticles()[0];
  if (!article) throw new Error("Expected sample article");
  it("excludes drafts", () => {
    expect(isLive({ ...article, status: "draft" })).toBe(false);
  });
  it("excludes future publication dates", () => {
    expect(
      isLive(
        { ...article, publishedAt: "2026-10-13T08:00:00+05:30" },
        "in",
        new Date("2026-10-12T06:47:00Z"),
      ),
    ).toBe(false);
  });
  it("shows only the default India region", () => {
    expect(isLive({ ...article, region: "global" })).toBe(false);
  });
  it("hides the switcher with one active region", () => {
    expect(shouldShowRegionSwitcher()).toBe(false);
  });
  it("shows the switcher only with at least two active regions", () => {
    expect(
      shouldShowRegionSwitcher([
        { code: "in", active: true, locale: "en-IN", timezone: "Asia/Kolkata" },
        { code: "global", active: true, locale: "en-US", timezone: "UTC" },
      ]),
    ).toBe(true);
  });
  it("requires newsletter consent", () => {
    expect(
      newsletterSchema.safeParse({ email: "reader@example.com", consent: false }).success,
    ).toBe(false);
  });
  it("rejects an invalid newsletter email", () => {
    expect(newsletterSchema.safeParse({ email: "not-an-email", consent: true }).success).toBe(
      false,
    );
  });
  it("requires submission consent", () => {
    expect(
      enquirySchema.safeParse({
        name: "Reader",
        email: "reader@example.com",
        company: "Company",
        role: "Founder",
        interest: "Founder story",
        message: "A useful business story with relevant context.",
        consent: false,
      }).success,
    ).toBe(false);
  });
});
