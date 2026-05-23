import Image from "next/image";

import {
  Bath,
  BedDouble,
  MapPin,
  Ruler,
} from "lucide-react";

import { notFound } from "next/navigation";

import { mockProperties } from "@/lib/mock-properties";
import PropertyActionBar from "@/components/property/property-action-bar";

type PropertyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PropertyPageProps) {
  const { slug } = await params;

  const property = mockProperties.find(
    (item) => item.slug === slug
  );

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  return {
    title: property.title,

    description: `${property.title} in ${property.location}. Verified Goa property listing with pricing, amenities, and investment insights.`,
  };
}

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params;

  const property = mockProperties.find(
    (item) => item.slug === slug
  );

  if (!property) {
    notFound();
  }

  const propertySchema = {
    "@context": "https://schema.org",

    "@type": "RealEstateListing",

    name: property.title,

    description: `${property.title} located in ${property.location}`,

    url: `https://goatrustrealty.com/properties/${property.slug}`,

    image: property.image,

    offers: {
      "@type": "Offer",

      priceCurrency: "INR",

      price: property.price,
    },

    address: {
      "@type": "PostalAddress",

      addressLocality: property.location,

      addressRegion: "Goa",

      addressCountry: "IN",
    },
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            propertySchema
          ),
        }}
      />

      <div className="mx-auto max-w-md">
        <div className="relative aspect-[4/3]">
          <Image
            src={property.image}
            alt={property.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <section className="px-4 py-6 pb-32">
          <div className="rounded-[28px] bg-white p-6 shadow-sm">
            <h1
              className="
                font-display
                text-4xl
                font-bold
                leading-tight
                text-gray-900
              "
            >
              {property.title}
            </h1>

            <div
              className="
                mt-3
                flex
                items-center
                gap-2
                text-gray-500
              "
            >
              <MapPin size={16} />

              <span>{property.location}</span>
            </div>

            <p
              className="
                mt-5
                text-3xl
                font-bold
                text-gray-900
              "
            >
              {property.price}
            </p>

            <div
              className="
                mt-6
                grid
                grid-cols-3
                gap-4
              "
            >
              <div className="rounded-2xl bg-gray-50 p-4">
                <BedDouble size={20} />

                <p className="mt-2 text-sm text-gray-500">
                  Bedrooms
                </p>

                <p className="font-semibold">
                  {property.bedrooms}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <Bath size={20} />

                <p className="mt-2 text-sm text-gray-500">
                  Bathrooms
                </p>

                <p className="font-semibold">
                  {property.bathrooms}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <Ruler size={20} />

                <p className="mt-2 text-sm text-gray-500">
                  Area
                </p>

                <p className="font-semibold">
                  {property.area}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <PropertyActionBar />
    </main>
  );
}