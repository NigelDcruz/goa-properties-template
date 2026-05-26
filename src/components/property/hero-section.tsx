import Button from "@/components/shared/button";
import Card from "../shared/card";

type HeroSectionProps = {
  onSearchClick?: () => void;
};

export default function HeroSection({ onSearchClick }: HeroSectionProps) {
  return (
    <section className="px-4 py-6">
      <Card className="p-6">
        <div
          className="
            inline-flex
            items-center
            rounded-full
            bg-emerald-50
            px-3
            py-2
            text-xs
            font-medium
            text-emerald-700
          "
        >
          Goa’s Most Trusted Real Estate Platform
        </div>

        <h1
          className="
            mt-5
            text-[42px]
            font-bold
            leading-[1]
            tracking-[-0.04em]
            text-gray-900
            font-display
          "
        >
          Find Your Perfect
          <span className="text-amber-600"> Property in Goa</span>
        </h1>

        <p
          className="
            mt-5
            max-w-xs
            text-sm
            leading-7
            text-gray-600
          "
        >
          Verified listings. Clear titles. Local expertise. Your trusted partner
          for buying, selling, and investing in Goa.
        </p>

        <div className="mt-6">
          <Button onClick={onSearchClick}>Search Properties</Button>
        </div>
      </Card>
    </section>
  );
}
