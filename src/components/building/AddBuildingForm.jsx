import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import BuildingInputFields from "./BuildingInputFields";

export default function AddBuildingForm({
  formik,
  submitValues,
  setInitialBuilding,
}) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <BuildingInputFields formik={formik} />
      </Grid>
      <Grid item xs={12} padding={2}>
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
