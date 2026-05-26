import { PrismaClient } from "@prisma/client";
import { Property } from "@/types/property";
import { IPropertyRepository } from "../domain/property-repository.interface";
import { CreatePropertyInput, UpdatePropertyInput } from "../domain/property.schema";
import { mockProperties } from "@/lib/mock-properties";

// Simple in-memory fallback store
let inMemoryProperties: Property[] = [...mockProperties];

// We hold a singleton reference for Prisma Client, but initialize lazily
let prismaInstance: PrismaClient | null = null;

function getPrismaClient(): PrismaClient | null {
  if (typeof window !== "undefined") return null; // Avoid client-side execution issues
  if (!process.env.DATABASE_URL) return null; // Only instantiate if DB environment is loaded

  try {
    if (!prismaInstance) {
      prismaInstance = new PrismaClient();
    }
    return prismaInstance;
  } catch (error) {
    console.error("PrismaClient constructor error, falling back to null:", error);
    return null;
  }
}

export class PrismaPropertyRepository implements IPropertyRepository {
  private hasDb(): boolean {
    return !!process.env.DATABASE_URL;
  }

  async findById(id: string): Promise<Property | null> {
    try {
      const prisma = getPrismaClient();
      if (!prisma) {
        return inMemoryProperties.find((p) => p.id === id) || null;
      }
      const dbProp = await prisma.property.findUnique({ where: { id } });
      if (!dbProp) return null;
      return this.mapToDomain(dbProp);
    } catch (error) {
      console.warn("Database error in findById, falling back to in-memory store:", error);
      return inMemoryProperties.find((p) => p.id === id) || null;
    }
  }

  async findBySlug(slug: string): Promise<Property | null> {
    try {
      const prisma = getPrismaClient();
      if (!prisma) {
        return inMemoryProperties.find((p) => p.slug === slug) || null;
      }
      const dbProp = await prisma.property.findUnique({ where: { slug } });
      if (!dbProp) return null;
      return this.mapToDomain(dbProp);
    } catch (error) {
      console.warn("Database error in findBySlug, falling back to in-memory store:", error);
      return inMemoryProperties.find((p) => p.slug === slug) || null;
    }
  }

  async findAll(filters?: {
    location?: string;
    listingType?: "sale" | "rent";
    search?: string;
  }): Promise<Property[]> {
    try {
      const prisma = getPrismaClient();
      if (!prisma) {
        return this.filterInMemory(filters);
      }
      const where: any = {};
      
      if (filters?.location) {
        where.location = { contains: filters.location, mode: "insensitive" };
      }
      if (filters?.listingType) {
        where.listingType = filters.listingType;
      }
      if (filters?.search) {
        where.OR = [
          { title: { contains: filters.search, mode: "insensitive" } },
          { location: { contains: filters.search, mode: "insensitive" } },
        ];
      }

      const dbProps = await prisma.property.findMany({ where });
      return dbProps.map(this.mapToDomain);
    } catch (error) {
      console.warn("Database error in findAll, falling back to in-memory store:", error);
      return this.filterInMemory(filters);
    }
  }

  async create(data: CreatePropertyInput): Promise<Property> {
    const newProperty: Property = {
      id: crypto.randomUUID(),
      title: data.title,
      location: data.location,
      price: data.price,
      image: data.image,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      area: data.area,
      listingType: data.listingType,
      verified: data.verified || false,
      slug: data.slug,
    };

    try {
      const prisma = getPrismaClient();
      if (!prisma) {
        inMemoryProperties.push(newProperty);
        return newProperty;
      }
      const dbProp = await prisma.property.create({
        data: {
          id: newProperty.id,
          title: data.title,
          location: data.location,
          price: data.price,
          image: data.image,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          area: data.area,
          listingType: data.listingType,
          verified: data.verified,
          slug: data.slug,
        },
      });
      return this.mapToDomain(dbProp);
    } catch (error) {
      console.warn("Database error in create, falling back to in-memory store:", error);
      inMemoryProperties.push(newProperty);
      return newProperty;
    }
  }

  async update(id: string, data: UpdatePropertyInput): Promise<Property> {
    try {
      const prisma = getPrismaClient();
      if (!prisma) {
        const index = inMemoryProperties.findIndex((p) => p.id === id);
        if (index === -1) throw new Error("Property not found");
        const updated = { ...inMemoryProperties[index], ...data } as Property;
        inMemoryProperties[index] = updated;
        return updated;
      }
      const dbProp = await prisma.property.update({
        where: { id },
        data: {
          title: data.title,
          location: data.location,
          price: data.price,
          image: data.image,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          area: data.area,
          listingType: data.listingType,
          verified: data.verified,
          slug: data.slug,
        },
      });
      return this.mapToDomain(dbProp);
    } catch (error) {
      console.warn("Database error in update, falling back to in-memory store:", error);
      const index = inMemoryProperties.findIndex((p) => p.id === id);
      if (index === -1) throw new Error("Property not found");
      const updated = { ...inMemoryProperties[index], ...data } as Property;
      inMemoryProperties[index] = updated;
      return updated;
    }
  }

  async delete(id: string): Promise<Property> {
    try {
      const prisma = getPrismaClient();
      if (!prisma) {
        const index = inMemoryProperties.findIndex((p) => p.id === id);
        if (index === -1) throw new Error("Property not found");
        const deleted = inMemoryProperties[index];
        inMemoryProperties.splice(index, 1);
        return deleted;
      }
      const dbProp = await prisma.property.delete({ where: { id } });
      return this.mapToDomain(dbProp);
    } catch (error) {
      console.warn("Database error in delete, falling back to in-memory store:", error);
      const index = inMemoryProperties.findIndex((p) => p.id === id);
      if (index === -1) throw new Error("Property not found");
      const deleted = inMemoryProperties[index];
      inMemoryProperties.splice(index, 1);
      return deleted;
    }
  }

  private mapToDomain(dbProp: any): Property {
    return {
      id: dbProp.id,
      title: dbProp.title,
      location: dbProp.location,
      price: dbProp.price,
      image: dbProp.image,
      bedrooms: dbProp.bedrooms,
      bathrooms: dbProp.bathrooms,
      area: dbProp.area,
      listingType: dbProp.listingType as "sale" | "rent",
      verified: dbProp.verified,
      slug: dbProp.slug,
    };
  }

  private filterInMemory(filters?: {
    location?: string;
    listingType?: "sale" | "rent";
    search?: string;
  }): Property[] {
    let list = [...inMemoryProperties];
    if (filters?.location) {
      list = list.filter((p) =>
        p.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    if (filters?.listingType) {
      list = list.filter((p) => p.listingType === filters.listingType);
    }
    if (filters?.search) {
      const query = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      );
    }
    return list;
  }
}
