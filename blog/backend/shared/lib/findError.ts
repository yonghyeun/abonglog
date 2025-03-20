type SupabaseError = { message: string };
type MaybeErrorResponse = { error: SupabaseError | null } | null;

type FindError = (responses: MaybeErrorResponse[]) => SupabaseError | null;

export const findError: FindError = (responses) => {
  const foundResponse = responses
    .filter((response) => !!response)
    .find(({ error }) => !!error);
  return foundResponse ? foundResponse.error : null;
};
