import useTheme from "@mui/material/styles/useTheme";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AllocRoundInputField from "./AllocRoundInputField";

export default function AddAllocRoundForm({
  formik,
  submitValues,
  setInitialAllocRound,
}) {
  const theme = useTheme();

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container variant="sibaGridAddForm" column={8}>
          <AllocRoundInputField formik={formik} />
        </Grid>
        <Grid item xs={3} padding={2}>
          <Button
            type="submit"
            variant="contained"
            style={theme.components.MuiButton.greenbutton}
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
