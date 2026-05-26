"use client";

import { useState, useEffect, useCallback } from "react";
import HeroSection from "@/components/property/hero-section";
import SearchCard from "@/components/property/search-card";
import MobileNavbar from "@/components/navigation/mobile-navbar";
import FeaturedProperties from "@/components/property/featured-properties";
import TrustSection from "@/components/property/trust-section";
import ExploreGoa from "@/components/property/explore-goa";
import InsightsSection from "@/components/property/insights-sections";
import CTASection from "@/components/property/cta-section";
import Footer from "@/components/layout/footer";
import { Property } from "@/types/property";

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    listingType: "" as "sale" | "rent" | "",
  });

  const fetchProperties = useCallback(async (currentFilters: typeof filters) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (currentFilters.search) params.append("search", currentFilters.search);
      if (currentFilters.location) params.append("location", currentFilters.location);
      if (currentFilters.listingType) params.append("listingType", currentFilters.listingType);

      const response = await fetch(`/api/properties?${params.toString()}`);
      if (!response.ok) throw new Error("API request failed");
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setProperties(result.data);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch properties on mount or filter change
  useEffect(() => {
    fetchProperties(filters);
  }, [filters, fetchProperties]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      location: "",
      listingType: "",
    });
  };

  const handleExploreLocation = (locName: string) => {
    handleFilterChange({ location: locName });
    // Smooth scroll to the featured properties section
    document.getElementById("featured-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <MobileNavbar />

      <div className="mx-auto w-full max-w-md pb-24">
        <HeroSection onSearchClick={() => {
          document.getElementById("search-card-section")?.scrollIntoView({ behavior: "smooth" });
        }} />

        <div id="search-card-section">
          <SearchCard 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onSearch={() => fetchProperties(filters)} 
          />
        </div>
        
        <TrustSection />
        
        <div id="featured-section">
          <FeaturedProperties 
            properties={properties} 
            loading={loading} 
            onReset={handleResetFilters} 
          />
        </div>
        
        <ExploreGoa onLocationSelect={handleExploreLocation} />
        
        <InsightsSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
