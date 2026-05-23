import PropertyCard from "./property-card";

import { mockProperties } from "@/lib/mock-properties";

export default function FeaturedProperties() {
  return (
    <section className="px-4 py-8">
      <div
        className="
          mb-5
          flex
          items-center
          justify-between
        "
      >
        <h2 className="text-2xl font-bold text-gray-900">
          Featured Properties
        </h2>

        <button className="text-sm font-medium text-emerald-700">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {mockProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </section>
  );
}