import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../config";
import { Database } from "./database.types";
import { createBrowserClient } from "@supabase/ssr";

export const createBrowserSupabase = () => {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
};
