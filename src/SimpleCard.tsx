import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
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
    <Card className={classes.root} component="article">
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" component="p">
          {`Grid reference: ${grid}`}
        </Typography>
        {height && (
          <Typography variant="body2" component="p">
            {`Height: ${height} metres`}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Link href={url}>Learn More</Link>
      </CardActions>
    </Card>
  );
}
