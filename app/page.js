import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
     <header className="bg-white border-b shadow-sm sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <img
  src="/logo.png"
  alt="Allahabad Law Publications Logo"
  className="w-32 h-32 mx-auto"
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
      <a href="#">Home</a>
      <a href="#">Publications</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
      <a href="#">Login</a>
    </nav>
  </div>
</header>
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

          <p className="text-center text-gray-600 mb-16">
            Some of our most popular legal publications.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h3 className="text-xl font-bold mb-3">
                Constitution of India
              </h3>

              <p className="text-gray-600 mb-4">
                Diglot Edition (English & Hindi)
              </p>

              <p className="text-amber-700 font-bold">
                ₹325
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h3 className="text-xl font-bold mb-3">
                Bharatiya Nyaya Sanhita
              </h3>

              <p className="text-gray-600 mb-4">
                Diglot Edition (English & Hindi)
              </p>

              <p className="text-amber-700 font-bold">
                ₹200
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h3 className="text-xl font-bold mb-3">
                Bharatiya Nagarik Suraksha Sanhita
              </h3>

              <p className="text-gray-600 mb-4">
                Diglot Edition (English & Hindi)
              </p>

              <p className="text-amber-700 font-bold">
                ₹400
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Allahabad Law Publications
          </h3>

          <p className="text-gray-300">
            166-B Allenganj, Prayagraj, Uttar Pradesh - 211002
          </p>

          <p className="text-gray-400 mt-4">
            Trusted Legal Knowledge Since 1959
          </p>
        </div>
      </footer>
    </main>
  );
}