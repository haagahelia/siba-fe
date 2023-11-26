import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";

export default function BuildingDisplay({ singleBuilding }) {
  return (
    <Grid
      container
      variant="sibaGridSingleItemDisplay"
    >
      <DialogContent variant="sibaDialogContent2">
        <Grid item xs={12} sm={6}>
          <Typography variant="singleDialogSubtitle">Name:&nbsp;</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="singleDialogSubtitle">
            {singleBuilding?.name}
          </Typography>
        </Grid>
      </DialogContent>
      <DialogContent variant="sibaDialogContent2">
        <Grid item xs={12} sm={6}>
          <Typography variant="singleDialogSubtitle">Description:&nbsp;</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="singleDialogSubtitle">
          {singleBuilding?.description}
          </Typography>
        </Grid>
      </DialogContent>
    </Grid>
  );
}
