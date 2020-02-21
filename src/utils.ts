import gridDistance from "./gridDistance";

import { Data, SearchType, ResultType, Munro } from "./types";

export const getResults = (
  data: Data,
  searchType: SearchType,
  search: string
) =>
  search.length > 2
    ? data[searchType].filter(({ name }: { name: string }) =>
        name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

export const getResultsWithinRange = (
  data: Data,
  searchType: SearchType,
  selected: ResultType,
  distance: number
) =>
  data[searchType === "bothies" ? "munros" : "bothies"].filter(
    ({ grid }: any) => parseInt(gridDistance(selected.grid, grid)) <= distance
  );

export const isMunro = (tbd: ResultType): boolean => {
  if ((tbd as Munro).height) {
    return true;
  }
  return false;
};
