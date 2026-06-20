import Image from "next/image";
import Link from "next/link";
import { books } from "@/app/data/books";
export default function Home() {
  const featuredBooks = Object.entries(books).filter(
  ([, book]) => book.featured === true
);
const newArrivalBooks = Object.entries(books).filter(
  ([, book]) => book.newArrival === true
);
  return (
    <main className="min-h-screen bg-white text-gray-900">
     
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-100 to-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
  <img
  src="/logo.png"
  alt="Allahabad Law Publications Logo"
  className="w-28 h-28 mx-auto"
/>
</div>
          <p className="text-amber-700 font-semibold tracking-widest uppercase mb-4">
            Established 1959
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Allahabad Law Publications
          </h1>

          <p className="text-2xl md:text-3xl text-amber-700 font-semibold mb-6">
            Trusted Legal Knowledge Since 1959
          </p>
          <p className="text-lg text-gray-600 mt-3">
  Founded by Raj Kishore Narula
</p>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Publishing authoritative legal books for students,
            advocates, judicial aspirants, researchers and legal
            professionals across India.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-lg font-medium transition">
              Browse Publications
            </button>

            <button className="border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            Our Legacy
          </h2>

          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Founded by Raj Kishore Narula, Allahabad Law Publications
            has served the legal fraternity for more than four decades,
            publishing reliable and authoritative legal literature.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <h3 className="text-5xl font-bold text-amber-700 mb-2">
                1959
              </h3>
              <p className="text-gray-600">Established</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-amber-700 mb-2">
                1000+
              </h3>
              <p className="text-gray-600">Publications</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-amber-700 mb-2">
                60+
              </h3>
              <p className="text-gray-600">Years of Service</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-amber-700 mb-2">
                India
              </h3>
              <p className="text-gray-600">Focused Legal Publishing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            Featured Publications
          </h2>

          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
  Explore our most trusted legal publications used by advocates,
  judicial aspirants, law students and legal professionals across India.
</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

  {featuredBooks.map(([slug, book]) => (

    <div
  key={slug}
  className="bg-white rounded-xl shadow-md border p-5 min-w-0"
>

      <div className="flex flex-col md:flex-row gap-5">

  <div className="w-full md:w-40 h-56 bg-gray-100 rounded-lg overflow-hidden border flex-shrink-0">

  {book.cover ? (
    <Image
  src={book.cover || "/covers/placeholder-book.jpg"}
  alt={book.englishTitle}
  width={160}
  height={224}
  className="w-full h-full object-cover"
/>
  ) : (
    <div className="w-full md:w-40 h-56 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border">

  <div className="text-center">

    <p className="font-semibold text-gray-700">
      Cover
    </p>

    <p className="text-sm text-gray-500">
      Coming Soon
    </p>

  </div>

</div>
  )}

</div>

  <div className="flex-1 min-w-0">

    <h3 className="text-lg md:text-xl font-bold mb-2 break-words">
      {book.englishTitle}
    </h3>

    <p className="text-amber-700 font-medium mb-4">
      {book.hindiTitle}
    </p>

    <p className="mb-1">
      <strong>Author:</strong> {book.author}
    </p>

    <p className="mb-3">
      <strong>Edition:</strong> {book.edition}
    </p>

    <hr className="my-3" />

    <p className="text-gray-700">
      MRP: ₹{book.mrp}
    </p>

    <p className="text-3xl font-bold text-amber-700 my-2">
      ₹{book.salePrice}
    </p>

    <p className="text-green-600 font-semibold">
      In Stock ({book.stock} Available)
    </p>

    <Link
      href={`/books/${slug}`}
      className="block mt-5 text-center bg-black text-white py-3 rounded-lg"
    >
      View Details
    </Link>

  </div>

</div>

    </div>

  ))}

</div>

</div>
</section>

<section className="bg-white py-20">
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-4">
      New Arrivals
    </h2>

    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
      Explore the latest additions to our legal publication catalogue.
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

      {newArrivalBooks.map(([slug, book]) => (

        <div
  key={slug}
  className="bg-white rounded-xl shadow-md border p-5 min-w-0"
>

          <div className="flex flex-col md:flex-row gap-5">

  <div className="h-40 bg-gray-100 rounded-lg overflow-hidden border mb-4">

  <Image
    src={book.cover || "/covers/placeholder-book.jpg"}
    alt={book.englishTitle}
    width={160}
    height={224}
    className="w-full h-full object-cover"
  />

</div>

  <div className="flex-1 min-w-0">

    <h3 className="text-lg md:text-xl font-bold mb-2 break-words">
      {book.englishTitle}
    </h3>

    <p className="text-amber-700 font-medium mb-4">
      {book.hindiTitle}
    </p>

    <p className="mb-1">
      <strong>Author:</strong> {book.author}
    </p>

    <p className="mb-3">
      <strong>Edition:</strong> {book.edition}
    </p>

    <hr className="my-3" />

    <p className="text-gray-700">
      MRP: ₹{book.mrp}
    </p>

    <p className="text-3xl font-bold text-amber-700 my-2">
      ₹{book.salePrice}
    </p>

    <p className="text-green-600 font-semibold">
      In Stock ({book.stock} Available)
    </p>

    <Link
      href={`/books/${slug}`}
      className="block mt-5 text-center bg-black text-white py-3 rounded-lg"
    >
      View Details
    </Link>

  </div>

</div>

        </div>

      ))}

    </div>

  </div>
</section>

{/* Why Choose Us */}
<section className="bg-white py-20">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-4">
      Why Choose Allahabad Law Publications
    </h2>

    <p className="text-center text-gray-600 mb-16">
      More than six decades of trusted legal publishing.
    </p>

    <div className="grid md:grid-cols-4 gap-8">

      <div className="bg-gray-50 p-8 rounded-xl border text-center">
        <h3 className="text-3xl font-bold text-amber-700 mb-3">
          1959
        </h3>
        <p className="text-gray-700">
          Established
        </p>
      </div>

      <div className="bg-gray-50 p-8 rounded-xl border text-center">
        <h3 className="text-3xl font-bold text-amber-700 mb-3">
          1000+
        </h3>
        <p className="text-gray-700">
          Publications
        </p>
      </div>

      <div className="bg-gray-50 p-8 rounded-xl border text-center">
        <h3 className="text-3xl font-bold text-amber-700 mb-3">
          65+
        </h3>
        <p className="text-gray-700">
          Years of Legacy
        </p>
      </div>

      <div className="bg-gray-50 p-8 rounded-xl border text-center">
        <h3 className="text-3xl font-bold text-amber-700 mb-3">
          India
        </h3>
        <p className="text-gray-700">
          Trusted Nationwide
        </p>
      </div>

    </div>

  </div>
</section>

{/* Footer */}
      
      <footer className="bg-gray-900 text-white py-16">
  <div className="max-w-7xl mx-auto px-6">

    <div className="grid md:grid-cols-4 gap-10">

      <div>
        <h3 className="text-xl font-bold mb-4">
          Allahabad Law Publications
        </h3>

        <p className="text-gray-400">
          Trusted Legal Knowledge Since 1959.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Quick Links
        </h3>

        <ul className="space-y-2 text-gray-400">
          <li><a href="/">Home</a></li>
          <li><a href="/publications">Publications</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Categories
        </h3>

        <ul className="space-y-2 text-gray-400">
          <li>Bare Acts</li>
          <li>Commentaries</li>
          <li>AIBE</li>
          <li>Judicial Service</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Contact
        </h3>

        <p className="text-gray-400">
          166-B Allenganj
        </p>

        <p className="text-gray-400">
          Prayagraj - 211002
        </p>

        <p className="text-gray-400 mt-2">
          +91 9235650006
        </p>

        <p className="text-gray-400">
          alp.alld@gmail.com
        </p>
      </div>

    </div>

    <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500">
      © 2026 Allahabad Law Publications. All Rights Reserved.
    </div>

  </div>
</footer>
    </main>
  );
}