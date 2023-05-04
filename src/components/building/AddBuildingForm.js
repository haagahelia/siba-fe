import React from "react"; // { useState, useEffect } ???
import { Button, Grid } from "@mui/material";
import BuildingInputField from "./BuildingInputField";

export default function AddBuildingForm(props) {
  const { formik, submitValues, setInitialBuilding } = props;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
