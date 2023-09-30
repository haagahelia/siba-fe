import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";

export default function BuildingDisplay({ singleBuilding, flexDirection }) {
  return (
    <Grid
      container
      variant="sibaGridSingleItemDisplay"
      spacing={1}
      direction={flexDirection}
    >
      <Grid item md={3} xs={7}>
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
  );
}
