import Link from "next/link";

export default function DesktopNavbar() {

  return (

    <nav className="hidden md:flex items-center gap-2">

      <Link href="/" className="px-4 py-2 rounded-xl hover:bg-amber-100">
        Home
      </Link>

      <Link href="/publications" className="px-4 py-2 rounded-xl hover:bg-amber-100">
        Publications
      </Link>

      <Link href="/search" className="px-4 py-2 rounded-xl hover:bg-amber-100">
        Search
      </Link>

      <Link href="/about" className="px-4 py-2 rounded-xl hover:bg-amber-100">
        About
      </Link>

      <Link href="/contact" className="px-4 py-2 rounded-xl hover:bg-amber-100">
        Contact
      </Link>

      <Link
        href="/publications"
        className="ml-3 bg-black text-white px-5 py-2 rounded-xl hover:bg-amber-600 transition"
      >
        Browse Books
      </Link>

    </nav>

  );

}