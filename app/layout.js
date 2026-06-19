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
  title: "Allahabad Law Publications",
  description: "Trusted Legal Knowledge Since 1959",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="ALP Logo"
                className="w-10 h-10"
              />

              <div>
                <h2 className="font-bold text-lg">
                  Allahabad Law Publications
                </h2>

                <p className="text-sm text-gray-500">
                  Since 1959
                </p>
              </div>
            </div>

            <nav className="hidden md:flex gap-8 font-medium">
              <a href="/">Home</a>
              <a href="/publications">Publications</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/login">Login</a>
            </nav>

          </div>
        </header>

        {children}

      </body>
    </html>
  );
}