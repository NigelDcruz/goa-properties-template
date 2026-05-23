import {
  BadgeCheck,
  FileCheck,
  ShieldCheck,
  Users,
} from "lucide-react";

import Card from "@/components/shared/card";

const trustItems = [
  {
    icon: BadgeCheck,

    title: "100% Verified Listings",

    description:
      "Every property manually verified by local experts.",
  },

  {
    icon: FileCheck,

    title: "RERA Registered",

    description:
      "Compliance checked listings with legal transparency.",
  },

  {
    icon: ShieldCheck,

    title: "Clear Titles",

    description:
      "Verified ownership and legal due diligence.",
  },

  {
    icon: Users,

    title: "Local Goa Experts",

    description:
      "Ground level specialists across Goa micro markets.",
  },
];

export default function TrustSection() {
  return (
    <section className="px-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="
                flex
                flex-col
                items-center
                p-5
                text-center
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-50
                  text-emerald-700
                "
              >
                <Icon size={28} />
              </div>

              <h3
                className="
                  mt-4
                  text-sm
                  font-semibold
                  text-gray-900
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-2
                  text-xs
                  leading-relaxed
                  text-gray-500
                "
              >
                {item.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}