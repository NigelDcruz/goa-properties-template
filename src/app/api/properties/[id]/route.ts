import { NextRequest, NextResponse } from "next/server";
import { PrismaPropertyRepository } from "@/lib/backend/infrastructure/prisma-property.repository";
import { updatePropertySchema } from "@/lib/backend/domain/property.schema";

const propertyRepository = new PrismaPropertyRepository();

// Helper to look up a property by id first, then slug
async function getPropertyByIdOrSlug(idOrSlug: string) {
  let property = await propertyRepository.findById(idOrSlug);
  if (!property) {
    property = await propertyRepository.findBySlug(idOrSlug);
  }
  return property;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const property = await getPropertyByIdOrSlug(id);

    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: property });
  } catch (error: any) {
    console.error("GET /api/properties/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const property = await getPropertyByIdOrSlug(id);

    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const parsed = updatePropertySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Check slug uniqueness if updated
    if (parsed.data.slug && parsed.data.slug !== property.slug) {
      const existing = await propertyRepository.findBySlug(parsed.data.slug);
      if (existing) {
        return NextResponse.json(
          { success: false, error: "A property with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const updated = await propertyRepository.update(property.id, parsed.data);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("PUT /api/properties/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update property" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const property = await getPropertyByIdOrSlug(id);

    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    const deleted = await propertyRepository.delete(property.id);
    return NextResponse.json({ success: true, data: deleted });
  } catch (error: any) {
    console.error("DELETE /api/properties/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
