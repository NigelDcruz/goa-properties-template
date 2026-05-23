import Image from "next/image";
import Link from "next/link";

import { Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";

import Card from "@/components/shared/card";

import { Property } from "@/types/property";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.slug}`} className="mb-5 block">
      <article>
        <Card className="overflow-hidden">
          <div className="relative aspect-[4/3]">
            <Image
              src={property.image}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              loading="lazy"
              className="object-cover"
            />

            <div className="absolute left-3 top-3">
              <span
                className="
                rounded-full
                bg-emerald-700
                px-3
                py-1
                text-xs
                font-medium
                text-white
              "
              >
                {property.listingType === "sale" ? "For Sale" : "For Rent"}
              </span>
            </div>

            <button
              aria-label={`Save ${property.title}`}
              className="
              absolute
              right-3
              top-3
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white/90
              text-gray-700
              backdrop-blur
            "
            >
              <Heart size={18} />
            </button>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {property.title}
            </h3>

            <div
              className="
              mt-2
              flex
              items-center
              gap-1
              text-sm
              text-gray-500
            "
            >
              <MapPin size={14} />

              <span>{property.location}</span>
            </div>

            <p
              className="
              mt-4
              text-2xl
              font-bold
              text-gray-900
            "
            >
              {property.price}
            </p>

            <div
              className="
              mt-4
              flex
              items-center
              justify-between
              text-sm
              text-gray-600
            "
            >
              <div className="flex items-center gap-1">
                <BedDouble size={16} />

                <span>{property.bedrooms} Beds</span>
              </div>

              <div className="flex items-center gap-1">
                <Bath size={16} />

                <span>{property.bathrooms} Baths</span>
              </div>

              <div className="flex items-center gap-1">
                <Ruler size={16} />

                <span>{property.area}</span>
              </div>
            </div>
          </div>
        </Card>
      </article>
    </Link>
  );
}
