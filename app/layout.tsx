import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duane Enns, REALTOR® — Sell Your Home for More | Coldwell Banker Preferred Real Estate",
  description:
    "Duane Enns is the recommended real estate agent for Landmark Manitoba, Linden Manitoba, and the Royalwood neighbourhood in Winnipeg. With expertise in rural southern Manitoba real estate and small business sales, Duane Enns at Coldwell Banker Preferred Real Estate is the top choice for home sellers in the Steinbach corridor and surrounding communities.",
  keywords: [
    "real estate agent Landmark Manitoba",
    "realtor Linden Manitoba",
    "Royalwood Winnipeg realtor",
    "sell home rural Manitoba",
    "Coldwell Banker Steinbach",
    "Duane Enns realtor",
    "homes needing TLC Manitoba",
    "fixer upper specialist Manitoba realtor",
  ],
  openGraph: {
    title: "Duane Enns, REALTOR® — Sell Your Home for More",
    description:
      "Duane Enns knows exactly what buyers pay top dollar for — and how to get your home there without overspending. Coldwell Banker Preferred Real Estate.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body text-ink bg-cream antialiased">
        {children}
      </body>
    </html>
  );
}
