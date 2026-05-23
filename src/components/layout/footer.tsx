import { MapPin, Phone } from "lucide-react";

import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
        mt-8
        overflow-hidden
        bg-emerald-950
        px-6
        pb-28
        pt-10
        text-white
        relative
      "
    >
      <div className="mx-auto max-w-md">
        <div>
          <p
            className="
              text-sm
              font-medium
              uppercase
              tracking-[0.2em]
              text-emerald-300
            "
          >
            Goa Trust Realty
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
            Trusted Goa Property Intelligence
          </h2>

          <p
            className="
              mt-4
              text-sm
              leading-relaxed
              text-emerald-100
            "
          >
            Verified Goa real estate listings, legal transparency, local
            expertise, and AI optimized property discovery.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-emerald-300" />

            <span className="text-sm">North Goa, India</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={18} className="text-emerald-300" />

            <span className="text-sm">+91 9999 9999</span>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            aria-label="Instagram"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
            "
          >
            <FaInstagram size={18} />
          </button>

          <button
            aria-label="Facebook"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
            "
          >
            <FaFacebookF size={18} />
          </button>

          <button
            aria-label="LinkedIn"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
            "
          >
            <FaLinkedinIn size={18} />
          </button>
        </div>

        <div
          className="
            mt-10
            border-t
            border-white/10
            pt-6
          "
        >
          <p
            className="
              text-xs
              leading-relaxed
              text-emerald-200
            "
          >
            © 2026 Goa Trust Realty. Verified listings. Trusted insights.
            Transparent real estate intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
}
