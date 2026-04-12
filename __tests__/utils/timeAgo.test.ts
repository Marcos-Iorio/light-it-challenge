import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { timeAgo } from "@/utils/timeAgo";

const NOW = new Date("2024-06-15T12:00:00Z");

describe("timeAgo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("seconds", () => {
    it("returns seconds ago for recent dates", () => {
      const date = new Date(NOW.getTime() - 30 * 1000);
      expect(timeAgo(date)).toBe("30 seconds ago");
    });

    it("returns 0 seconds ago for same time", () => {
      expect(timeAgo(NOW)).toBe("0 seconds ago");
    });

    it("returns 59 seconds ago at the boundary", () => {
      const date = new Date(NOW.getTime() - 59 * 1000);
      expect(timeAgo(date)).toBe("59 seconds ago");
    });
  });

  describe("minutes", () => {
    it("returns 1 minute ago (singular)", () => {
      const date = new Date(NOW.getTime() - 60 * 1000);
      expect(timeAgo(date)).toBe("1 minute ago");
    });

    it("returns multiple minutes ago (plural)", () => {
      const date = new Date(NOW.getTime() - 30 * 60 * 1000);
      expect(timeAgo(date)).toBe("30 minutes ago");
    });

    it("returns 59 minutes ago at the boundary", () => {
      const date = new Date(NOW.getTime() - 59 * 60 * 1000);
      expect(timeAgo(date)).toBe("59 minutes ago");
    });
  });

  describe("hours", () => {
    it("returns 1 hour ago (singular)", () => {
      const date = new Date(NOW.getTime() - 60 * 60 * 1000);
      expect(timeAgo(date)).toBe("1 hour ago");
    });

    it("returns multiple hours ago (plural)", () => {
      const date = new Date(NOW.getTime() - 6 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe("6 hours ago");
    });

    it("returns 23 hours ago at the boundary", () => {
      const date = new Date(NOW.getTime() - 23 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe("23 hours ago");
    });
  });

  describe("days", () => {
    it("returns 1 day ago (singular)", () => {
      const date = new Date(NOW.getTime() - 24 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe("1 day ago");
    });

    it("returns multiple days ago (plural)", () => {
      const date = new Date(NOW.getTime() - 15 * 24 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe("15 days ago");
    });

    it("returns 29 days ago at the boundary", () => {
      const date = new Date(NOW.getTime() - 29 * 24 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe("29 days ago");
    });
  });

  describe("months", () => {
    it("returns 1 month ago (singular)", () => {
      const date = new Date(NOW.getTime() - 30 * 24 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe("1 month ago");
    });

    it("returns multiple months ago (plural)", () => {
      const date = new Date(NOW.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe("6 months ago");
    });
  });

  describe("years", () => {
    it("returns 1 year ago (singular)", () => {
      const date = new Date(NOW.getTime() - 12 * 30 * 24 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe("1 year ago");
    });

    it("returns multiple years ago (plural)", () => {
      const date = new Date(NOW.getTime() - 24 * 30 * 24 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe("2 years ago");
    });
  });

  describe("string input", () => {
    it("accepts an ISO string and returns the correct relative time", () => {
      const dateStr = new Date(NOW.getTime() - 30 * 1000).toISOString();
      expect(timeAgo(dateStr)).toBe("30 seconds ago");
    });
  });
});
