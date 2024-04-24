import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddEquipmentInputFields from "./AddEquipmentInputFields";

export default function AddEquipmentForm({
  formik,
  submitValues,
  setEquipment,
}) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <AddEquipmentInputFields formik={formik} />
      </Grid>
      <Grid item xs={12} padding={2}>
        <Button
          type="submit"
          variant="addComponentFormButton"
          onClick={() => {
            setEquipment(submitValues);
          }}
        >
          Add Equipment
        </Button>
      </Grid>
    </form>
  );
}
