import { DehydratedState } from "@tanstack/react-query";

type MergeDehydrateState = (
  ...dehydrateSateArray: DehydratedState[]
) => DehydratedState;

export const mergeDehydrateState: MergeDehydrateState = (
  ...dehydrateSateArray
) => {
  return dehydrateSateArray.reduce((acc, dehydrateState) => {
    return {
      queries: [...acc.queries, ...dehydrateState.queries],
      mutations: [...acc.mutations, ...dehydrateState.mutations]
    };
  });
};
