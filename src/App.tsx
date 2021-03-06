import React, { useReducer } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Divider } from "@material-ui/core";
import "./App.css";

import { Maybe, Data, SearchType, ResultType } from "./types";
import { sortAlphabetical, getResultsWithinRange } from "./utils";

import bothies from "./bothies.json";
import munros from "./munros.json";

import Notification from "./Notification";
import Intro from "./Intro";
import Form from "./Form";
import Map from "./Map";

const storageKey = "bothySearch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
      flex: 1,
      height: "100%",
      overflow: "hidden"
    },
    toolbar: {
      boxShadow: "5px 0 5px -2px rgba(0, 0, 0, 0.2)",
      padding: "1.5rem",
      width: "350px",
      zIndex: 1
    },
    map: {
      position: "relative",
      flexGrow: 1,
      margin: 0
    }
  })
);

interface State {
  searchType: SearchType;
  distance: number;
  selected: Maybe<ResultType>;
  results: ResultType[];
}

const initialState: State = {
  searchType: "bothy",
  distance: 10,
  selected: null,
  results: []
};

const reducer = (data: any) => (state: State, action: any): State => {
  const { searchType, distance } = state;
  let { selected } = state;
  let results: ResultType[] = [];
  let newState: State;

  const resultsWithRange = (selected: ResultType, distance: number) =>
    getResultsWithinRange(data, searchType, selected, distance);

  switch (action.type) {
    case "saved":
      newState = { ...action.value };
      break;
    case "searchType":
      newState = {
        ...state,
        searchType: action.value,
        selected: null,
        results: []
      };
      break;
    case "distance":
      if (selected) {
        results = resultsWithRange(selected, action.value);
      }
      newState = {
        ...state,
        distance: action.value,
        results
      };
      break;
    case "select":
      selected = action.value as ResultType;
      results = resultsWithRange(selected, distance);
      newState = {
        ...state,
        selected,
        results
      };
      break;
    default:
      newState = { ...state };
  }
  window.localStorage.setItem(storageKey, JSON.stringify(newState));
  return newState;
};

const App: React.FC = () => {
  const classes = useStyles();

  const data: Data = {
    bothy: bothies.sort(sortAlphabetical),
    munro: munros.sort(sortAlphabetical)
  };

  const [{ searchType, distance, selected, results }, dispatch] = useReducer(
    reducer(data),
    initialState
  );

  const handleSearchTypeChange = (searchType: SearchType) => {
    dispatch({ type: "searchType", value: searchType });
  };

  const handleDistanceChange = (distance: number) => {
    dispatch({ type: "distance", value: distance });
  };

  const handleSelectChange = (item: ResultType) => {
    dispatch({ type: "select", value: item });
  };

  const handleMapLoad = () => {
    const savedState = window.localStorage.getItem(storageKey);
    savedState && dispatch({ type: "saved", value: JSON.parse(savedState) });
  };

  return (
    <>
      <CssBaseline />
      <Notification
        results={results}
        searchType={searchType}
        selected={selected}
        distance={distance}
      />
      <main className={classes.main}>
        <aside className={classes.toolbar}>
          <Intro />
          <Divider />
          <Form
            data={data[searchType]}
            selected={selected}
            searchType={searchType}
            distance={distance}
            onSelect={handleSelectChange}
            onSearchTypeChange={handleSearchTypeChange}
            onDistanceChange={handleDistanceChange}
          />
        </aside>
        <section className={classes.map}>
          <Map
            lat={57.09638090114919}
            lng={-4.298098692290864}
            zoom={6.75}
            locations={results}
            selected={selected}
            onLoad={handleMapLoad}
          />
        </section>
      </main>
    </>
  );
};

export default App;
