import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Box,
  Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@material-ui/core/";

import { Maybe, SearchType, ResultType } from "./types";

interface FormProps {
  data: ResultType[];
  selected: Maybe<ResultType>;
  searchType: SearchType;
  distance: number;
  onSelect: (selection: ResultType) => void;
  onSearchTypeChange: (searchType: SearchType) => void;
  onDistanceChange: (distance: number) => void;
}

export default function Form({
  data,
  selected,
  searchType,
  distance,
  onSelect,
  onSearchTypeChange,
  onDistanceChange
}: FormProps) {
  const isBothySearch = searchType === "bothy";

  return (
    <Box mt={3}>
      <form onSubmit={(e: any) => e.preventDefault()}>
        <FormControl component="fieldset" fullWidth={true} margin="normal">
          <FormLabel component="legend">Search for</FormLabel>
          <RadioGroup
            aria-label="position"
            name="position"
            value={searchType}
            onChange={(event: any, newValue: string) =>
              onSearchTypeChange(newValue as SearchType)
            }
            row
          >
            <FormControlLabel
              value="bothy"
              control={<Radio color="primary" />}
              label="Munros"
              labelPlacement="end"
            />
            <FormControlLabel
              value="munro"
              control={<Radio color="primary" />}
              label="Bothies"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" fullWidth={true} margin="normal">
          <FormLabel component="legend">{`Within ${distance} km of`}</FormLabel>
          <Slider
            value={distance}
            min={5}
            max={25}
            marks={[
              { value: 5, label: "5km" },
              { value: 10, label: "10km" },
              { value: 15, label: "15km" },
              { value: 20, label: "20km" },
              { value: 25, label: "25km" }
            ]}
            onChange={(event: any, value: number | number[]) =>
              onDistanceChange(value as number)
            }
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
        </FormControl>
        <FormControl component="fieldset" fullWidth={true} margin="normal">
          <Autocomplete
            id="combo-box-demo"
            options={data}
            getOptionLabel={(option: ResultType) =>
              (option && option.name) || "search"
            }
            style={{ width: 300 }}
            value={selected}
            onChange={(event: any, newValue: Maybe<ResultType>) => {
              if (newValue) {
                onSelect(newValue);
              }
            }}
            renderInput={(params: any) => (
              <TextField
                {...params}
                label={isBothySearch ? "bothy" : "munro"}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </FormControl>
      </form>
    </Box>
  );
}
