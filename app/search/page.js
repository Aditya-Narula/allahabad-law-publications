"use client";
import BookCard from "@/app/components/BookCard";
import { useState } from "react";
import { books } from "@/app/data/books";

export default function SearchPage() {

  const [query, setQuery] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");

const [sortBy, setSortBy] = useState("A-Z");

  const results = Object.entries(books)

.filter(([, book]) => {

    if (categoryFilter === "All") return true;

    return book.category === categoryFilter;

})

.filter(([, book]) => {

    const search = query.toLowerCase();

    return (

        book.englishTitle?.toLowerCase().includes(search) ||

        book.hindiTitle?.toLowerCase().includes(search) ||

        book.subject?.toLowerCase().includes(search) ||

        book.author?.toLowerCase().includes(search) ||

        book.keywords?.toLowerCase().includes(search)

    );

})

.sort((a, b) => {

    if (sortBy === "A-Z")

        return a[1].englishTitle.localeCompare(b[1].englishTitle);

    if (sortBy === "Z-A")

        return b[1].englishTitle.localeCompare(a[1].englishTitle);

    if (sortBy === "PriceLow")

        return a[1].salePrice - b[1].salePrice;

    if (sortBy === "PriceHigh")

        return b[1].salePrice - a[1].salePrice;

    return 0;

});

  return (
    <main className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center mb-4">
          Search Books
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Search across the ALP catalogue
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-10">

<input
type="text"
placeholder="Search by title, author, subject..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
className="border rounded-xl p-4 shadow-sm"
/>

<select
value={categoryFilter}
onChange={(e)=>setCategoryFilter(e.target.value)}
className="border rounded-xl p-4 shadow-sm"
>

<option>All</option>
<option>Bare Acts</option>
<option>Commentaries</option>
<option>AIBE</option>
<option>Judicial Service</option>
<option>LL.B. Textbooks</option>
<option>Labour Laws</option>
<option>Civil Laws</option>
<option>Criminal Laws</option>

</select>

</div>

<div className="flex justify-end mb-8">

<select
value={sortBy}
onChange={(e)=>setSortBy(e.target.value)}
className="border rounded-xl p-3 shadow-sm"
>

<option value="A-Z">A-Z</option>

<option value="Z-A">Z-A</option>

<option value="PriceLow">
Price Low → High
</option>

<option value="PriceHigh">
Price High → Low
</option>

</select>

</div>

<p className="text-gray-600 mb-4">

  Search Results: {results.length}

</p>

{results.length === 0 ? (

  <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">

<h2 className="text-3xl font-bold mb-4">

No Publications Found

</h2>

<p className="text-gray-600">

Try another title, Act name, author or subject.

</p>

</div>

) : (

  <div className="grid md:grid-cols-3 gap-8">

{results.map(([slug,book])=>(

<BookCard

key={slug}

slug={slug}

book={book}

/>

))}

</div>
)}

      </div>

    </main>
  );
}