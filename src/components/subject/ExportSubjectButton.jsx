import Papa from "papaparse";
import { useState } from "react";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";

export default function ExportSubjectButton({ failedSubjects }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const exportData = async () => {
    if (failedSubjects.length === 0) {
      setAlertOptions({
        severity: "info",
        title: "Export data info",
        message: "There is no data to export",
      });
      setAlertOpen(true);

      return;
    } else {
      console.log("failedSubjects", failedSubjects);
      const csv = Papa.unparse(failedSubjects);
      const blob = new Blob([csv]);
      const a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = "LessonsFailedToImport.csv";
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
