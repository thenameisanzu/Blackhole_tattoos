import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import FloatingMenu from "../components/FloatingMenu";

export const metadata: Metadata = {
  title: "BLACKHOLE • Premium Tattoo & Piercing Studio | Kottayam, Kerala",
  description:
    "Discover BLACKHOLE, the premier custom tattoo and precision piercing studio in Kottayam, Kerala. Uncompromising hygiene, award-winning artists, and bespoke digital skin artistry.",
  keywords: [
    "BLACKHOLE Tattoos Kottayam",
    "Best Tattoo Studio Kottayam",
    "Tattoo Artist Kottayam",
    "Tattoo Studio Kerala",
    "Piercing Kottayam",
    "Custom Tattoos Kerala",
    "Ear Piercing Kottayam",
    "Sterile Piercing Kerala",
  ],
  openGraph: {
    title: "BLACKHOLE • Bespoke Tattoo & Piercing Collective",
    description:
      "Experience luxury body illustration and clinical piercing standards in the heart of Kottayam, Kerala.",
    url: "https://www.instagram.com/blackholetattoos",
    siteName: "BLACKHOLE Tattoos",
    images: [
      {
        url: "/assets/media__1782481912436.png", // bio-mech sleeve
        width: 1200,
        height: 630,
        alt: "BLACKHOLE Custom Tattoo Artistry",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLACKHOLE Tattoos Kottayam",
    description: "Bespoke tattoo art and clinical body piercings in Kottayam, Kerala.",
    images: ["/assets/media__1782481912436.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    "name": "BLACKHOLE Tattoos & Piercings",
    "image": "/assets/media__1782481664436.png",
    "priceRange": "₹₹₹",
    "telephone": "+916235456525",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Grand Opera Building, Near KSRTC Terminal",
      "addressLocality": "Kottayam",
      "addressRegion": "Kerala",
      "postalCode": "686001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.5923984,
      "longitude": 76.5204683
    },
    "url": "https://share.google/4FXHASNLBeZGetgfm",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:30",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/blackholetattoos"
    ]
  };

  return (
    <html lang="en" className="h-full antialiased dark" style={{ scrollBehavior: "smooth" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col selection:bg-red-600 selection:text-white">
        <ThemeProvider>
          {/* Film Grain background overlay */}
          <div className="film-grain" />

          {/* Interactive Custom cursor dot & outer circle */}
          <CustomCursor />

          {/* Core Layout Navigation */}
          <Navbar />

          {/* Main content body */}
          <main className="flex-1 w-full flex flex-col">{children}</main>

          {/* Sticky floating socials stack */}
          <FloatingMenu />
        </ThemeProvider>
      </body>
    </html>
  );
}
