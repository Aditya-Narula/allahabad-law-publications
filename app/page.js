import { books } from "@/app/data/books";
import RelatedBookCard from "@/app/components/RelatedBookCard";
import Image from "next/image";
import Link from "next/link";
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
      <section className="bg-gradient-to-b from-amber-50 via-white to-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
  <img
  src="/logo.png"
  alt="Allahabad Law Publications Logo"
  className="w-36 h-36 mx-auto drop-shadow-lg"
/>
</div>
          <p className="inline-block bg-amber-100 text-amber-800 px-5 py-2 rounded-full font-semibold tracking-wide mb-6">
  Since 1959 • Trusted Legal Publisher
</p>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Allahabad Law Publications
          </h1>

          <p className="text-2xl md:text-3xl text-amber-700 font-bold mb-8">
            Trusted Legal Knowledge Since 1959
          </p>
          <p className="text-lg text-gray-500 mt-3 italic">
  Founded by Raj Kishore Narula
</p>

          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Publishing authoritative legal books for students,
            advocates, judicial aspirants, researchers and legal
            professionals across India.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
            <Link
  href="/publications"
  className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-lg font-medium transition"
>
  Browse Publications
</Link>

            <Link
  href="/contact"
  className="border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium transition"
>
  Contact Us
</Link>
          </div>
        </div>
      </section>

      {/* Our Legacy */}

<section className="py-24 bg-white border-y border-gray-100">

  <div className="max-w-6xl mx-auto px-6">

    <div className="text-center max-w-4xl mx-auto">

      <p className="uppercase tracking-[0.35em] text-amber-700 font-bold mb-4">
        Our Legacy
      </p>

      <h2 className="text-5xl md:text-6xl font-bold mb-8">
        Over Six Decades of
        <span className="text-amber-700"> Legal Publishing</span>
      </h2>

      <p className="text-xl leading-9 text-gray-600">

        Since <strong>1959</strong>, Allahabad Law Publications has
        remained committed to publishing authentic, reliable and
        up-to-date legal literature for advocates, judges,
        law students, judicial aspirants, universities and
        legal professionals throughout India.

      </p>

    </div>

    <div className="grid md:grid-cols-3 gap-10 mt-20">

      <div className="text-center">

        <div className="text-6xl font-extrabold text-amber-700">
          1959
        </div>

        <h3 className="text-2xl font-bold mt-5">
          Established
        </h3>

        <p className="text-gray-600 mt-3 leading-7">

          Founded by
          <strong> Raj Kishore Narula</strong> with a vision
          to publish dependable legal literature.

        </p>

      </div>

      <div className="text-center">

        <div className="text-6xl font-extrabold text-amber-700">
          1000+
        </div>

        <h3 className="text-2xl font-bold mt-5">
          Publications
        </h3>

        <p className="text-gray-600 mt-3 leading-7">

          A comprehensive catalogue covering Bare Acts,
          Commentaries, Judicial Service, AIBE,
          LL.B. Textbooks and more.

        </p>

      </div>

      <div className="text-center">

        <div className="text-6xl font-extrabold text-amber-700">
          India
        </div>

        <h3 className="text-2xl font-bold mt-5">
          Trusted Nationwide
        </h3>

        <p className="text-gray-600 mt-3 leading-7">

          Serving advocates, courts, educational institutions,
          law libraries and legal professionals across India.

        </p>

      </div>

    </div>

  </div>

</section>

{/* Browse by Category */}

<section className="bg-gray-50 py-24">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <p className="uppercase tracking-[0.35em] text-amber-700 font-bold mb-4">
        Browse Collection
      </p>

      <h2 className="text-5xl font-bold mb-6">
        Explore by Category
      </h2>

      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Discover our extensive collection of legal publications
        organised by subject and purpose.
      </p>

    </div>

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

      <Link
        href="/categories/bare-acts"
        className="bg-white rounded-2xl p-8 border hover:shadow-xl hover:-translate-y-2 transition"
      >
        <div className="text-5xl mb-6">⚖️</div>

        <h3 className="text-2xl font-bold mb-3">
          Bare Acts
        </h3>

        <p className="text-gray-600 leading-7">
          Updated Bare Acts with latest amendments in Diglot editions.
        </p>

      </Link>

      <Link
        href="/categories/commentaries"
        className="bg-white rounded-2xl p-8 border hover:shadow-xl hover:-translate-y-2 transition"
      >
        <div className="text-5xl mb-6">📚</div>

        <h3 className="text-2xl font-bold mb-3">
          Commentaries
        </h3>

        <p className="text-gray-600 leading-7">
          Comprehensive legal commentaries by experienced authors.
        </p>

      </Link>

      <Link
        href="/categories/judicial-service"
        className="bg-white rounded-2xl p-8 border hover:shadow-xl hover:-translate-y-2 transition"
      >
        <div className="text-5xl mb-6">👨🏻‍⚖️</div>

        <h3 className="text-2xl font-bold mb-3">
          Judicial Service
        </h3>

        <p className="text-gray-600 leading-7">
          Preparation material for Judicial Service Examinations.
        </p>

      </Link>

      <Link
        href="/categories/aibe"
        className="bg-white rounded-2xl p-8 border hover:shadow-xl hover:-translate-y-2 transition"
      >
        <div className="text-5xl mb-6">🎓</div>

        <h3 className="text-2xl font-bold mb-3">
          AIBE
        </h3>

        <p className="text-gray-600 leading-7">
          Bare Acts, guides and study material for the All India Bar Examination.
        </p>

      </Link>

    </div>

  </div>

</section>

      {/* Featured Publications */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-4">
  Featured Publications
</h2>

          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
  Explore our most trusted legal publications used by advocates,
  judicial aspirants, law students and legal professionals across India.
</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

  {featuredBooks.map(([slug, book]) => (

    <RelatedBookCard
  key={slug}
  slug={slug}
  book={book}
/>
  ))}

</div>

<div className="text-center mt-14">

  <Link
    href="/publications"
    className="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition"
  >
    View Complete Catalogue
  </Link>

</div>

</div>
</section>

<section className="bg-white py-20">
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-4">
  New Arrivals
</h2>

    <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
      Explore the latest additions to our legal publication catalogue.
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

      {newArrivalBooks.map(([slug, book]) => (

  <RelatedBookCard
    key={slug}
    slug={slug}
    book={book}
  />

))}

    </div>

    <div className="text-center mt-14">

  <Link
    href="/publications?category=New%20Arrivals"
    className="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition"
  >
    View All New Arrivals
  </Link>

</div>

  </div>
</section>

{/* Why Trust ALP */}

<section className="py-24 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <p className="uppercase tracking-[0.35em] text-amber-700 font-bold mb-4">
        Why Choose Us
      </p>

      <h2 className="text-5xl font-bold">
        Why Thousands Trust
        <span className="text-amber-700"> Allahabad Law Publications</span>
      </h2>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      <div className="bg-gray-50 rounded-2xl p-8 border">
        <div className="text-4xl mb-5">🏛️</div>
        <h3 className="text-2xl font-bold mb-3">
          Since 1959
        </h3>
        <p className="text-gray-600">
          More than six decades of legal publishing excellence.
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 border">
        <div className="text-4xl mb-5">📖</div>
        <h3 className="text-2xl font-bold mb-3">
          1000+ Publications
        </h3>
        <p className="text-gray-600">
          One of India's largest collections of legal books.
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 border">
        <div className="text-4xl mb-5">⚖️</div>
        <h3 className="text-2xl font-bold mb-3">
          Latest Amendments
        </h3>
        <p className="text-gray-600">
          Publications updated with the latest legislative developments.
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 border">
        <div className="text-4xl mb-5">🌐</div>
        <h3 className="text-2xl font-bold mb-3">
          Diglot Editions
        </h3>
        <p className="text-gray-600">
          English and Hindi editions prepared for wider accessibility.
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 border">
        <div className="text-4xl mb-5">🎓</div>
        <h3 className="text-2xl font-bold mb-3">
          Competitive Exams
        </h3>
        <p className="text-gray-600">
          Trusted preparation material for Judicial Service and AIBE.
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 border">
        <div className="text-4xl mb-5">🤝</div>
        <h3 className="text-2xl font-bold mb-3">
          Trusted Nationwide
        </h3>
        <p className="text-gray-600">
          Used by advocates, judges, universities and law libraries across India.
        </p>
      </div>

    </div>

  </div>

</section>
    </main>
  );
}