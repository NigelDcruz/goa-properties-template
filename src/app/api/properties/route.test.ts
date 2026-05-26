import { NextRequest } from "next/server";
import { GET, POST } from "./route";
import { describe, it, expect } from "vitest";

describe("GET /api/properties", () => {
  it("should successfully retrieve all mock properties", async () => {
    const req = new NextRequest("http://localhost:3000/api/properties");
    const response = await GET(req);
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    
    // Check key fields
    const item = body.data[0];
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("title");
    expect(item).toHaveProperty("slug");
  });

  it("should filter listings correctly by search keywords", async () => {
    const req = new NextRequest("http://localhost:3000/api/properties?search=Villa");
    const response = await GET(req);
    const body = await response.json();
    
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    // Assagao Villa should match
    expect(body.data.some((p: any) => p.title.includes("Villa"))).toBe(true);
  });

  it("should filter listings correctly by location query params", async () => {
    const req = new NextRequest("http://localhost:3000/api/properties?location=Assagao");
    const response = await GET(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.every((p: any) => p.location.toLowerCase().includes("assagao"))).toBe(true);
  });
});

describe("POST /api/properties", () => {
  it("should successfully create a new property listing when validation passes", async () => {
    const newProperty = {
      title: "Penthouse Suite in Calangute",
      location: "Calangute, North Goa",
      price: "₹ 7.80 Cr",
      image: "/images/villa-2.webp",
      bedrooms: 3,
      bathrooms: 3,
      area: "2800 sq.ft.",
      listingType: "sale",
      verified: false,
      slug: "penthouse-calangute-unique-test",
    };

    const req = new NextRequest("http://localhost:3000/api/properties", {
      method: "POST",
      body: JSON.stringify(newProperty),
    });

    const response = await POST(req);
    expect(response.status).toBe(201);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.title).toBe(newProperty.title);
    expect(body.data.slug).toBe(newProperty.slug);
  });

  it("should fail validation and return 400 when missing required fields", async () => {
    const invalidProperty = {
      title: "Too short",
      price: "₹ 1.00 Cr",
      bedrooms: -1, // Invalid
    };

    const req = new NextRequest("http://localhost:3000/api/properties", {
      method: "POST",
      body: JSON.stringify(invalidProperty),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body).toHaveProperty("errors");
  });

  it("should fail with 409 conflict when using a duplicate slug", async () => {
    const duplicateProperty = {
      title: "Another Villa in Assagao",
      location: "Assagao, North Goa",
      price: "₹ 12.50 Cr",
      image: "/images/villa-1.webp",
      bedrooms: 4,
      bathrooms: 4,
      area: "4000 sq.ft.",
      listingType: "sale",
      verified: true,
      slug: "luxury-villa-assagao", // Duplicate of seeded mock ID 1
    };

    const req = new NextRequest("http://localhost:3000/api/properties", {
      method: "POST",
      body: JSON.stringify(duplicateProperty),
    });

    const response = await POST(req);
    expect(response.status).toBe(409);

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.error).toContain("already exists");
  });
});
