import Image from "next/image";
export default function Home() {
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

         <div className="grid md:grid-cols-3 gap-8">

  <div className="bg-white p-8 rounded-xl shadow-sm border">
    <h3 className="text-xl font-bold mb-3">
      Constitution of India
    </h3>

    <p className="text-gray-600 mb-2">
      Diglot Edition (English & Hindi)
    </p>

    <p className="text-gray-600 mb-2">
      MRP: ₹650
    </p>

    <p className="text-amber-700 font-bold text-lg">
      Sale Price: ₹325
    </p>

    <p className="text-green-600 mt-3">
      In Stock
    </p>
  </div>

  <div className="bg-white p-8 rounded-xl shadow-sm border">
    <h3 className="text-xl font-bold mb-3">
      Bharatiya Nyaya Sanhita
    </h3>

    <p className="text-gray-600 mb-2">
      Diglot Edition (English & Hindi)
    </p>

    <p className="text-gray-600 mb-2">
      MRP: ₹400
    </p>

    <p className="text-amber-700 font-bold text-lg">
      Sale Price: ₹200
    </p>

    <p className="text-green-600 mt-3">
      In Stock
    </p>
  </div>

  <div className="bg-white p-8 rounded-xl shadow-sm border">
    <h3 className="text-xl font-bold mb-3">
      Bharatiya Nagarik Suraksha Sanhita
    </h3>

    <p className="text-gray-600 mb-2">
      Author: R.K. Narula
    </p>

    <p className="text-gray-600 mb-2">
      5th Edition • Approx. 950 Pages
    </p>

    <p className="text-gray-600 mb-2">
      MRP: ₹800
    </p>

    <p className="text-amber-700 font-bold text-lg">
      Sale Price: ₹400
    </p>

    <p className="text-green-600 mt-3">
      In Stock (100 Available)
    </p>
  </div>

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