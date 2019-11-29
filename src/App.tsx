import React, { useState } from "react";
import "./App.css";

import { SearchType, ResultType } from "./types";

import bothies from "./bothies.json";
import munros from "./munros.json";

import gridDistance from "./gridDistance";

import Form from "./Form";
import List from "./List";
import Map from "./Map";

const App: React.FC = () => {
  const data: any = {
    bothies,
    munros
  };

  const [searchType, setSearchType] = useState<SearchType>("bothies");
  const [search, setSearch] = useState<string>("");
  const [distance, setDistance] = useState<number>(10);
  const [selected, setSelected] = useState<ResultType | null>(null);
  const [results, setResults] = useState<ResultType[]>([]);

  const handleSearchTypeChange = (searchType: SearchType) => {
    setSearchType(searchType);
    setSearch("");
    setSelected(null);
    setResults([]);
  };

  const handleSearchChange = (search: string) => {
    const results: ResultType[] =
      search.length > 2
        ? data[searchType].filter((el: any) =>
            el.name.toLowerCase().includes(search)
          )
        : [];

    setResults(results);
    setSearch(search);
  };

  const handleDistanceChange = (distance: number) => {
    setDistance(distance);
  };

  const handleItemClick = (item: ResultType) => {
    const selected: ResultType = results.find(
      result => result.name === item.name
    ) as ResultType;
    const filteredResults = data[
      searchType === "bothies" ? "munros" : "bothies"
    ].filter(
      ({ grid }: any) => parseInt(gridDistance(selected.grid, grid)) <= distance
    );

    setSelected(selected);
    setResults(filteredResults);
  };

  return (
    <main>
      <div className="form">
        <Form
          searchType={searchType}
          search={search}
          distance={distance}
          onSearchTypeChange={handleSearchTypeChange}
          onSearchChange={handleSearchChange}
          onDistanceChange={handleDistanceChange}
        />
      </div>
      <div className="map">
        <Map
          lat={57.09638090114919}
          lng={-4.298098692290864}
          zoom={6.75}
          locations={results}
          selected={selected}
        />
      </div>
      <aside className="list">
        <List items={results} onItemClick={handleItemClick} />
      </aside>
    </main>
  );
};

export default App;
