import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { processFile } from "../../importDataFunctions/processFile";
import AlertBox from "../common/AlertBox";
import ExportDepartmentButton from "./ExportDepartmentButton";
import ImportDepartmentButton from "./ImportDepartmentButton";

export default function ImportDepartmentContainer({ getAllDepartments }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [fileOptions, setFileOptions] = useState({
    isFileChosen: false,
    isFileTypeValid: false,
  });
  const [departmentToImport, setDepartmentToImport] = useState([]);
  const [departmentFailedToImport, setDepartmentFailedToImport] = useState([]);

  const handleUploadeFiled = (e) => {
    processFile(
      e,
      setDepartmentToImport,
      setAlertOpen,
      setAlertOptions,
      setFileOptions,
    );
  };

  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Grid
        container
        direction="column"
        variant="AddComponentFormButtonSection"
      >
        <Typography variant="addComponentSubHeader">
          Import data from .csv file
        </Typography>
        <Grid item>
          <Input
            variant="sibaInputFileName"
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleUploadeFiled}
          />
        </Grid>
        <Grid item>
          <ImportDepartmentButton
            departmentToImport={departmentToImport}
            departmentFailedToImport={departmentFailedToImport}
            setDepartmentFailedToImport={setDepartmentFailedToImport}
            getAllDepartments={getAllDepartments}
            fileOptions={fileOptions}
          />
        </Grid>
        <Grid>
          <ExportDepartmentButton
            departmentFailedToImport={departmentFailedToImport}
          />
        </Grid>
      </Grid>
    </>
  );
}
