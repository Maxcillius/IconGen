import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ReduxProvider from "../components/ReduxProvider"
import { Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700']})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IconGenerator",
  description: "Generate Icons with AI",
};  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Navbar/>
            {children}
          <Footer/>
        </ReduxProvider>
      </body>
    </html>
  );
}
