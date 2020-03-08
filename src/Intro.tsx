import React from "react";
import { Box, Typography } from "@material-ui/core";

export default function Intro() {
  return (
    <Box mb={3}>
      <header>
        <Typography variant="h3" component="h1" gutterBottom={true}>
          Bothy finder
        </Typography>
      </header>
      <Typography variant="subtitle1" component="p" gutterBottom={true}>
        You can use this tool to find munros within a certain distance of a
        specific bothy, or bothies within a certain distance of a specific
        munro.
      </Typography>
    </Box>
  );
}
