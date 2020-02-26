import React, { useReducer } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import "./App.css";

import { Maybe, Data, SearchType, ResultType } from "./types";
import { sortAlphabetical } from "./utils";

import bothies from "./bothies.json";
import munros from "./munros.json";

import Form from "./Form";
import List from "./List";
import Map from "./Map";

import { getResultsWithinRange } from "./utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
      flex: 1,
      height: "100%",
      overflow: "hidden"
    },
    toolbar: {
      overflowY: "scroll",
      padding: "1.5rem",
      width: "350px"
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
  showResults: boolean;
}

const initialState: State = {
  searchType: "bothies",
  distance: 10,
  selected: null,
  results: [],
  showResults: true
};

const reducer = (data: any) => (state: State, action: any): State => {
  const { searchType, distance } = state;
  let { selected } = state;
  let results: ResultType[] = [];

  const resultsWithRange = (selected: ResultType, distance: number) =>
    getResultsWithinRange(data, searchType, selected, distance);

  switch (action.type) {
    case "searchType":
      return {
        ...state,
        searchType: action.value,
        selected: null,
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
    case "showResults":
      return {
        ...state,
        showResults: action.value as boolean
      };
    default:
      return { ...state };
  }
};

const App: React.FC = () => {
  const classes = useStyles();

  const data: Data = {
    bothies: bothies.sort(sortAlphabetical),
    munros: munros.sort(sortAlphabetical)
  };

  const [
    { searchType, distance, selected, results, showResults },
    dispatch
  ] = useReducer(reducer(data), initialState);

  const handleSearchTypeChange = (searchType: SearchType) => {
    dispatch({ type: "searchType", value: searchType });
  };

  const handleDistanceChange = (distance: number) => {
    dispatch({ type: "distance", value: distance });
  };

  const handleItemClick = (item: ResultType) => {
    dispatch({ type: "select", value: item });
  };

  const handleShowResultsChange = (show: boolean) => {
    dispatch({ type: "showResults", value: show });
  };

  return (
    <>
      <CssBaseline />
      <main className={classes.main}>
        <aside className={classes.toolbar}>
          <header>
            <Typography variant="h3" component="h1">
              Bothy finder
            </Typography>
          </header>
          <Typography variant="subtitle1" component="p">
            You can use this tool to find munros within a certain distance of a
            specific bothy, or bothies within a specific ertain distance of a
            munro.
          </Typography>
          <Divider />
          <Form
            data={data[searchType]}
            selected={selected}
            searchType={searchType}
            distance={distance}
            showResults={showResults}
            onSelect={handleItemClick}
            onSearchTypeChange={handleSearchTypeChange}
            onDistanceChange={handleDistanceChange}
            onShowResultsChange={handleShowResultsChange}
          />
        </aside>
        <section className={classes.map}>
          <Map
            lat={57.09638090114919}
            lng={-4.298098692290864}
            zoom={6.75}
            locations={results}
            selected={selected}
            onLocationClick={handleItemClick}
          />
        </section>
        <Drawer
          anchor="right"
          variant="persistent"
          open={showResults && results.length > 0}
        >
          <List items={results} onItemClick={handleItemClick} />
        </Drawer>
      </main>
    </>
  );
};

export default App;
