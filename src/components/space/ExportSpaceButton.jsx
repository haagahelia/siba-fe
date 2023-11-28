import Button from "@mui/material/Button";
import { useState } from "react";
import { exportData } from "../../importDataFunctions/exportData";
import AlertBox from "../common/AlertBox";

export default function ExportSpaceButton({ spaceFailedToImport }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const clickHandle = () => {
    exportData(spaceFailedToImport, setAlertOpen, setAlertOptions);
  };

  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Button
        variant="addComponentFormButton"
        className="redButton"
        onClick={() => {
          clickHandle();
        }}
      >
        Export failed data
      </Button>
    </>
  );
}
