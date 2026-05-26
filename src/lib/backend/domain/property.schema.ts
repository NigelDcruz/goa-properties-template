import { z } from "zod";

export const createPropertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  location: z.string().min(3, "Location must be at least 3 characters long"),
  price: z.string().min(1, "Price is required"),
  image: z.string().url("Image must be a valid URL").or(z.string().startsWith("/", "Image must be a valid local path")),
  bedrooms: z.number().int().nonnegative("Bedrooms must be a non-negative integer"),
  bathrooms: z.number().int().nonnegative("Bathrooms must be a non-negative integer"),
  area: z.string().min(1, "Area is required"),
  listingType: z.enum(["sale", "rent"], {
    message: "Listing type must be 'sale' or 'rent'",
  }),
  verified: z.boolean().optional().default(false),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and hyphens only"),
});

export const updatePropertySchema = createPropertySchema.partial();

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
