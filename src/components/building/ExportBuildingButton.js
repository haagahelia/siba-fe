import React, { useState } from "react";
import Papa from "papaparse";
import AlertBox from "../common/AlertBox";
import Button from "@mui/material/Button";

export default function ExportBuildingButton(props) {
  const { failedBuildings } = props;
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const exportData = async () => {
    if (failedBuildings.length === 0) {
      setAlertOptions({
        severity: "info",
        title: "Export data info",
        message: "There is no data to export",
      });
      setAlertOpen(true);

      return;
    } else {
      let csv = Papa.unparse(failedBuildings);
      let blob = new Blob([csv]);
      let a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = "BuildingsFailedToImport.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <React.Fragment>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Button
        variant="contained"
        color="red"
        onClick={() => {
          exportData();
        }}
      >
        Export failed data
      </Button>
    </React.Fragment>
  );
}
