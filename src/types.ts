export type SearchType = "bothies" | "munros";

interface BaseResult {
  name: string;
  grid: string;
  url: string;
  lat: number;
  lng: number;
}

export interface Munro extends BaseResult {
  height: number;
}

export interface Bothy extends BaseResult {}

export type ResultType = Munro | Bothy;

export interface Data {
  bothies: ResultType[];
  munros: ResultType[];
}
