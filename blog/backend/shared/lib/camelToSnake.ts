// 카멜 케이스를 스네이크 케이스로 변환하는 타입 정의
type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${SnakeCase<U>}`
  : S;

type CamelToSnake<T> =
  T extends Array<infer U>
    ? Array<CamelToSnake<U>>
    : T extends object
      ? {
          [K in keyof T as K extends string
            ? SnakeCase<K>
            : never]: CamelToSnake<T[K]>;
        }
      : T;

export const camelToSnake = <T>(arg: T): CamelToSnake<T> => {
  if (Array.isArray(arg)) {
    return arg.map((item) => camelToSnake(item)) as CamelToSnake<T>;
  }

  if (arg !== null && typeof arg === "object") {
    return Object.entries(arg).reduce((data, [key, value]) => {
      // 카멜 케이스 키를 스네이크 케이스로 변환
      const snakeKey = key.replace(
        /([A-Z])/g,
        (match) => `_${match.toLowerCase()}`
      );

      return {
        ...data,
        [snakeKey]: camelToSnake(value)
      };
    }, {} as CamelToSnake<T>);
  }

  // 문자열 인자는 변환하지 않음 (객체의 키만 변환)
  return arg as CamelToSnake<T>;
};
