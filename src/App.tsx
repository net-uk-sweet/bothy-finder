import React, { useReducer } from "react";
import "./App.css";

import { Data, SearchType, ResultType } from "./types";

import bothies from "./bothies.json";
import munros from "./munros.json";

import Form from "./Form";
import List from "./List";
import Map from "./Map";

import { getResults, getResultsWithinRange } from "./utils";

interface State {
  searchType: SearchType;
  search: string;
  distance: number;
  selected?: ResultType;
  results: ResultType[];
}

const initialState: State = {
  searchType: "bothies",
  search: "",
  distance: 10,
  selected: undefined,
  results: []
};

const reducer = (data: any) => (state: State, action: any): State => {
  const { searchType, distance } = state;
  let { selected } = state;
  let results: ResultType[] = [];

  const resultsWithRange = (selected: ResultType, distance: number) =>
    getResultsWithinRange(data, searchType, selected, distance);

  switch (action.type) {
    case "search":
      const search: string = action.value;
      results = getResults(data, state.searchType, search);
      if (selected) {
        selected = undefined;
      }
      if (results.length === 1) {
        selected = results[0];
        results = resultsWithRange(selected, distance);
      }
      return {
        ...state,
        selected,
        search,
        results
      };
    case "searchType":
      return {
        ...state,
        searchType: action.value,
        search: "",
        selected: undefined,
        results: []
      };
    case "distance":
      if (selected) {
        results = resultsWithRange(selected, action.value);
      }
      return {
        ...state,
        distance: action.value,
        results
      };
    case "select":
      selected = action.value as ResultType;
      results = resultsWithRange(selected, distance);
      return {
        ...state,
        selected,
        results
      };
    default:
      return { ...state };
  }
};

const App: React.FC = () => {
  const data: Data = {
    bothies,
    munros
  };

  const [
    { searchType, search, distance, selected, results },
    dispatch
  ] = useReducer(reducer(data), initialState);

  const handleSearchTypeChange = (searchType: SearchType) => {
    dispatch({ type: "searchType", value: searchType });
  };

  const handleSearchChange = (search: string) => {
    dispatch({ type: "search", value: search });
  };

  const handleDistanceChange = (distance: number) => {
    dispatch({ type: "distance", value: distance });
  };

  const handleItemClick = (item: ResultType) => {
    dispatch({ type: "select", value: item });
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
          onLocationClick={handleItemClick}
        />
      </div>
      <aside className="list">
        <List items={results} onItemClick={handleItemClick} />
      </aside>
    </main>
  );
};

export default App;
