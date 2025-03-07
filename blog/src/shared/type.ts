export type NonOptional<T extends object> = {
  [K in keyof Required<T>]: Exclude<T[K], undefined>;
};
