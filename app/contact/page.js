export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center mb-4">
          Contact Us
        </h1>

        <p className="text-center text-gray-600 mb-12">
          We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white p-8 rounded-xl shadow-sm border">

            <h2 className="text-2xl font-bold mb-6">
              Contact Information
            </h2>

            <div className="space-y-4">

              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">
                  166-B Allenganj<br />
                  Prayagraj - 211002<br />
                  Uttar Pradesh, India
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">
                  alp.alld@gmail.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">
                  +91 9235650006
                </p>
              </div>

              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-gray-600">
                  +91 9235650006
                </p>
              </div>

            </div>

          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">

            <h2 className="text-2xl font-bold mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg p-3"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg p-3"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border rounded-lg p-3"
              ></textarea>

              <button
                type="submit"
                className="bg-amber-700 text-white px-6 py-3 rounded-lg"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </main>
  );
}