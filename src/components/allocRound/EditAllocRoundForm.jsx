import { useState } from "react";

import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import AllocRoundInputFields from "./AllocRoundInputFields";
import AllocRoundReadOnlyField from "./AllocRoundReadOnlyField";

export default function EditAllocRoundForm({ formik }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button // theme button yellow
        variant="contained"
        className="editButton"
        onClick={() => {
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={open}>
        <form onSubmit={formik.handleSubmit}>
          {/* formik.initialValues?.name} Here ? checks
              if the AllocRoundName attribute
              can be found in the initialValues object,
              if not found returns null and does not crash */}
          <DialogTitle>Edit: {formik.initialValues?.name}</DialogTitle>
          <DialogContent>
            <Grid
              container
              variant="sibaGridEdit"
              direction="column"
              spacing={3}
              column={7}
            >
              {!formik.initialValues?.isReadOnly && (
                <AllocRoundInputFields formik={formik} actionType={"edit"} />
              )}
              {formik.initialValues?.isReadOnly === 1 && (
                <AllocRoundReadOnlyField formik={formik} />
              )}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-evenly" }}>
            <Button // theme button red
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
            <Tooltip
              title={
                formik.dirty ? "" : "Please change values to enable submit"
              }
              placement="top"
            >
              <span>
                <Button // theme button yellow
                  type="submit"
                  variant="contained"
                  disabled={!formik.dirty}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Submit
                </Button>
              </span>
            </Tooltip>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
