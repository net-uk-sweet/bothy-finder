import React, { useState } from "react";
import "./App.css";

import { Data, SearchType, ResultType } from "./types";

import bothies from "./bothies.json";
import munros from "./munros.json";

import Form from "./Form";
import List from "./List";
import Map from "./Map";

import { getResults, getResultsWithinRange } from "./utils";

const App: React.FC = () => {
  const data: Data = {
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
    if (selected) {
      setSelected(null);
    }
    const results: ResultType[] = getResults(data, searchType, search);

    setResults(results);
    setSearch(search);

    if (results.length === 1) {
      const autoSelected = results[0];
      setSelected(autoSelected);
      const resultsWithinRange = getResultsWithinRange(
        data,
        searchType,
        autoSelected,
        distance
      );
      setResults(resultsWithinRange);
    }
  };

  const handleDistanceChange = (distance: number) => {
    setDistance(distance);
    if (selected) {
      const resultsWithinRange = getResultsWithinRange(
        data,
        searchType,
        selected,
        distance
      );
      setResults(resultsWithinRange);
    }
  };

  const handleItemClick = (item: ResultType) => {
    const resultsWithinRange = getResultsWithinRange(
      data,
      searchType,
      item,
      distance
    );

    setSelected(item);
    setResults(resultsWithinRange);
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
