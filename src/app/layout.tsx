import type { Metadata } from "next";

import "./globals.css";
import { inter, playfair } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Goa Trust Realty",
  description:
    "AI optimized Goa real estate platform with verified property listings, clear titles, CRZ compliance verification, and trusted local experts.",

  keywords: [
    "Goa real estate",
    "Goa villas",
    "Goa property investment",
    "Luxury villas Goa",
    "Goa apartments",
    "North Goa properties",
    "CRZ verified properties",
    "Goa real estate agents",
  ],

  openGraph: {
    title: "Goa Trust Realty",
    description:
      "Verified Goa property listings with compliance transparency and AI optimized search architecture.",

    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",

    title: "Goa Trust Realty",

    description:
      "Verified Goa real estate listings built for trust and AI discoverability.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",

    "@type": "RealEstateAgent",

    name: "Goa Trust Realty",

    description:
      "Trusted Goa real estate platform with verified listings and compliance transparency.",

    areaServed: {
      "@type": "Place",
      name: "Goa",
    },

    url: "https://goatrustrealty.com",
  };

  return (
    <html lang="en">
      <body
        className={`
    ${inter.variable}
    ${playfair.variable}
  `}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {children}
      </body>
    </html>
  );
}
