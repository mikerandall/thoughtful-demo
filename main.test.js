const { isBulky, isHeavy, sort, generatePackage } = require("./src/main");

describe("Package Sorting Tests", () => {
  describe("isBulky", () => {
    test("should return true when any dimension is greater than 150", () => {
      expect(isBulky(151, 100, 100)).toBe(true);
      expect(isBulky(100, 151, 100)).toBe(true);
      expect(isBulky(100, 100, 151)).toBe(true);
    });

    test("should return true when volume is greater than 1,000,000", () => {
      expect(isBulky(100, 100, 101)).toBe(true); // 1,010,000 > 1,000,000
    });

    test("should return false for normal sized packages", () => {
      expect(isBulky(100, 100, 100)).toBe(false);
      expect(isBulky(50, 100, 149)).toBe(false);
    });
  });

  describe("isHeavy", () => {
    test("should return true when mass is 20 or greater", () => {
      expect(isHeavy(20)).toBe(true);
      expect(isHeavy(21)).toBe(true);
    });

    test("should return false when mass is less than 20", () => {
      expect(isHeavy(19)).toBe(false);
      expect(isHeavy(0)).toBe(false);
    });
  });

  describe("sort", () => {
    test("should return REJECTED for both heavy and bulky packages", () => {
      expect(sort(151, 100, 100, 20)).toBe("REJECTED");
      expect(sort(100, 100, 101, 20)).toBe("REJECTED");
    });

    test("should return SPECIAL for heavy but not bulky packages", () => {
      expect(sort(100, 100, 100, 20)).toBe("SPECIAL");
    });

    test("should return SPECIAL for bulky but not heavy packages", () => {
      expect(sort(151, 100, 100, 19)).toBe("SPECIAL");
    });

    test("should return STANDARD for normal packages", () => {
      expect(sort(100, 100, 100, 19)).toBe("STANDARD");
    });
  });

  describe("generatePackage", () => {
    test("should generate package with valid properties", () => {
      const pkg = generatePackage();
      expect(pkg).toHaveProperty("width");
      expect(pkg).toHaveProperty("height");
      expect(pkg).toHaveProperty("length");
      expect(pkg).toHaveProperty("mass");
    });

    test("should generate package with non-negative values", () => {
      const pkg = generatePackage();
      expect(pkg.width).toBeGreaterThanOrEqual(0);
      expect(pkg.height).toBeGreaterThanOrEqual(0);
      expect(pkg.length).toBeGreaterThanOrEqual(0);
      expect(pkg.mass).toBeGreaterThanOrEqual(0);
    });
  });
});
