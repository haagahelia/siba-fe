import { Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import { useEffect, useState } from "react"; ???
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
