import gridDistance from "./gridDistance";

import { Data, SearchType, ResultType, Munro } from "./types";

export const sortAlphabetical = (a: ResultType, b: ResultType) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
};

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

export const formatGridReference = (grid: string) =>
  `${grid.slice(0, 2)} ${grid.slice(2, 5)} ${grid.slice(5, 8)}`;
