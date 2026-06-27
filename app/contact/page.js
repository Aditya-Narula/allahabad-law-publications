import Link from "next/link";

export const metadata = {
  title: "Contact Us | Allahabad Law Publications",
  description:
    "Get in touch with Allahabad Law Publications for legal books, Bare Acts, Commentaries and academic publications.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-b from-amber-50 via-white to-white py-24">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <p className="uppercase tracking-[0.35em] text-amber-700 font-bold mb-4">
            Contact Us
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            We'd Love to Hear From You
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're an advocate, law student, institution or bookseller,
            we're here to help.
          </p>

        </div>

      </section>

      {/* Contact Information */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">

          {/* Left */}

          <div className="bg-white rounded-3xl shadow-sm border p-10">

            <h2 className="text-3xl font-bold mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">

              <div>

                <h3 className="font-semibold text-lg mb-2">
                  📍 Address
                </h3>

                <p className="text-gray-600 leading-7">
                  Allahabad Law Publications
                  <br />
                  Prayagraj
                  <br />
                  Uttar Pradesh
                  <br />
                  India
                </p>

              </div>

              <div>

                <h3 className="font-semibold text-lg mb-2">
                  ☎ Phone
                </h3>

                <p className="text-gray-600">
                  +91-9235650006
                </p>

              </div>

              <div>

                <h3 className="font-semibold text-lg mb-2">
                  📧 Email
                </h3>

                <p className="text-gray-600">
                  info@allahabadlawpublications.com
                </p>

              </div>

              <div>

                <h3 className="font-semibold text-lg mb-2">
                  🕒 Business Hours
                </h3>

                <p className="text-gray-600">
                  Monday – Saturday
                  <br />
                  10:00 AM – 7:00 PM
                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="bg-white rounded-3xl shadow-sm border p-10">

            <h2 className="text-3xl font-bold mb-8">
              Quick Contact
            </h2>

            <div className="space-y-5">

              <Link
                href="https://wa.me/919235650006"
                target="_blank"
                className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-xl font-semibold transition"
              >
                Chat on WhatsApp
              </Link>

              <Link
                href="tel:+919235650006"
                className="block w-full bg-gray-900 hover:bg-black text-white text-center py-4 rounded-xl font-semibold transition"
              >
                Call Us
              </Link>

              <Link
                href="mailto:info@allahabadlawpublications.com"
                className="block w-full bg-amber-700 hover:bg-amber-800 text-white text-center py-4 rounded-xl font-semibold transition"
              >
                Send Email
              </Link>

            </div>

            <hr className="my-10" />

            <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center text-gray-500 text-center px-8">

              Google Map
              <br />
              (Embed after launch)

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}