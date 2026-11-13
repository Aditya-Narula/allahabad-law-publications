
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddressManager from "./AddressManager";

export const dynamic = "force-dynamic";

export default async function AddressesPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return <AddressManager userId={user.id} />;
}
