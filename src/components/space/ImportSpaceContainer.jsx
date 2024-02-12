import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { processFile } from "../../importDataFunctions/processFile";
import AlertBox from "../common/AlertBox";
import ExportSpaceButton from "./ExportSpaceButton";
import ImportSpaceButton from "./ImportSpaceButton";

export default function ImportSpaceContainer({
  getAllSpaces,
  buildingSelectList,
  spaceTypeSelectList,
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
  const [spaceToImport, setSpaceToImport] = useState([]);
  const [spaceFailedToImport, setSpaceFailedToImport] = useState([]);

  const handleUploadeFiled = (e) => {
    processFile(
      e,
      setSpaceToImport,
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
          <ImportSpaceButton
            spaceToImport={spaceToImport}
            spaceFailedToImport={spaceFailedToImport}
            setSpaceFailedToImport={setSpaceFailedToImport}
            getAllSpaces={getAllSpaces}
            buildingSelectList={buildingSelectList}
            spaceTypeSelectList={spaceTypeSelectList}
            fileOptions={fileOptions}
          />
        </Grid>
        <Grid item>
          <ExportSpaceButton spaceFailedToImport={spaceFailedToImport} />
        </Grid>
      </Grid>
    </>
  );
}
