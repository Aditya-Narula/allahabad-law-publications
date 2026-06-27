"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import BookCard from "@/app/components/BookCard";
import { books } from "@/app/data/books";

export default function PublicationsPage() {
  const [query, setQuery] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [sortBy, setSortBy] = useState("A-Z");

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
  setCurrentPage(1);
}, [query, categoryFilter, sortBy]);

  const bareActsCount = Object.values(books).filter(
  (book) => book.category === "Bare Acts"
).length;

const commentariesCount = Object.values(books).filter(
  (book) => book.category === "Commentaries"
).length;

const aibeCount = Object.values(books).filter(
  (book) => book.category === "AIBE"
).length;

const judicialCount = Object.values(books).filter(
  (book) => book.category === "Judicial Service"
).length;

const llbCount = Object.values(books).filter(
  (book) => book.category === "LL.B. Textbooks"
).length;

const labourCount = Object.values(books).filter(
  (book) => book.category === "Labour Laws"
).length;

const criminalCount = Object.values(books).filter(
  (book) => book.category === "Criminal Laws"
).length;

const civilCount = Object.values(books).filter(
  (book) => book.category === "Civil Laws"
).length;

const newArrivalsCount = Object.values(books).filter(
  (book) => book.newArrival === true
).length;

const filteredBooks = Object.entries(books)

  .filter(([, book]) => {

    if (categoryFilter === "All") {
      return true;
    }

    if (categoryFilter === "New Arrivals") {
      return book.newArrival === true;
    }

    return book.category === categoryFilter;

  })

  .filter(([, book]) => {

    const searchText = query.toLowerCase();

    return (

      book.englishTitle?.toLowerCase().includes(searchText) ||

      book.hindiTitle?.toLowerCase().includes(searchText) ||

      book.subject?.toLowerCase().includes(searchText) ||

      book.keywords?.toLowerCase().includes(searchText)

    );

  })

  .sort(([, a], [, b]) => {

    switch (sortBy) {

      case "Z-A":
        return b.englishTitle.localeCompare(a.englishTitle);

      case "PriceLow":
        return a.salePrice - b.salePrice;

      case "PriceHigh":
        return b.salePrice - a.salePrice;

      default:
        return a.englishTitle.localeCompare(b.englishTitle);

    }

  });

  const booksPerPage = 12;

const totalPages = Math.ceil(
  filteredBooks.length / booksPerPage
);

const paginatedBooks = filteredBooks.slice(
  (currentPage - 1) * booksPerPage,
  currentPage * booksPerPage
);

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-12">

  <p className="uppercase tracking-[0.35em] text-amber-700 font-bold mb-3">
    Catalogue
  </p>

  <h1 className="text-5xl md:text-6xl font-bold mb-5">
    Explore Our Publications
  </h1>

  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
    Browse our collection of Bare Acts,
    Commentaries, Judicial Service,
    AIBE publications and legal reference books.
  </p>

</div>
        <div className="max-w-xl mx-auto mb-8">
  <input
  type="text"
  placeholder="Search publications..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  className="w-full rounded-2xl border border-gray-300 bg-white hover:bg-amber-50 px-5 py-4 text-lg shadow-sm focus:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-200"
/>
</div>

<div className="flex flex-col md:flex-row gap-4 justify-center mb-8">

  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="border rounded-xl p-4 shadow-sm"
  >

    <option value="All">All Categories</option>
    <option value="Bare Acts">Bare Acts</option>
    <option value="Commentaries">Commentaries</option>
    <option value="AIBE">AIBE</option>
    <option value="Judicial Service">Judicial Service</option>
    <option value="LL.B. Textbooks">LL.B. Textbooks</option>
    <option value="Labour Laws">Labour Laws</option>
    <option value="Criminal Laws">Criminal Laws</option>
    <option value="Civil Laws">Civil Laws</option>
    <option value="New Arrivals">New Arrivals</option>

  </select>

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="border rounded-xl p-4 shadow-sm"
  >

    <option value="A-Z">Sort: A-Z</option>
    <option value="Z-A">Sort: Z-A</option>
    <option value="PriceLow">Price: Low to High</option>
    <option value="PriceHigh">Price: High to Low</option>

  </select>

</div>

<p className="text-center text-lg text-gray-600 font-medium mb-8">
  Showing {filteredBooks.length} {filteredBooks.length === 1 ? "Book" : "Books"}
</p>

        <div className="text-center mb-12">

  <p className="uppercase tracking-[0.35em] text-amber-700 font-bold mb-3">
    Catalogue
  </p>

  <h1 className="text-5xl md:text-6xl font-bold mb-5">
    Explore Our Publications
  </h1>

  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
    Browse our collection of Bare Acts,
    Commentaries, Judicial Service,
    AIBE publications and legal reference books.
  </p>

</div>
<section className="mb-16">

  <h2 className="text-3xl font-bold text-center mb-8">
    Browse by Category
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <Link
  href="/categories/bare-acts"
  className="group bg-white hover:bg-amber-50 rounded-2xl border border-gray-200 p-8 text-center block shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-amber-500"
>
  <h3 className="font-bold text-xl">
    Bare Acts
  </h3>

  <p className="text-gray-500 mt-1 text-sm">
    {bareActsCount} Books
  </p>
</Link>

<Link
  href="/categories/commentaries"
  className="group bg-white hover:bg-amber-50 rounded-2xl border border-gray-200 p-8 text-center block shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-amber-500"
>
  <h3 className="font-bold text-xl">
  Commentaries
</h3>

<p className="text-gray-500 mt-1 text-sm">
  {commentariesCount} Books
</p>
</Link>

<Link
  href="/categories/aibe"
  className="group bg-white hover:bg-amber-50 rounded-2xl border border-gray-200 p-8 text-center block shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-amber-500"
>
  <h3 className="font-bold text-xl">
  AIBE
</h3>

<p className="text-gray-500 mt-1 text-sm">
  {aibeCount} Books
</p>
</Link>

<Link
  href="/categories/judicial-service"
  className="group bg-white hover:bg-amber-50 rounded-2xl border border-gray-200 p-8 text-center block shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-amber-500"
>
  <h3 className="font-bold text-xl">
  Judicial Service
</h3>

<p className="text-gray-500 mt-1 text-sm">
  {judicialCount} Books
</p>
</Link>

<Link
  href="/categories/llb-textbooks"
  className="group bg-white hover:bg-amber-50 rounded-2xl border border-gray-200 p-8 text-center block shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-amber-500"
>
  <h3 className="font-bold text-xl">
  LL.B. Textbooks
</h3>

<p className="text-gray-500 mt-1 text-sm">
  {llbCount} Books
</p>
</Link>

<Link
  href="/categories/labour-laws"
  className="group bg-white hover:bg-amber-50 rounded-2xl border border-gray-200 p-8 text-center block shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-amber-500"
>
  <h3 className="font-bold text-xl">
  Labour Laws
</h3>

<p className="text-gray-500 mt-1 text-sm">
  {labourCount} Books
</p>
</Link>

<Link
  href="/categories/criminal-laws"
  className="group bg-white hover:bg-amber-50 rounded-2xl border border-gray-200 p-8 text-center block shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-amber-500"
>
 <h3 className="font-bold text-xl">
  Criminal Laws
</h3>

<p className="text-gray-500 mt-1 text-sm">
  {criminalCount} Books
</p>
</Link>
  
<Link
  href="/categories/civil-laws"
  className="group bg-white hover:bg-amber-50 rounded-2xl border border-gray-200 p-8 text-center block shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-amber-500"
>
  <h3 className="font-bold text-xl">
  Civil Laws
</h3>

<p className="text-gray-500 mt-1 text-sm">
  {civilCount} Books
</p>
</Link>

<Link
  href="/categories/new-arrivals"
  className="group bg-white hover:bg-amber-50 rounded-2xl border border-gray-200 p-8 text-center block shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-amber-500"
>
  <h3 className="font-bold text-xl">
  New Arrivals
</h3>

<p className="text-gray-500 mt-1 text-sm">
  {newArrivalsCount} Books
</p>
</Link>

  </div>

</section>
        {filteredBooks.length === 0 ? (

  <div className="bg-white hover:bg-amber-50 rounded-xl shadow-sm border p-10 text-center">

    <h2 className="text-3xl font-bold mb-4 text-gray-800">
      No Books Found
    </h2>

    <p className="text-lg text-gray-500">
      Try a different search term or category.
    </p>

  </div>

) : (

  <>
  
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

      {paginatedBooks.map(([slug, book]) => (

        <BookCard
          key={slug}
          slug={slug}
          book={book}
        />

      ))}

    </div>

    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

      <button
        onClick={() =>
          setCurrentPage((p) => Math.max(1, p - 1))
        }
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-lg disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((page) => (

        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === page
              ? "bg-amber-700 text-white"
              : "bg-white hover:bg-amber-50"    }`}

        >
          {page}
        </button>

      ))}

      <button
        onClick={() =>
          setCurrentPage((p) =>
            Math.min(totalPages, p + 1)
          )
        }
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-lg disabled:opacity-50"
      >
        Next
      </button>

    </div>

  </>

)}

      </div>
    </main>
  );
}