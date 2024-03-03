import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SpaceTypeInputFields from "./SpaceTypeInputFields";

export default function AddSpaceTypeForm({
  formik,
  submitValues,
  setInitialSpaceType,
}) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <SpaceTypeInputFields formik={formik} />
      </Grid>
      <Grid item xs={3} padding={2}>
        <Button
          type="submit"
          variant="addComponentFormButton"
          onClick={() => {
            setInitialSpaceType(submitValues);
          }}
        >
          Add Space Type
        </Button>
      </Grid>
    </form>
  );
}
