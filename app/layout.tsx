import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Atkinson_Hyperlegible, Geist_Mono, Saira } from "next/font/google"

import "./globals.css"
import "katex/dist/katex.min.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")

const fontSans = Atkinson_Hyperlegible({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
})

const fontHeading = Saira({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Oleo Kit Research",
  description:
    "Research base for an RC boat dragging reusable oleophilic sponge arrays through oil slicks.",
  applicationName: "Oleo Kit Research",
  openGraph: {
    title: "Oleo Kit Research",
    description:
      "Shape selection, traversal strategy, and fabrication routes for a reusable oleophilic sponge array.",
    type: "website",
    siteName: "Oleo Kit Research",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oleo Kit Research",
    description:
      "Shape selection, traversal strategy, and fabrication routes for a reusable oleophilic sponge array.",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Oleo Kit",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        fontHeading.variable,
        fontMono.variable,
        fontSans.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
