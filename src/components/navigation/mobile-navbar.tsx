import { Menu, Phone } from "lucide-react";

export default function MobileNavbar() {
  return (
    <header className="bg-white">
      <div
        className="
          mx-auto
          flex
          max-w-md
          items-center
          justify-between
          px-4
          py-3
        "
      >
        <button
          aria-label="Open navigation menu"
          className="
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-full
    border
    border-gray-200
    bg-white
    text-gray-700
    shadow-sm
  "
        >
          <Menu size={18} />
        </button>

        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-900">Goa Trust Realty</h2>

          <p className="text-xs text-gray-500">Trusted Goa Properties</p>
        </div>

        <button
          aria-label="Call Goa Trust Realty"
          className="
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-full
    bg-emerald-700
    text-white
    shadow-sm
  "
        >
          <Phone size={18} />
        </button>
      </div>
    </header>
  );
}
