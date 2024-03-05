import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import BuildingInputFields from "./BuildingInputFields";

export default function EditBuildingForm({ formik }) {
  const [open, setOpen] = useState(false);
  const [buildingNameError, setBuildingNameError] = useState("");

  const handleSubmit = () => {
    if (!formik.values.name.trim()) {
      setBuildingNameError("Building name cannot be empty");
    } else {
      setBuildingNameError("");
      setOpen(false);
      formik.handleSubmit();
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        className="editButton"
        onClick={() => {
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={open}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogTitle>Edit: {formik.initialValues?.name}</DialogTitle>
          <DialogContent>
            <Grid
              container
              variant="sibaGridEdit"
              direction="column"
              spacing={3}
              column={7}
            >
              <BuildingInputFields formik={formik} />
              {buildingNameError && (
                <Typography variant="errorTypography">
                  {buildingNameError}
                </Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-evenly" }}>
            <Button
              onClick={() => {
                setOpen(false);
                // Let's reset the form if you press cancel
                formik.resetForm();
              }}
              variant="contained"
              className="redButton"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Continue
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
