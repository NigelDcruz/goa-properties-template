import Image from "next/image";

import Card from "@/components/shared/card";

const insights = [
  {
    title:
      "Why North Goa Real Estate is Booming in 2026",

    category: "Market Insights",

    image: "/images/villa-1.webp",
  },

  {
    title:
      "Understanding CRZ Rules in Goa",

    category: "Legal Guide",

    image: "/images/villa-3.webp",
  },

  {
    title:
      "Best Areas for Rental Investment",

    category: "Investment",

    image: "/images/villa-2.webp",
  },
];

export default function InsightsSection() {
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
          Goa Real Estate Insights
        </h2>

        <button className="text-sm font-medium text-emerald-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {insights.map((item) => (
          <Card
            key={item.title}
            className="
              flex
              gap-4
              p-3
            "
          >
            <div
              className="
                relative
                h-24
                w-24
                overflow-hidden
                rounded-2xl
                flex-shrink-0
              "
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-wide
                  text-emerald-700
                "
              >
                {item.category}
              </p>

              <h3
                className="
                  mt-2
                  text-base
                  font-semibold
                  leading-snug
                  text-gray-900
                "
              >
                {item.title}
              </h3>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}