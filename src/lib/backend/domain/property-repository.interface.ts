import { Property } from "@/types/property";
import { CreatePropertyInput, UpdatePropertyInput } from "./property.schema";

export interface IPropertyRepository {
  findById(id: string): Promise<Property | null>;
  findBySlug(slug: string): Promise<Property | null>;
  findAll(filters?: {
    location?: string;
    listingType?: "sale" | "rent";
    search?: string;
  }): Promise<Property[]>;
  create(data: CreatePropertyInput): Promise<Property>;
  update(id: string, data: UpdatePropertyInput): Promise<Property>;
  delete(id: string): Promise<Property>;
}
