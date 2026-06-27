import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company */}

          <div>

            <img
              src="/logo.png"
              alt="Allahabad Law Publications"
              className="w-16 h-16 mb-5"
            />

            <h3 className="text-2xl font-bold text-white mb-3">
              Allahabad Law Publications
            </h3>

            <p className="text-amber-400 font-semibold mb-4">
              Trusted Legal Publisher Since 1959
            </p>

            <p className="leading-7 text-gray-400">
              Publishing authoritative Bare Acts, Commentaries,
              Judicial Service books, AIBE publications and legal
              reference books trusted by advocates, law students,
              judges and legal professionals throughout India.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-bold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">

              <li>
                <Link href="/" className="hover:text-amber-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/publications" className="hover:text-amber-400 transition">
                  Publications
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-amber-400 transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-amber-400 transition">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Categories */}

          <div>

            <h3 className="text-xl font-bold text-white mb-6">
              Publication Categories
            </h3>

            <ul className="space-y-4">

              <li>
                <Link href="/categories/bare-acts" className="hover:text-amber-400 transition">
                  Bare Acts
                </Link>
              </li>

              <li>
                <Link href="/categories/commentaries" className="hover:text-amber-400 transition">
                  Commentaries
                </Link>
              </li>

              <li>
                <Link href="/categories/judicial-service" className="hover:text-amber-400 transition">
                  Judicial Service
                </Link>
              </li>

              <li>
                <Link href="/categories/aibe" className="hover:text-amber-400 transition">
                  AIBE
                </Link>
              </li>

              <li>
                <Link href="/categories/llb-textbooks" className="hover:text-amber-400 transition">
                  LL.B. Textbooks
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold text-white mb-6">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-400">

              <div>
                <p className="font-semibold text-white mb-1">
                  Address
                </p>

                <p>
                  Allahabad Law Publications
                  <br />
                  Prayagraj, Uttar Pradesh
                  <br />
                  India
                </p>
              </div>

              <div>
                <p className="font-semibold text-white mb-1">
                  Phone
                </p>

                <a
                  href="tel:+919235650006"
                  className="hover:text-amber-400 transition"
                >
                  +91 92356 50006
                </a>
              </div>

              <div>
                <p className="font-semibold text-white mb-1">
                  Email
                </p>

                <a
                  href="mailto:info@allahabadlawpublications.com"
                  className="hover:text-amber-400 transition"
                >
                  info@allahabadlawpublications.com
                </a>
              </div>

            </div>

          </div>

        </div>

        <hr className="border-gray-700 my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">

          <p className="text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} Allahabad Law Publications.
            All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6">

            <Link href="/about" className="hover:text-amber-400 transition">
              About
            </Link>

            <Link href="/contact" className="hover:text-amber-400 transition">
              Contact
            </Link>

            <Link href="/publications" className="hover:text-amber-400 transition">
              Catalogue
            </Link>

          </div>

          <p className="text-amber-400 font-semibold">
            Established 1959
          </p>

        </div>

      </div>

    </footer>
  );
}