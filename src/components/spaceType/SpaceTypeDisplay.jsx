import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function SpaceTypeDisplay({ singleSpaceType }) {
  return (
    <Grid container variant="sibaGridSingleItemDisplay">
      <DialogContent variant="sibaDialogContent2">
        <Grid item xs={12} sm={6}>
          <Typography variant="singleDialogSubtitle">Name:&nbsp;</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="singleDialogSubtitle">
            {singleSpaceType?.name}
          </Typography>
        </Grid>
      </DialogContent>
      <DialogContent variant="sibaDialogContent2">
        <Grid item xs={12} sm={6}>
          <Typography variant="singleDialogSubtitle">Acronym:&nbsp;</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="singleDialogSubtitle">
            {singleSpaceType?.acronym}
          </Typography>
        </Grid>
      </DialogContent>
      <DialogContent variant="sibaDialogContent2">
        <Grid item xs={12} sm={6}>
          <Typography variant="singleDialogSubtitle">
            Description:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="singleDialogSubtitle">
            {singleSpaceType?.description}
          </Typography>
        </Grid>
      </DialogContent>
    </Grid>
  );
}
