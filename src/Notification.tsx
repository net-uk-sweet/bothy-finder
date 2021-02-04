import React, { useState, useEffect } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { Snackbar, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";

import { Maybe, ResultType, SearchType } from "./types";
import { label } from "./utils";

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

const AUTO_HIDE_DURATION = 10000;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      boxShadow:
        "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"
    }
  })
);

interface NotificationProps {
  results: ResultType[];
  searchType: SearchType;
  selected: Maybe<ResultType>;
  distance: number;
}

export default function Notification({
  results,
  searchType,
  selected,
  distance
}: NotificationProps) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setOpen(!!selected);
  }, [selected]);

  const alertType = results.length ? "success" : "warning";
  const alertMessage = results.length
    ? `Found ${results.length}
  ${
    label[searchType === "bothy" ? "munro" : "bothy"][
      results.length > 1 ? "plural" : "singular"
    ]
  }
  within ${distance} km of ${selected && selected.name}. Select the icons
  for more information.`
    : `There are no ${label[searchType === "bothy" ? "munro" : "bothy"].plural}
  within ${distance} km of ${selected && (selected as ResultType).name}, try
  another search or increase the distance.`;
  return (
    <Snackbar
      open={open}
      autoHideDuration={AUTO_HIDE_DURATION}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={SlideTransition}
      onClose={() => setOpen(false)}
    >
      <Alert className={classes.alert} severity={alertType}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
