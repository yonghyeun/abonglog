import { when } from "@fxts/core";

type FirstLetterCapitalize<T extends string> = T["length"] extends 0
  ? T
  : T extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : never;

export const capitalizeFirstLetter = <T extends string>(
  str: T
): FirstLetterCapitalize<T> => {
  return when(
    (str) => str.length > 0,
    () => str[0].toUpperCase() + str.slice(1),
    str
  ) as FirstLetterCapitalize<T>;
};
