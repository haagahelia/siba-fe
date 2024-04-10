import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { processFile } from "../../importDataFunctions/processFile";
import AlertBox from "../common/AlertBox";
import ExportEquipmentButton from "./ExportEquipmentButton";
import ImportEquipmentButton from "./ImportEquipmentButton";

export default function ImportEquipmentContainer({ getAllEquipments }) {
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
  const [equipmentToImport, setEquipmentToImport] = useState([]);
  const [equipmentFailedToImport, setEquipmentFailedToImport] = useState([]);

  const handleUploadeFiled = (e) => {
    processFile(
      e,
      setEquipmentToImport,
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
          ... OR Import data from .csv file
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
          <ImportEquipmentButton
            equipmentToImport={equipmentToImport}
            equipmentFailedToImport={equipmentFailedToImport}
            setEquipmentFailedToImport={setEquipmentFailedToImport}
            getAllEquipments={getAllEquipments}
            fileOptions={fileOptions}
          />
        </Grid>
        <Grid item>
          <ExportEquipmentButton
            equipmentFailedToImport={equipmentFailedToImport}
          />
        </Grid>
      </Grid>
    </>
  );
}
