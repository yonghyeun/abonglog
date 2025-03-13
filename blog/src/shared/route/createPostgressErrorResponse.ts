import type { PostgrestResponseFailure } from "@supabase/postgrest-js";

export const createPostgressErrorResponse = ({
  error,
  status,
  statusText
}: PostgrestResponseFailure) => {
  const body = { code: error.code, messagee: error.message };
  const init = { status, statusText };

  return [body, init] as const;
};
