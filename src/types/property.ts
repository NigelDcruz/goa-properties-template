export type Property = {
  id: string;

  title: string;

  location: string;

  price: string;

  image: string;

  bedrooms: number;

  bathrooms: number;

  area: string;

  listingType: "sale" | "rent";

  verified: boolean;

  slug: string;
};