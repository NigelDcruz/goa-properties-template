import { ArrowRight, Phone } from "lucide-react";

import Card from "@/components/shared/card";

export default function CTASection() {
  return (
    <section className="px-4 py-8">
      <Card
        className="
          overflow-hidden
          bg-gradient-to-br
          from-emerald-950
          via-emerald-900
          to-emerald-800
          p-6
          text-white
        "
      >
        <div className="relative z-10">
          <p
            className="
              text-sm
              font-medium
              uppercase
              tracking-wide
              text-emerald-300
            "
          >
            Ready to Buy or Invest?
          </p>

          <h2
            className="
              mt-3
              font-display
              text-3xl
              font-bold
              leading-tight
            "
          >
            Connect with Goa Property Experts
          </h2>

          <p
            className="
              mt-4
              text-sm
              leading-relaxed
              text-emerald-100
            "
          >
            Get personalized recommendations,
            verified listings, and expert guidance
            across Goa micro markets.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              aria-label="Talk to Goa property expert"
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                bg-white
                px-5
                py-4
                font-semibold
                text-emerald-900
              "
            >
              <Phone size={18} />

              <span>Talk to an Expert</span>
            </button>

            <button
              aria-label="Explore Goa listings"
              className="
                flex
                items-center
                justify-center
                rounded-2xl
                border
                border-white/20
                px-4
                text-white
              "
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

      </Card>
    </section>
  );
}