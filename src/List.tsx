import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import SimpleCard from "./SimpleCard";
import { ResultType, Munro } from "./types";
import { isMunro } from "./utils";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ul: {
      margin: 0,
      listStyle: "none",
      padding: 0
    }
  })
);

export default function List({
  items,
  onItemClick
}: {
  items: ResultType[];
  onItemClick: (item: ResultType) => void;
}) {
  const classes = useStyles();
  // const handleItemClick = (item: ResultType) => (e: any) => onItemClick(item);
  return (
    <ul className={classes.ul}>
      {items.map((item: ResultType) => {
        const { name, grid, url } = item;
        return (
          <li key={`${name}${grid}`}>
            <Box m={2}>
              <SimpleCard
                name={name}
                grid={grid}
                url={url}
                height={isMunro(item) ? (item as Munro).height : undefined}
              />
            </Box>
          </li>
        );
      })}
    </ul>
  );
}
