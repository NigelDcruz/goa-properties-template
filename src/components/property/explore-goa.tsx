import Image from "next/image";

const locations = [
  {
    name: "Assagao",

    image: "/images/assagao.webp",
  },

  {
    name: "Anjuna",

    image: "/images/anjuna.webp",
  },

  {
    name: "Siolim",

    image: "/images/siolim.webp",
  },

  {
    name: "Morjim",

    image: "/images/morjim.webp",
  },

  {
    name: "Vagator",

    image: "/images/vagator.webp",
  },
];

export default function ExploreGoa() {
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
          Explore Goa
        </h2>

        <button className="text-sm font-medium text-emerald-700">
          View All
        </button>
      </div>

      <div
        className="
          flex
          gap-4
          overflow-x-auto
          pb-2
        "
      >
        {locations.map((location) => (
          <button
            key={location.name}
            aria-label={`Explore properties in ${location.name}`}
            className="
              flex
              min-w-[72px]
              flex-col
              items-center
            "
          >
            <div
              className="
                relative
                h-16
                w-16
                overflow-hidden
                rounded-full
                border-2
                border-white
                shadow-sm
              "
            >
              <Image
                src={location.image}
                alt={location.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <span
              className="
                mt-2
                text-sm
                font-medium
                text-gray-800
              "
            >
              {location.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}