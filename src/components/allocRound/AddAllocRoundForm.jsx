import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AllocRoundInputFields from "./AllocRoundInputFields";

export default function AddAllocRoundForm({
  formik,
  submitValues,
  setInitialAllocRound,
}) {
  const onCancel = () => {
    window.history.back(); // Return to the previous page
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container variant="sibaGridAddForm" column={8}>
          <AllocRoundInputFields formik={formik} actionType={"add"} />
        </Grid>
        <Grid container item xs={12} justifyContent="space-between" padding={2}>
          <Button
            type="button"
            variant="outlined"
            className="redButton"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="greenButton"
            onClick={() => {
              setInitialAllocRound(submitValues);
            }}
          >
            Add
          </Button>
        </Grid>
      </form>
    </div>
  );
}
