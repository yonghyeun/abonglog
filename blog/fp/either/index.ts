interface Left<T> {
  readonly value: T;
  readonly _tag: "left";
}

interface Right<T> {
  readonly value: T;
  readonly _tag: "right";
}

export type Either<L, R> = Left<L> | Right<R>;

export const left = <T>(value: T): Left<T> => ({
  value,
  _tag: "left"
});

export const right = <T>(value: T): Right<T> => ({
  value,
  _tag: "right"
});

export const isLeft = <L, R>(either: Either<L, R>): either is Left<L> =>
  either._tag === "left";
export const isRight = <L, R>(either: Either<L, R>): either is Right<R> =>
  either._tag === "right";

export const fold =
  <L, R, T, K>(onLeft: (value: L) => T, onRight: (value: R) => K) =>
  (either: Either<L, R>) => {
    return isLeft(either) ? onLeft(either.value) : onRight(either.value);
  };

export const chain =
  <L, R, T, K>(onLeft: (value: L) => T, onRight: (value: R) => K) =>
  (either: Either<L, R>) => {
    return isLeft(either)
      ? left(onLeft(either.value))
      : right(onRight(either.value));
  };

export const map =
  <L, R, T>(onRight: (value: R) => T) =>
  (either: Either<L, R>) =>
    isRight(either) ? right(onRight(either.value)) : either;

export const flatMap =
  <L, R, T>(onRight: (value: R) => T) =>
  (either: Either<L, R>) =>
    isRight(either) ? onRight(either.value) : either;
