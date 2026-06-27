import Link from "next/link";
import Footer from "@/app/components/Footer";
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
  metadataBase: new URL("https://allahabadlawpublications.com"),

  title: {
    default: "Allahabad Law Publications",
    template: "%s | Allahabad Law Publications",
  },

  description:
    "Trusted legal publisher since 1959. Bare Acts, Commentaries, Judicial Service, AIBE, LL.B. Textbooks and legal publications for advocates, judges, law students and legal professionals.",

  keywords: [
    "Allahabad Law Publications",
    "Bare Acts",
    "Law Books",
    "Legal Books",
    "Judicial Service",
    "AIBE",
    "LLB",
    "Legal Publisher",
    "Law Publisher India",
  ],

  authors: [
    {
      name: "Allahabad Law Publications",
    },
  ],

  creator: "Allahabad Law Publications",

  publisher: "Allahabad Law Publications",

  openGraph: {
    title: "Allahabad Law Publications",

    description:
      "Trusted Legal Knowledge Since 1959.",

    url: "https://allahabadlawpublications.com",

    siteName: "Allahabad Law Publications",

    locale: "en_IN",

    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-screen flex flex-col bg-white text-gray-900">

        <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur shadow-sm">

          <div className="max-w-7xl mx-auto h-24 px-6 flex items-center justify-between">

            <Link
              href="/"
              className="flex items-center gap-4 hover:opacity-90 transition"
            >
              <img
                src="/logo.png"
                alt="Allahabad Law Publications"
                className="w-14 h-14 object-contain"
              />

              <div>

                <h1 className="text-2xl font-bold leading-tight">
                  Allahabad Law Publications
                </h1>

                <p className="text-gray-500 text-sm">
                  Since 1959
                </p>

              </div>

            </Link>

            <nav className="hidden md:flex items-center gap-8 text-[16px] font-medium">

              <Link
                href="/"
                className="hover:text-amber-700 transition"
              >
                Home
              </Link>

              <Link
                href="/publications"
                className="hover:text-amber-700 transition"
              >
                Publications
              </Link>

              <Link
                href="/search"
                className="hover:text-amber-700 transition"
              >
                Search
              </Link>

              <Link
                href="/about"
                className="hover:text-amber-700 transition"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="hover:text-amber-700 transition"
              >
                Contact
              </Link>

              <Link
                href="/publications"
                className="rounded-xl bg-amber-700 px-6 py-3 text-white font-semibold hover:bg-amber-800 transition"
              >
                Browse Books
              </Link>

            </nav>

          </div>

        </header>

        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}