import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { processFile } from "../../importDataFunctions/processFile";
import AlertBox from "../common/AlertBox";
import ExportProgramButton from "./ExportProgramButton";
import ImportProgramButton from "./ImportProgramButton";

export default function ImportProgramContainer({
  getAllPrograms,
  departmentSelectList,
}) {
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
  const [programToImport, setProgramToImport] = useState([]);
  const [programFailedToImport, setProgramFailedToImport] = useState([]);

  const handleUploadeFiled = (e) => {
    processFile(
      e,
      setProgramToImport,
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
          <ImportProgramButton
            programToImport={programToImport}
            programFailedToImport={programFailedToImport}
            setProgramFailedToImport={setProgramFailedToImport}
            getAllPrograms={getAllPrograms}
            departmentSelectList={departmentSelectList}
            fileOptions={fileOptions}
          />
        </Grid>
        <Grid item>
          <ExportProgramButton programFailedToImport={programFailedToImport} />
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
}
