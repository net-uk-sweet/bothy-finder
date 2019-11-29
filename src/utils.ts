import gridDistance from "./gridDistance";

import { Data, SearchType, ResultType } from "./types";

export const getResults = (
  data: Data,
  searchType: SearchType,
  search: string
) =>
  search.length > 2
    ? data[searchType].filter((el: any) =>
        el.name.toLowerCase().includes(search)
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

//export const getSelected = (results: ResultType[], )
