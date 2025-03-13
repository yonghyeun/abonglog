import type { StorageError } from "@supabase/storage-js";

export const createStorageErrorResponse = (error: StorageError) => {
  const body = { code: 500, message: error.message };
  const init = { status: 500, statusText: error.message };

  return [body, init] as const;
};
