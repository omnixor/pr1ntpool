import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const key = (import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
  import.meta.env["VITE_SUPABASE_ANON_KEY"]) as string | undefined;

/** Null until the project's backend connection provides its URL and key. */
export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key, { auth: { persistSession: true } }) : null;

export type Role = "customer" | "shop";

export function roleOf(user: User | null | undefined): Role {
  return user?.user_metadata?.["role"] === "shop" ? "shop" : "customer";
}

export function homeFor(role: Role) {
  return role === "shop" ? "/shop" : "/dashboard";
}
