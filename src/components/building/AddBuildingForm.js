import React from "react"; // { useState, useEffect } ???
import { Button, Grid } from "@mui/material";
import BuildingInputField from "./BuildingInputField";

export default function AddBuildingForm(props) {
  const { formik, submitValues, setInitialBuilding } = props;

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          column={8}
          justifyContent="space-evenly"
          alignItems="center"
          padding={1}
        >
          <BuildingInputField formik={formik} />
        </Grid>
        <Grid item xs={3} padding={2}>
          <Button
            type="submit"
            variant="contained"
            style={{ color: "white" }}
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
