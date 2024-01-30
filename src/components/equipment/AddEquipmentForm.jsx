import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddEquipmentInputField from "./AddEquipmentInputField";

export default function AddEquipmentForm({
  formik,
  submitValues,
  setEquipment,
}) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <AddEquipmentInputField formik={formik} />
      </Grid>
      <Grid item xs={3} padding={2}>
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
