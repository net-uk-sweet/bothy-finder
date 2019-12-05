import React from "react";

import { SearchType } from "./types";

interface FormProps {
  searchType: SearchType;
  search: string;
  distance: number;
  onSearchTypeChange: (searchType: SearchType) => void;
  onSearchChange: (search: string) => void;
  onDistanceChange: (distance: number) => void;
}

export default function Form({
  searchType,
  search,
  distance,
  onSearchTypeChange,
  onSearchChange,
  onDistanceChange
}: FormProps) {
  const handleChange = (callback: (value: any) => void) => (e: any) => {
    callback(e.currentTarget.value);
  };
  const isBothySearch = searchType === "bothies";

  return (
    <form onSubmit={(e: any) => e.preventDefault()}>
      <fieldset>
        <p>Find</p>
        <label className={isBothySearch ? "show" : "hide"}>
          Munros
          <input
            type="radio"
            value="bothies"
            checked={searchType === "bothies"}
            onChange={handleChange(onSearchTypeChange)}
          />
        </label>
        <label className={!isBothySearch ? "show" : "hide"}>
          Bothies
          <input
            type="radio"
            value="munros"
            checked={searchType === "munros"}
            onChange={handleChange(onSearchTypeChange)}
          />
        </label>
      </fieldset>
      <div>
        <label htmlFor="distance">within {distance}km</label>
        <input
          type="range"
          id="distance"
          name="distance"
          min="5"
          max="50"
          value={distance}
          step="5"
          onChange={handleChange(onDistanceChange)}
        />
      </div>
      <div>
        <label htmlFor="search">of</label>
        <input
          id="search"
          value={search}
          onChange={handleChange(onSearchChange)}
        />
        <label htmlFor="search">{isBothySearch ? `bothy` : `munro`}</label>
      </div>
    </form>
  );
}
