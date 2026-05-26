import { NextRequest } from "next/server";
import { GET, PUT, DELETE } from "./route";
import { describe, it, expect } from "vitest";

describe("Individual Property Item Endpoints", () => {
  const existingId = "e51241df-a567-488f-9e6e-214152db4901"; // Mock property ID from seed data
  const existingSlug = "luxury-portuguese-villa-assagao";

  it("should successfully retrieve property details by UUID ID", async () => {
    const req = new NextRequest(`http://localhost:3000/api/properties/${existingId}`);
    const params = Promise.resolve({ id: existingId });

    const response = await GET(req, { params });
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.id).toBe(existingId);
    expect(body.data.slug).toBe(existingSlug);
  });

  it("should successfully retrieve property details by URL Slug fallback", async () => {
    const req = new NextRequest(`http://localhost:3000/api/properties/${existingSlug}`);
    const params = Promise.resolve({ id: existingSlug });

    const response = await GET(req, { params });
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.slug).toBe(existingSlug);
    expect(body.data.id).toBe(existingId);
  });

  it("should return 404 when property is not found by ID or Slug", async () => {
    const req = new NextRequest(`http://localhost:3000/api/properties/does-not-exist`);
    const params = Promise.resolve({ id: "does-not-exist" });

    const response = await GET(req, { params });
    expect(response.status).toBe(404);

    const body = await response.json();
    expect(body.success).toBe(false);
  });

  it("should successfully update fields on an existing property", async () => {
    const updatePayload = {
      price: "₹ 15.00 Cr",
      title: "Super Luxury Villa Assagao Updated",
    };

    const req = new NextRequest(`http://localhost:3000/api/properties/${existingId}`, {
      method: "PUT",
      body: JSON.stringify(updatePayload),
    });
    const params = Promise.resolve({ id: existingId });

    const response = await PUT(req, { params });
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.price).toBe(updatePayload.price);
    expect(body.data.title).toBe(updatePayload.title);
  });

  it("should delete an existing property listing successfully", async () => {
    // Delete the property we created in the collection test or another mock one
    const deleteId = "f42352ef-b678-499f-af7f-325263ec5012"; // Seed item 2
    const req = new NextRequest(`http://localhost:3000/api/properties/${deleteId}`, {
      method: "DELETE",
    });
    const params = Promise.resolve({ id: deleteId });

    const response = await DELETE(req, { params });
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.id).toBe(deleteId);

    // Verify it is deleted
    const verifyReq = new NextRequest(`http://localhost:3000/api/properties/${deleteId}`);
    const verifyResponse = await GET(verifyReq, { params });
    expect(verifyResponse.status).toBe(404);
  });
});
