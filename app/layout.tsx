import { Atkinson_Hyperlegible, Geist_Mono, Saira } from "next/font/google"

import "./globals.css"
import "katex/dist/katex.min.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

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

export const metadata = {
  title: "Oleo Kit Research",
  description:
    "Research base for an RC boat dragging reusable oleophilic sponge arrays through oil slicks.",
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
      </body>
    </html>
  )
}
