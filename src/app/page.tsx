import HeroSection from "@/components/property/hero-section";
import SearchCard from "@/components/property/search-card";
import MobileNavbar from "@/components/navigation/mobile-navbar";
import FeaturedProperties from "@/components/property/featured-properties";
import TrustSection from "@/components/property/trust-section";
import ExploreGoa from "@/components/property/explore-goa";
import InsightsSection from "@/components/property/insights-sections";
import CTASection from "@/components/property/cta-section";
import Footer from "@/components/layout/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <MobileNavbar />

      <div className="mx-auto w-full max-w-md">
        <HeroSection />

        <SearchCard />
        <TrustSection />
        <FeaturedProperties />
        <ExploreGoa />
        <InsightsSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
