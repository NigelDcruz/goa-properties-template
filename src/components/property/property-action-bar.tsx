import { Phone, CalendarDays } from "lucide-react";

export default function PropertyActionBar() {
  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-gray-200
        bg-white/95
        px-4
        py-4
        backdrop-blur
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-md
          gap-3
        "
      >
        <button
          aria-label="Call property agent"
          className="
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-4
            py-4
            font-semibold
            text-gray-900
          "
        >
          <Phone size={18} />

          <span>Call Now</span>
        </button>

        <button
          aria-label="Schedule property visit"
          className="
            flex
            flex-[1.2]
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-emerald-700
            px-4
            py-4
            font-semibold
            text-white
          "
        >
          <CalendarDays size={18} />

          <span>Schedule Visit</span>
        </button>
      </div>
    </div>
  );
}