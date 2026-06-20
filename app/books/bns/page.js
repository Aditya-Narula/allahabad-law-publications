export default function BNSPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <p className="font-bold">Book Cover</p>
              <p className="text-gray-600">
                Image Coming Soon
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-2">
              The Bharatiya Nyaya Sanhita, 2023
            </h1>

            <h2 className="text-2xl text-gray-600 mb-6">
              भारतीय न्याय संहिता, 2023
            </h2>

            <p className="mb-2">
              <strong>Author / लेखक:</strong> R.K. Narula
            </p>

            <p className="mb-2">
              <strong>Edition / संस्करण:</strong> 2026 Edition
            </p>

            <p className="mb-2">
              <strong>Pages / पृष्ठ:</strong> 100
            </p>

            <p className="mb-2">
              <strong>Language / भाषा:</strong> English & Hindi
            </p>

            <p className="mb-2">
              <strong>MRP:</strong> ₹495
            </p>

            <p className="mb-2 text-orange-700 font-bold">
              Sale Price / विक्रय मूल्य: ₹248
            </p>

            <p className="text-green-600 font-semibold">
              In Stock (10 Available)
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}