import { SUPABASE_STORAGE_URL } from "../config";

export const attachIamgeUrl = <T extends { fullPath: string }>(
  response: T
): T & { imageUrl: string } => {
  return {
    ...response,
    imageUrl: `${SUPABASE_STORAGE_URL}/${response.fullPath}`
  };
};
