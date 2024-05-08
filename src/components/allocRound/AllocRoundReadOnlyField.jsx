import { Checkbox, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function AllocRoundReadOnlyField({ formik }) {
  return (
    <>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox />}
          label="Modifiable"
          labelPlacement="start"
          className="formCheckBoxButtons"
          name="isReadOnly"
          checked={formik.values.isReadOnly === 0}
          onChange={(event) =>
            formik.handleChange({
              target: {
                name: "isReadOnly",
                value: event.target.checked ? 0 : 1,
              },
            })
          }
        />
      </Grid>
    </>
  );
}
