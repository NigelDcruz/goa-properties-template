import { NextRequest, NextResponse } from "next/server";
import { PrismaPropertyRepository } from "@/lib/backend/infrastructure/prisma-property.repository";
import { createPropertySchema } from "@/lib/backend/domain/property.schema";

const propertyRepository = new PrismaPropertyRepository();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;
    const location = searchParams.get("location") || undefined;
    const listingTypeParam = searchParams.get("listingType");
    
    let listingType: "sale" | "rent" | undefined;
    if (listingTypeParam === "sale" || listingTypeParam === "rent") {
      listingType = listingTypeParam;
    }

    const properties = await propertyRepository.findAll({
      search,
      location,
      listingType,
    });

    return NextResponse.json({ success: true, data: properties });
  } catch (error: any) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createPropertySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existing = await propertyRepository.findBySlug(parsed.data.slug);
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A property with this slug already exists" },
        { status: 409 }
      );
    }

    const created = await propertyRepository.create(parsed.data);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create property" },
      { status: 500 }
    );
  }
}
