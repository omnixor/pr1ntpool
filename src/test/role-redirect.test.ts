import { describe, expect, it } from "vitest";
import { homeFor, roleOf } from "@/lib/supabase";

describe("role redirect", () => {
  it("sends shops to /shop", () => {
    expect(homeFor(roleOf({ user_metadata: { role: "shop" } } as never))).toBe("/shop");
  });
  it("sends customers to /dashboard", () => {
    expect(homeFor(roleOf({ user_metadata: { role: "customer" } } as never))).toBe("/dashboard");
  });
});
