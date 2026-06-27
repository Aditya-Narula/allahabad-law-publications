import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <div className="text-center max-w-2xl">

        <h1 className="text-8xl font-extrabold text-amber-700 mb-6">
          404
        </h1>

        <h2 className="text-4xl font-bold mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 text-lg mb-10">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Link
            href="/"
            className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-amber-700 transition"
          >
            Return Home
          </Link>

          <Link
            href="/publications"
            className="border border-gray-300 px-8 py-4 rounded-xl hover:bg-white transition"
          >
            Browse Publications
          </Link>

        </div>

      </div>

    </main>
  );
}