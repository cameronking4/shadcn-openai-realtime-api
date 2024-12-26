import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import Script from 'next/script';
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenAI Realtime WebRTC",
  description: "Shadcn/UI Starter for using OpenAI Realtime API with WebRTC. Powered by OpenAI's latest Realtime API (12/17/2024). Use this starter to build your own real-time voice AI application. Fastest & latest way to do Voice AI (Dec 2024), implementing API advancements of Day of OpenAI's 12 days of Christmas.",
  authors: [{ name: siteConfig.author, url: siteConfig.links.twitter }],
  creator: siteConfig.author,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    images: "/opengraph-image.png",
  },
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["AI Blocks", "OpenAI Blocks", "Blocks", "OpenAI Realtime API", "OpenAI Realtime", "OpenAI WebRTC", "Livekit", "OpenAI Realtime WebRTC", "OpenAI Realtime Starter", "Voice AI", "Voice AI components", "web components", "UI components", "UI Library", "shadcn", "aceternity", "AI", "Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript", "Design engineer", "shadcn ai"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          geistSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col bg-background items-center">
            <Header />
            <div className="w-full bg-gradient-to-r from-gray-900 to-gray-700 py-2">
              <div className="container mx-auto px-4 text-center text-white text-sm">
                🎉 Check out the new OpenAI Realtime Blocks UI Library for Next.js! 
                <a href="https://openai-realtime-blocks.vercel.app" className="underline ml-2 hover:text-gray-200">
                  Learn more →
                </a>
              </div>
            </div>
            <main className="flex flex-1 justify-center items-start">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
      <Script
        async
        src="https://cloud.umami.is/script.js"
        data-website-id="746564e6-6d18-4a7e-8059-b2a4a8493a40"
      />
    </html>
  );
}
