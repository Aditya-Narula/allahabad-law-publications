
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) {
        setHasSession(Boolean(data.user));
        setChecking(false);
      }
    }).catch(() => {
      if (active) setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (active) {
          setHasSession(Boolean(session));
        }
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function sendRecoveryEmail(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const supabase = createClient();

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo:
            `${window.location.origin}/auth/callback?next=/reset-password`,
        });

      if (resetError) {
        setError(resetError.message);
      } else {
        setMessage(
          "If an account exists for this email, a password reset link will be sent. Please check your inbox."
        );
      }
    } catch {
      setError("Unable to send the reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function updatePassword(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: updateError } =
        await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message);
      } else {
        setComplete(true);
        setPassword("");
        setConfirmPassword("");
        await supabase.auth.signOut();
        setMessage(
          "Your password has been updated. Please log in with your new password."
        );
      }
    } catch {
      setError("Unable to update your password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Reset Your Password
        </h1>

        <p className="text-gray-600 text-sm text-center mb-6">
          Allahabad Law Publications
        </p>

        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {message && (
          <p role="status" className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
            {message}
          </p>
        )}

        {checking ? (
          <p className="text-center text-gray-600">
            Checking your session...
          </p>
        ) : complete ? (
          <Link
            href="/login"
            className="block text-center rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white"
          >
            Go to Login
          </Link>
        ) : hasSession ? (
          <form onSubmit={updatePassword} className="space-y-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
            />

            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        ) : (
          <form onSubmit={sendRecoveryEmail} className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter your registered email address to receive a new password reset link.
            </p>

            <label
              htmlFor="reset-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm font-semibold text-blue-900 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
