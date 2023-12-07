import { useState } from "react";

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
import useTheme from "@mui/material/styles/useTheme";

export default function EditUserForm({ formik }) {
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  return (
    <div>
      <Button
        variant="contained"
        style={theme.components.MuiButton.editbutton}
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
            <DialogContentText>
              <Grid container variant="sibaGridEdit" spacing={3} column={7}>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
            </DialogContentText>
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
              color="red"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={() => {
                setOpen(false);
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
