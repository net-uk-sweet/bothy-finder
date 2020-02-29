import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HeightIcon from "@material-ui/icons/Height";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { formatGridReference } from "./utils";

const useStyles = makeStyles({
  root: {
    width: 340,
    backgroundColor: "#fff"
  },
  actions: {
    padding: 16
  }
});

type Props = {
  name: string;
  grid: string;
  url: string;
  height?: number;
};

export default function SimpleCard({ name, grid, url, height }: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} component="article" raised>
      <CardContent>
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
      </CardContent>
      <CardActions className={classes.actions}>
        <Link href={url}>Learn More</Link>
      </CardActions>
    </Card>
  );
}
