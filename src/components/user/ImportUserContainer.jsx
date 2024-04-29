import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { processFile } from "../../importDataFunctions/processFile";
import AlertBox from "../common/AlertBox";
import ExportUserButton from "./ExportUserButton";
import ImportUserButton from "./ImportUserButton";

export default function ImportUserContainer({ getAllUsers }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert - check it out!",
    severity: "error",
  });
  const [fileOptions, setFileOptions] = useState({
    isFileChosen: false,
    isFileTypeValid: false,
  });
  const [userToImport, setUserToImport] = useState([]);
  const [userFailedToImport, setUserFailedToImport] = useState([]);

  const handleUploadeFiled = (e) => {
    processFile(
      e,
      setUserToImport,
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
          <ImportUserButton
            userToImport={userToImport}
            userFailedToImport={userFailedToImport}
            setUserFailedToImport={setUserFailedToImport}
            getAllUsers={getAllUsers}
            fileOptions={fileOptions}
          />
        </Grid>
        <Grid item>
          <ExportUserButton userFailedToImport={userFailedToImport} />
        </Grid>
      </Grid>
    </>
  );
}
