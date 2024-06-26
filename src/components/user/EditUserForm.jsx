import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import { useState } from "react";

export default function EditUserForm({ formik }) {
  const [open, setOpen] = useState(false);

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
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle sx={{ maxWidth: "300px" }}>
            Edit role for {formik.values.email}
          </DialogTitle>
          <DialogContent>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Admin"
                labelPlacement="start"
                className="formCheckBoxButtons"
                name="isAdmin"
                checked={formik.values.isAdmin === 1}
                onChange={(event) =>
                  formik.handleChange({
                    target: {
                      name: "isAdmin",
                      value: event.target.checked ? 1 : 0,
                    },
                  })
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Planner"
                labelPlacement="start"
                className="formCheckBoxButtons"
                name="isPlanner"
                checked={formik.values.isPlanner === 1}
                onChange={(event) =>
                  formik.handleChange({
                    target: {
                      name: "isPlanner",
                      value: event.target.checked ? 1 : 0,
                    },
                  })
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Statist"
                labelPlacement="start"
                className="formCheckBoxButtons"
                name="isStatist"
                checked={formik.values.isStatist === 1}
                onChange={(event) =>
                  formik.handleChange({
                    target: {
                      name: "isStatist",
                      value: event.target.checked ? 1 : 0,
                    },
                  })
                }
              />
            </FormGroup>
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
          >
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
            <Tooltip
              title={
                formik.dirty ? "" : "Please change values to enable submit"
              }
              placement="top"
            >
              <span>
                <Button
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
