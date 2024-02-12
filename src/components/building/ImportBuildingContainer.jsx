import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { processFile } from "../../importDataFunctions/processFile";
import AlertBox from "../common/AlertBox";
import ExportBuildingButton from "./ExportBuildingButton";
import ImportBuildingButton from "./ImportBuildingButton";

export default function ImportBuildingContainer({ getAllBuildings }) {
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
  const [buildingToImport, setBuildingToImport] = useState([]);
  const [buildingFailedToImport, setBuildingFailedToImport] = useState([]);

  const handleUploadeFiled = (e) => {
    processFile(
      e,
      setBuildingToImport,
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
          <ImportBuildingButton
            buildingToImport={buildingToImport}
            buildingFailedToImport={buildingFailedToImport}
            setBuildingFailedToImport={setBuildingFailedToImport}
            getAllBuildings={getAllBuildings}
            fileOptions={fileOptions}
          />
        </Grid>
        <Grid item>
          <ExportBuildingButton
            buildingFailedToImport={buildingFailedToImport}
          />
        </Grid>
      </Grid>
    </>
  );
}
