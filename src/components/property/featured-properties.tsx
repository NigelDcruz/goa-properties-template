"use client";

import PropertyCard from "./property-card";
import { Property } from "@/types/property";
import { Info, RotateCcw } from "lucide-react";
import Button from "@/components/shared/button";

type FeaturedPropertiesProps = {
  properties: Property[];
  loading: boolean;
  onReset?: () => void;
};

export default function FeaturedProperties({ properties, loading, onReset }: FeaturedPropertiesProps) {
  return (
    <section className="px-4 py-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Featured Properties
        </h2>

        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
          {loading ? "..." : `${properties.length} Listings`}
        </span>
      </div>

      {loading ? (
        // Premium Skeleton Loader List
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="relative aspect-[4/3] w-full rounded-2xl bg-gray-250" />
              <div className="mt-4 space-y-3">
                <div className="h-5 w-3/4 rounded-md bg-gray-250" />
                <div className="h-4 w-1/2 rounded-md bg-gray-200" />
                <div className="mt-4 h-6 w-1/3 rounded-md bg-gray-250" />
                <div className="mt-4 flex justify-between pt-2">
                  <div className="h-4 w-1/4 rounded-md bg-gray-200" />
                  <div className="h-4 w-1/4 rounded-md bg-gray-200" />
                  <div className="h-4 w-1/4 rounded-md bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        // Beautiful No Results State
        <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50/50 px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <Info size={24} />
          </div>
          <h3 className="mt-4 text-base font-bold text-gray-900">No properties found</h3>
          <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
            We couldn't find any listings matching your search criteria. Try modifying your location, filters or keywords.
          </p>
          {onReset && (
            <Button
              onClick={onReset}
              className="mt-6 inline-flex items-center gap-2 py-3.5 bg-emerald-700 hover:bg-emerald-800 transition shadow-sm"
            >
              <RotateCcw size={16} />
              <span>Reset Filters</span>
            </Button>
          )}
        </div>
      ) : (
        // Active Properties List
        <div className="space-y-5">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      )}
    </section>
  );
}