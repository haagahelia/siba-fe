import Button from "@mui/material/Button";
import Papa from "papaparse";
import { useState } from "react";
import AlertBox from "../common/AlertBox";

export default function ExportBuildingButton({ failedBuildings }) {
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
      const csv = Papa.unparse(failedBuildings);
      const blob = new Blob([csv]);
      const a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = "BuildingsFailedToImport.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <>
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
    </>
  );
}