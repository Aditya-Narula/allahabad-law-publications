export default function ConstitutionBookPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-8 text-gray-600">
          <a href="/">Home</a> {" > "}
          <a href="/publications">Publications</a> {" > "}
          Constitution of India
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          <div>
            <div className="bg-gray-200 h-[500px] rounded-xl flex items-center justify-center text-xl font-semibold">
              Book Cover
            </div>
          </div>

          <div>

            <h1 className="text-4xl font-bold mb-4">
              Constitution of India
            </h1>

            <p className="text-gray-600 mb-6">
              By R.K. Narula
            </p>

            <div className="space-y-3 mb-8">

              <p>
                <strong>Edition:</strong> 10th Edition
              </p>

              <p>
                <strong>Language:</strong> Diglot (English & Hindi)
              </p>

              <p>
                <strong>Pages:</strong> Approx. 500
              </p>

              <p>
                <strong>MRP:</strong> ₹650
              </p>

              <p className="text-amber-700 text-2xl font-bold">
                Sale Price: ₹325
              </p>

              <p className="text-green-600">
                In Stock
              </p>

            </div>

            <div className="flex gap-4 flex-wrap">

              <a
                href="/publications"
                className="bg-gray-200 px-6 py-3 rounded-lg"
              >
                Back to Publications
              </a>

              <a
                href="https://wa.me/919235650006"
                target="_blank"
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
              >
                WhatsApp Enquiry
              </a>

            </div>

          </div>

        </div>

        <div className="bg-white p-10 rounded-xl shadow-sm border mt-16">

          <h2 className="text-3xl font-bold mb-6">
            About This Book
          </h2>

          <p className="text-gray-700 leading-8">
            The Constitution of India (Diglot Edition) is designed
            for advocates, law students, judicial service aspirants
            and legal professionals.
          </p>

        </div>

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-8">
            Related Publications
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-xl border">
              Bharatiya Nyaya Sanhita
            </div>

            <div className="bg-white p-6 rounded-xl border">
              Bharatiya Nagarik Suraksha Sanhita
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}