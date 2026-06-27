import Link from "next/link";

export const metadata = {
  title: "About Us | Allahabad Law Publications",
  description:
    "Learn about Allahabad Law Publications, a trusted legal publisher serving the legal fraternity since 1959.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}

      <section className="bg-gradient-to-b from-amber-50 via-white to-white py-24">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <p className="uppercase tracking-[0.35em] text-amber-700 font-bold mb-4">
            Since 1959
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            About Allahabad Law Publications
          </h1>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            For more than six decades, Allahabad Law Publications has been
            dedicated to publishing reliable, authentic and practical legal
            books for advocates, judges, judicial aspirants, law students,
            universities and legal professionals throughout India.
          </p>

        </div>

      </section>

      {/* Company Story */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-4xl font-bold mb-6">
              Our Story
            </h2>

            <p className="text-gray-700 leading-8 mb-6">
              Established in 1959, Allahabad Law Publications has built its
              reputation by publishing dependable legal literature trusted by
              generations of legal professionals.
            </p>

            <p className="text-gray-700 leading-8 mb-6">
              Our publications are designed to present the law accurately,
              clearly and systematically so that legal knowledge remains
              accessible to students, practitioners and institutions alike.
            </p>

            <p className="text-gray-700 leading-8">
              Today, we continue this tradition while embracing modern
              publishing methods to make legal knowledge more accessible across
              India.
            </p>

          </div>

          <div className="bg-amber-50 rounded-3xl p-12">

            <h3 className="text-3xl font-bold mb-8 text-amber-700">
              Company Highlights
            </h3>

            <div className="space-y-6">

              <div>
                <p className="text-gray-500">Established</p>
                <p className="text-3xl font-bold">1959</p>
              </div>

              <div>
                <p className="text-gray-500">Founder</p>
                <p className="text-2xl font-semibold">
                  Raj Kishore Narula
                </p>
              </div>

              <div>
                <p className="text-gray-500">Publications</p>
                <p className="text-2xl font-semibold">
                  1000+ Legal Titles
                </p>
              </div>

              <div>
                <p className="text-gray-500">Coverage</p>
                <p className="text-2xl font-semibold">
                  All India
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Mission */}

      <section className="bg-gray-50 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Our Mission
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl shadow-sm border p-8">

              <h3 className="text-2xl font-bold mb-4">
                Accuracy
              </h3>

              <p className="text-gray-600 leading-7">
                Every publication is prepared with a strong commitment to
                authenticity and legal accuracy.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-8">

              <h3 className="text-2xl font-bold mb-4">
                Accessibility
              </h3>

              <p className="text-gray-600 leading-7">
                We strive to present legal knowledge in a practical and
                reader-friendly manner.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-8">

              <h3 className="text-2xl font-bold mb-4">
                Excellence
              </h3>

              <p className="text-gray-600 leading-7">
                Continuous improvement has remained the foundation of our
                publishing philosophy since 1959.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Publication Categories */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            What We Publish
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              "Bare Acts",
              "Commentaries",
              "Judicial Service",
              "AIBE",
              "LL.B. Textbooks",
              "Labour Laws",
              "Civil Laws",
              "Criminal Laws",
            ].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl border shadow-sm p-8 text-center hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg">
                  {item}
                </h3>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Call to Action */}

      <section className="bg-amber-700 text-white py-20">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold mb-6">
            Explore Our Legal Publications
          </h2>

          <p className="text-xl opacity-90 mb-10">
            Browse our catalogue of authoritative legal books trusted by the
            legal community across India.
          </p>

          <Link
            href="/publications"
            className="inline-block bg-white text-amber-700 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            Browse Publications
          </Link>

        </div>

      </section>

    </main>
  );
}