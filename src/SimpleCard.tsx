import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Link,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import HeightIcon from "@material-ui/icons/Height";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import { formatGridReference } from "./utils";

const useStyles = makeStyles({
  root: {
    width: "250px"
  }
});

type Props = {
  name: string;
  grid: string;
  url: string;
  height?: number;
  selected: boolean;
  onClick: () => void;
};

export default function SimpleCard({
  name,
  grid,
  url,
  height,
  selected,
  onClick
}: Props) {
  const classes = useStyles();

  return (
    <Box className={classes.root} component="article" onClick={onClick}>
      <Box mb={2}>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
      </Box>
      <Divider />
      <List component="ul" aria-label="main mailbox folders" dense>
        {height && (
          <ListItem component="li">
            <ListItemIcon>
              <HeightIcon />
            </ListItemIcon>
            <ListItemText primary="Height" secondary={`${height} metres`} />
          </ListItem>
        )}
        <ListItem component="li">
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText
            primary="Grid reference"
            secondary={formatGridReference(grid)}
          />
        </ListItem>
      </List>
      <Link href={url}>Learn More</Link>
    </Box>
  );
}
