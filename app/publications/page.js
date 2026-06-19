export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center mb-4">
          Publications
        </h1>
        <div className="max-w-xl mx-auto mb-8">
  <input
    type="text"
    placeholder="Search publications..."
    className="w-full border rounded-xl p-4 shadow-sm"
  />
</div>

        <p className="text-center text-gray-600 mb-12">
          Browse our collection of trusted legal publications.
        </p>
<section className="mb-16">

  <h2 className="text-3xl font-bold text-center mb-8">
    Browse by Category
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <a
  href="/categories/bare-acts"
  className="bg-white p-6 rounded-xl shadow-sm border text-center font-semibold block hover:shadow-md"
>
  Bare Acts
</a>

<a
  href="/categories/commentaries"
  className="bg-white p-6 rounded-xl shadow-sm border text-center font-semibold block hover:shadow-md"
>
  Commentaries
</a>

<a
  href="/categories/aibe"
  className="bg-white p-6 rounded-xl shadow-sm border text-center font-semibold block hover:shadow-md"
>
  AIBE
</a>

<a
  href="/categories/judicial-service"
  className="bg-white p-6 rounded-xl shadow-sm border text-center font-semibold block hover:shadow-md"
>
  Judicial Service
</a>

<a
  href="/categories/llb-textbooks"
  className="bg-white p-6 rounded-xl shadow-sm border text-center font-semibold block hover:shadow-md"
>
  LL.B. Textbooks
</a>

<a
  href="/categories/labour-laws"
  className="bg-white p-6 rounded-xl shadow-sm border text-center font-semibold block hover:shadow-md"
>
  Labour Laws
</a>

<a
  href="/categories/criminal-laws"
  className="bg-white p-6 rounded-xl shadow-sm border text-center font-semibold block hover:shadow-md"
>
  Criminal Laws
</a>
  
<a
  href="/categories/civil-laws"
  className="bg-white p-6 rounded-xl shadow-sm border text-center font-semibold block hover:shadow-md"
>
  Civil Laws
</a>

<a
  href="/categories/new-arrivals"
  className="bg-white p-6 rounded-xl shadow-sm border text-center font-semibold block hover:shadow-md"
>
  New Arrivals
</a>

  </div>

</section>
        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-xl shadow-sm border">

  <div className="bg-gray-200 h-56 rounded-lg mb-4 flex items-center justify-center">
    Book Cover
  </div>

  <h2 className="text-xl font-bold mb-3">
    Constitution of India
  </h2>

  <p className="text-gray-600 mb-2">
    Diglot Edition (English & Hindi)
  </p>

  <p className="text-gray-500 mb-2">
    MRP: ₹650
  </p>

  <p className="font-bold text-amber-700 mb-4">
    Sale Price: ₹325
  </p>

  <a
  href="/books/constitution-of-india"
  className="block w-full bg-amber-700 text-white py-2 rounded-lg text-center"
>
  View Details
</a>

</div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">

  <div className="bg-gray-200 h-56 rounded-lg mb-4 flex items-center justify-center">
    Book Cover
  </div>

  <h2 className="text-xl font-bold mb-3">
    Bharatiya Nyaya Sanhita
  </h2>

  <p className="text-gray-600 mb-2">
    Diglot Edition (English & Hindi)
  </p>

  <p className="text-gray-500 mb-2">
    MRP: ₹400
  </p>

  <p className="font-bold text-amber-700 mb-4">
    Sale Price: ₹200
  </p>

  <button className="w-full bg-amber-700 text-white py-2 rounded-lg">
    View Details
  </button>

</div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">

  <div className="bg-gray-200 h-56 rounded-lg mb-4 flex items-center justify-center">
    Book Cover
  </div>

  <h2 className="text-xl font-bold mb-3">
    Bharatiya Nagarik Suraksha Sanhita
  </h2>

  <p className="text-gray-600 mb-2">
    5th Edition • Approx. 950 Pages
  </p>

  <p className="text-gray-500 mb-2">
    MRP: ₹800
  </p>

  <p className="font-bold text-amber-700 mb-2">
    Sale Price: ₹400
  </p>

  <p className="text-green-600 mb-4">
    In Stock (100 Available)
  </p>

  <button className="w-full bg-amber-700 text-white py-2 rounded-lg">
    View Details
  </button>

</div>

        </div>

      </div>
    </main>
  );
}