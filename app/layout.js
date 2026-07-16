import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Allahabad Law Publications | Trusted Legal Publisher Since 1959",

  description:
    "Authoritative legal books, Bare Acts, Commentaries, Judicial Service, AIBE and LL.B. publications by Allahabad Law Publications since 1959.",

  verification: {
    google: "iEDctQ-VdFFcnnWJUBhdNE1-WlG0n76y2neovFIqMF0",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-screen flex flex-col bg-white text-gray-900">

        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}