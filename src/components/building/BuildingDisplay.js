import React from "react";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

export default function BuildingDisplay(props) {
  const { singleBuilding, flexDirection } = props;

  return (
    <React.Fragment>
      <Grid
        container
        variant="buildingDisplay"
        spacing={1}
        direction={flexDirection}
      >
        <Grid item md={3} xs={7}>
          {/* <Typography variant="body" style={{ fontWeight: "bold" }}> */}
          <Typography variant="boldTitle">Name:</Typography>
          <ListItemText
            primary={singleBuilding.name}
            primaryTypographyProps={{
              variant: "body2",
            }}
          />
        </Grid>
        <Grid item md={2} xs={3}>
          <Typography variant="boldTitle">Description:</Typography>
          <ListItemText
            primary={singleBuilding.description}
            primaryTypographyProps={{
              variant: "body2",
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
