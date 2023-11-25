import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import BuildingInputField from "./BuildingInputField";

export default function AddBuildingForm({
  formik,
  submitValues,
  setInitialBuilding,
}) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <BuildingInputField formik={formik} />
      </Grid>
      <Grid item xs={3} padding={2}>
        <Button
          type="submit"
          variant="addComponentFormButton"
          onClick={() => {
            setInitialBuilding(submitValues);
          }}
        >
          Add Building
        </Button>
      </Grid>
    </form>
  );
}
