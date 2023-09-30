import { Button, Grid } from "@mui/material";
import BuildingInputField from "./BuildingInputField";

export default function AddBuildingForm({
  formik,
  submitValues,
  setInitialBuilding,
}) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container variant="sibaGridAddForm" column={8}>
        <BuildingInputField formik={formik} />
      </Grid>
      <Grid item xs={3}>
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            setInitialBuilding(submitValues);
          }}
        >
          Add
        </Button>
      </Grid>
    </form>
  );
}
