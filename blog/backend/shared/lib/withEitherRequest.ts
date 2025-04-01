import * as E from "@fp/either";

type SupabaseResponse<T, Error> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };

export const withEitherRequest =
  <T, Error, Arguments extends unknown[]>(
    request: (...args: Arguments) => Promise<SupabaseResponse<T, Error>>
  ) =>
  async (...args: Arguments) => {
    const { data, error } = await request(...args);

    return data ? E.right(data) : E.left(error as NonNullable<Error>);
  };
