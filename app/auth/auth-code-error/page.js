
import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-red-700 mb-4">
          Email Verification Failed
        </h1>

        <p className="text-gray-600 mb-6">
          Your email verification link may have expired or already been used.
          Please try registering again or request a new verification email.
        </p>

        <Link
          href="/"
          className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
