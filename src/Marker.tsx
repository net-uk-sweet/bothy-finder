import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import TerrainIcon from "@material-ui/icons/Terrain";

import { ResultType } from "./types";
import { isMunro } from "./utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bothy: {
      backgroundColor: "transparent",
      boxShadow: "0 0 0 rgba(245, 0, 87, 0.4)",
      width: 1,
      height: 1,
      borderRadius: "50%",
      position: "absolute",
      top: 12,
      left: 11,
      animation: `$pulse 2s infinite`,
      zIndex: -1
    },
    munro: {
      backgroundColor: "transparent",
      boxShadow: "0 0 0 rgba(245, 0, 87, 0.4)",
      width: 1,
      height: 1,
      borderRadius: "50%",
      position: "absolute",
      animation: `$pulse 2s infinite`,
      zIndex: -1,
      top: 18,
      left: 16
    },
    "@keyframes pulse": {
      "0%": {
        boxShadow: "0 0 0 0 rgba(245, 0, 87, 0.4)"
      },
      "70%": {
        boxShadow: "0 0 0 30px rgba(245, 0, 87, 0)"
      },
      "100%": {
        boxShadow: "0 0 0 0 rgba(245, 0, 87, 0)"
      }
    }
  })
);

interface MarkerProps {
  location: ResultType;
  selected: boolean;
}

export default function Marker({ location, selected }: MarkerProps) {
  const classes = useStyles();
  const [Icon, iconSize, iconClass] = isMunro(location)
    ? [TerrainIcon, "large", classes.munro]
    : [HomeIcon, "default", classes.bothy];
  const color = selected ? "secondary" : "primary";
  return (
    <div>
      <Icon color={color} fontSize={iconSize as any} />
      <div className={selected ? iconClass : ""} />
    </div>
  );
}
