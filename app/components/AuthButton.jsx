
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthButton({ mobile = false, onClick }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function checkUser() {
      const { data, error: authError } = await supabase.auth.getUser();

      if (active) {
        setUser(authError ? null : data.user);
        setLoading(false);
      }
    }

    checkUser().catch(() => {
      if (active) setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (active) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    setError("");
    setSigningOut(true);

    try {
      const supabase = createClient();
      const { error: logoutError } = await supabase.auth.signOut();

      if (logoutError) {
        setError("Unable to log out. Please try again.");
        return;
      }

      setUser(null);
      onClick?.();
      router.replace("/");
      router.refresh();
    } catch {
      setError("Unable to log out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  }

  const baseClass = mobile
    ? "block w-full px-6 py-4 border-b text-left font-medium hover:bg-amber-50"
    : "px-4 py-2 rounded-xl hover:bg-amber-100";

  if (loading) {
    return (
      <span className={baseClass} aria-label="Checking account">
        Account...
      </span>
    );
  }

  return (
    <div>
      {user ? (
        <button
          type="button"
          onClick={handleLogout}
          disabled={signingOut}
          className={baseClass}
        >
          {signingOut ? "Logging out..." : "Logout"}
        </button>
      ) : (
        <Link
          href="/login"
          onClick={onClick}
          className={baseClass}
        >
          Login
        </Link>
      )}

      {error && (
        <p role="alert" className="text-xs text-red-700 px-2">
          {error}
        </p>
      )}
    </div>
  );
}
