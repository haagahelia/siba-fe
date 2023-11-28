import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function CopyAllocRoundInputField({ formik, allAllocRoundsList}) {
  const [selectedAllocation, setSelectedAllocation] = useState('');

  const handleAllocationChange = (event) => {
    const selectedAllocationId = event.target.value;
    const selectedAllocation = allAllocRoundsList.find(allocation => allocation.id === selectedAllocationId);
  
    setSelectedAllocation(selectedAllocationId);
  
    // Update formik state with the details of the selected allocation
    if (selectedAllocation) {
      formik.setFieldValue("name", selectedAllocation.name);
      formik.setFieldValue("description", selectedAllocation.description);
      formik.setFieldValue("copiedAllocRoundId", selectedAllocation.id);
      // Update other fields as necessary
    }
  };

  
  

  return (
    <>
      <Grid item xs={12}>
        <TextField
          error={formik.touched.name && formik.errors.name ? true : false}
          name="name"
          label="The name of the allocation round"
          defaultValue={formik.initialValues?.name}
          variant="outlined"
          onChange={formik.handleChange("name")}
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
          label="Description "
          defaultValue={formik.initialValues?.description}
          variant="outlined"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur("description")}
          helperText={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : null
          }
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl style={{ width: '19%' }}>
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
                {allocation.name}
              </MenuItem>
            ))}
            
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}