"use client";

import { useState } from "react";
import { Search, ChevronDown, MapPin, Home, X } from "lucide-react";
import Button from "@/components/shared/button";
import Card from "../shared/card";

type SearchCardProps = {
  filters: {
    search: string;
    location: string;
    listingType: "sale" | "rent" | "";
  };
  onFilterChange: (newFilters: Partial<SearchCardProps["filters"]>) => void;
  onSearch: () => void;
};

const LOCATIONS = [
  "All Locations",
  "Assagao",
  "Anjuna",
  "Siolim",
  "Morjim",
  "Vagator",
  "Panaji",
  "Miramar",
  "Nerul",
  "Candolim",
  "Dona Paula",
  "Mandrem",
  "Saligao",
  "Betul",
  "Guirim",
  "Benaulim",
  "Socorro",
  "Bambolim",
  "Aldona",
  "Raia",
];

const PROPERTY_TYPES = [
  "All Types",
  "Villa",
  "Apartment",
  "Penthouse",
  "Bungalow",
  "Mansion",
  "Condo",
  "Studio",
  "Cottage",
  "Estate",
];

export default function SearchCard({ filters, onFilterChange, onSearch }: SearchCardProps) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState("All Types");

  const handleLocationSelect = (loc: string) => {
    onFilterChange({ location: loc === "All Locations" ? "" : loc });
    setShowLocationDropdown(false);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    onFilterChange({ search: type === "All Types" ? "" : type });
    setShowTypeDropdown(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handleListingTypeSelect = (type: "sale" | "rent" | "") => {
    onFilterChange({ listingType: type });
  };

  return (
    <section className="px-4">
      <Card className="p-5 shadow-lg border border-gray-100 bg-white/95 backdrop-blur-md">
        {/* Listing Type Segmented Control */}
        <div className="flex rounded-2xl bg-gray-100 p-1.5 mb-4">
          <button
            type="button"
            onClick={() => handleListingTypeSelect("")}
            className={`flex-1 py-2.5 text-center text-xs font-semibold rounded-xl transition duration-200 ${
              filters.listingType === ""
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            All Listings
          </button>
          <button
            type="button"
            onClick={() => handleListingTypeSelect("sale")}
            className={`flex-1 py-2.5 text-center text-xs font-semibold rounded-xl transition duration-200 ${
              filters.listingType === "sale"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Buy (Sale)
          </button>
          <button
            type="button"
            onClick={() => handleListingTypeSelect("rent")}
            className={`flex-1 py-2.5 text-center text-xs font-semibold rounded-xl transition duration-200 ${
              filters.listingType === "rent"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Rent
          </button>
        </div>

        <div className="space-y-3.5 relative">
          {/* Keyword Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search properties, keywords..."
              value={filters.search}
              onChange={handleSearchChange}
              className="block w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-10 pr-4 text-sm font-medium text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => {
                  onFilterChange({ search: "" });
                  setSelectedType("All Types");
                }}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Location Custom Dropdown Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowLocationDropdown(!showLocationDropdown);
                setShowTypeDropdown(false);
              }}
              className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm hover:bg-gray-50 transition"
            >
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 flex items-center gap-1">
                  <MapPin size={10} />
                  <span>Location</span>
                </p>
                <p className="mt-0.5 text-sm font-semibold text-gray-900 truncate">
                  {filters.location || "All Locations"}
                </p>
              </div>
              <ChevronDown
                size={18}
                className={`text-gray-400 transition-transform duration-200 ${
                  showLocationDropdown ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {showLocationDropdown && (
              <div className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-2xl border border-gray-150 bg-white py-2 shadow-xl ring-1 ring-black/5 animate-in fade-in duration-200">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handleLocationSelect(loc)}
                    className={`block w-full px-4 py-2.5 text-left text-sm transition hover:bg-emerald-50 hover:text-emerald-950 ${
                      (loc === "All Locations" && !filters.location) || filters.location === loc
                        ? "bg-emerald-50 font-semibold text-emerald-800"
                        : "text-gray-700"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Type Custom Dropdown Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowTypeDropdown(!showTypeDropdown);
                setShowLocationDropdown(false);
              }}
              className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm hover:bg-gray-50 transition"
            >
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 flex items-center gap-1">
                  <Home size={10} />
                  <span>Property Type</span>
                </p>
                <p className="mt-0.5 text-sm font-semibold text-gray-900">
                  {selectedType}
                </p>
              </div>
              <ChevronDown
                size={18}
                className={`text-gray-400 transition-transform duration-200 ${
                  showTypeDropdown ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {showTypeDropdown && (
              <div className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-2xl border border-gray-150 bg-white py-2 shadow-xl ring-1 ring-black/5 animate-in fade-in duration-200">
                {PROPERTY_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeSelect(type)}
                    className={`block w-full px-4 py-2.5 text-left text-sm transition hover:bg-emerald-50 hover:text-emerald-950 ${
                      selectedType === type
                        ? "bg-emerald-50 font-semibold text-emerald-800"
                        : "text-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Button
            onClick={onSearch}
            className="w-full flex items-center justify-center py-4 bg-emerald-700 hover:bg-emerald-800 transition active:scale-[0.99]"
          >
            <div className="flex items-center gap-2">
              <Search size={18} />
              <span>Search Properties</span>
            </div>
          </Button>
        </div>
      </Card>
    </section>
  );
}
