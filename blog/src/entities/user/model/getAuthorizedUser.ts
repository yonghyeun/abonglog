import { createServerSupabase } from "@/shared/model";

export const getAuthorizedUser = async () => {
  const supabase = await createServerSupabase();
  return supabase.auth.getUser();
};
