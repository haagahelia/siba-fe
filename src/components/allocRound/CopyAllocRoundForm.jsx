import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

export default function CopyAllocRoundForm({ formik, allAllocRoundsList }) {
  const [selectedAllocation, setSelectedAllocation] = useState(
    allAllocRoundsList.length > 0 ? allAllocRoundsList[0].id : "",
  );

  const handleAllocationChange = (event) => {
    const selectedAllocationId = event.target.value;
    const selectedAllocation = allAllocRoundsList.find(
      (allocation) => allocation.id === selectedAllocationId,
    );

    setSelectedAllocation(selectedAllocationId);
    // Update formik state with the details of the selected allocation
    if (selectedAllocation) {
      formik.setFieldValue("copiedAllocRoundId", selectedAllocation.id);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <TextField
          error={formik.touched.name && formik.errors.name ? true : false}
          name="name"
          label="The name of the new allocation round"
          defaultValue={formik.initialValues?.name}
          variant="outlined"
          onChange={(event) => {
            formik.handleChange("name");
            formik.setFieldValue("name", event.target.value);
          }}
          onBlur={formik.handleBlur("name")}
          helperText={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={
            formik.touched.description && formik.errors.description
              ? true
              : false
          }
          name="description"
          label="Description"
          defaultValue={formik.initialValues?.description}
          variant="outlined"
          onChange={(event) => {
            formik.handleChange("description");
            formik.setFieldValue("description", event.target.value);
          }}
          onBlur={formik.handleBlur("description")}
          helperText={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : null
          }
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl style={{ width: "19%" }}>
          <InputLabel>Copy Existing Allocation</InputLabel>
          <Select
            name="copyAllocation"
            label="Copy Existing Allocation"
            value={selectedAllocation}
            onChange={handleAllocationChange}
            onBlur={formik.handleBlur}
          >
            {allAllocRoundsList.map((allocation) => (
              <MenuItem key={allocation.id} value={allocation.id}>
                {`${allocation.id} - ${allocation.name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}
