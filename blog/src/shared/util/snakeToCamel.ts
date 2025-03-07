type CamelCase<S extends string> =
  S extends `${infer P}_${infer C}${infer Rest}`
    ? `${Lowercase<P>}${Uppercase<C>}${CamelCase<Rest>}`
    : S;

export type SnakeToCamel<T> =
  T extends Array<infer U>
    ? Array<SnakeToCamel<U>>
    : T extends object
      ? {
          [K in keyof T as K extends string
            ? CamelCase<K>
            : never]: SnakeToCamel<T[K]>;
        }
      : T;

export const snakeToCamel = <T>(arg: T): SnakeToCamel<T> => {
  if (Array.isArray(arg)) {
    return arg.map((item) => snakeToCamel(item)) as unknown as SnakeToCamel<T>;
  }

  if (typeof arg === "object" && arg !== null) {
    return Object.entries(arg).reduce((data, [key, value]) => {
      const snakeKey = key.replace(/_(.)/g, (_, char) => char.toUpperCase());
      return {
        ...data,
        [snakeKey]: snakeToCamel(value)
      };
    }, {} as SnakeToCamel<T>);
  }

  return arg as unknown as SnakeToCamel<T>;
};
