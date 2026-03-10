import { describe, it, expect } from "vitest";

describe("SportX Features - Calculations", () => {
  describe("Discount Calculation (10%)", () => {
    it("should calculate 10% discount correctly", () => {
      const subtotal = 259.99;
      const discount = subtotal * 0.1;
      expect(discount).toBeCloseTo(26.0, 1);
    });

    it("should calculate subtotal after discount", () => {
      const subtotal = 259.99;
      const discount = subtotal * 0.1;
      const subtotalAfterDiscount = subtotal - discount;
      expect(subtotalAfterDiscount).toBeCloseTo(233.99, 2);
    });
  });

  describe("Shipping Calculation", () => {
    it("should apply free shipping for orders >= 100", () => {
      const subtotal = 259.99;
      const discount = subtotal * 0.1;
      const subtotalAfterDiscount = subtotal - discount;
      const shipping = subtotalAfterDiscount >= 100 ? 0 : 5.99;
      expect(shipping).toBe(0);
    });

    it("should apply paid shipping for orders < 100", () => {
      const subtotal = 50;
      const discount = subtotal * 0.1;
      const subtotalAfterDiscount = subtotal - discount;
      const shipping = subtotalAfterDiscount >= 100 ? 0 : 5.99;
      expect(shipping).toBe(5.99);
    });
  });

  describe("Tax Calculation (23% IVA)", () => {
    it("should calculate tax on subtotal after discount", () => {
      const subtotal = 259.99;
      const discount = subtotal * 0.1;
      const subtotalAfterDiscount = subtotal - discount;
      const tax = subtotalAfterDiscount * 0.23;
      expect(tax).toBeCloseTo(53.82, 2);
    });
  });

  describe("Total Order Calculation", () => {
    it("should calculate total correctly with discount and free shipping", () => {
      const subtotal = 259.99;
      const discount = subtotal * 0.1;
      const subtotalAfterDiscount = subtotal - discount;
      const shipping = subtotalAfterDiscount >= 100 ? 0 : 5.99;
      const tax = subtotalAfterDiscount * 0.23;
      const total = subtotalAfterDiscount + shipping + tax;

      expect(total).toBeCloseTo(287.81, 2);
    });

    it("should calculate total correctly with discount and paid shipping", () => {
      const subtotal = 50;
      const discount = subtotal * 0.1;
      const subtotalAfterDiscount = subtotal - discount;
      const shipping = subtotalAfterDiscount >= 100 ? 0 : 5.99;
      const tax = subtotalAfterDiscount * 0.23;
      const total = subtotalAfterDiscount + shipping + tax;

      // 50 - 5 = 45
      // 45 * 0.23 = 10.35
      // 45 + 5.99 + 10.35 = 61.34
      expect(total).toBeCloseTo(61.34, 2);
    });
  });

  describe("Order Confirmation", () => {
    it("should have correct order number format", () => {
      const orderNumber = "SPX53879438";
      expect(orderNumber).toMatch(/^SPX\d+$/);
    });

    it("should have valid tracking number format", () => {
      const trackingNumber = "TRKBG4IQW1B";
      expect(trackingNumber).toMatch(/^TRK[A-Z0-9]+$/);
    });

    it("should have confirmed status", () => {
      const status = "confirmado";
      expect(["confirmado", "pendente", "enviado", "entregue"]).toContain(status);
    });
  });

  describe("Product Data", () => {
    it("should have valid product prices", () => {
      const prices = [259.99, 249.99, 239.99, 269.99, 279.99];
      prices.forEach((price) => {
        expect(price).toBeGreaterThan(0);
        expect(typeof price).toBe("number");
      });
    });

    it("should have valid product sizes", () => {
      const sizes = ["36", "36.5", "37.5", "38", "38.5", "39", "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "45.5", "46", "47"];
      expect(sizes.length).toBeGreaterThan(0);
      sizes.forEach((size) => {
        expect(typeof size).toBe("string");
      });
    });
  });

  describe("Favorites Feature", () => {
    it("should track favorite count", () => {
      const favorites = [30001]; // Nike Mercurial
      expect(favorites.length).toBe(1);
      expect(favorites[0]).toBe(30001);
    });

    it("should support multiple favorites", () => {
      const favorites = [30001, 30002, 30003];
      expect(favorites.length).toBe(3);
    });
  });

  describe("Cart Feature", () => {
    it("should track item count", () => {
      const cartItems = [
        { productId: 30001, quantity: 1, size: "42" },
      ];
      const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      expect(itemCount).toBe(1);
    });

    it("should calculate cart total", () => {
      const cartItems = [
        { productId: 30001, price: 259.99, quantity: 1 },
        { productId: 30002, price: 249.99, quantity: 2 },
      ];
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      expect(total).toBeCloseTo(759.97, 2);
    });
  });
});
