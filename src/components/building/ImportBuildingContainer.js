import { Typography } from "@mui/material";
import Input from "@mui/material/Input";
import Papa from "papaparse";
import { useState } from "react";
import Logger from "../../logger/logger";
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

  // data import
  const [importBuildings, setImportBuildings] = useState([]);
  const [failedBuildings, setFailedBuildings] = useState([]);

  const isUploaded = (file) => {
    return file;
  };

  const isValidType = (file) => {
    return file.type === "text/csv";
  };

  const handleFileUpload = (e) => {
    let file = e.target.files[0];

    if (!isUploaded(file)) {
      return;
    } else if (!isValidType(file)) {
      setImportBuildings([]);

      setAlertOptions({
        severity: "error",
        title: "Invalid file type",
        message: "Please upload a .csv file.",
      });
      setAlertOpen(true);

      return;
    } else {
      // use papaparse to transform file to array of objects
      Papa.parse(file, {
        header: true,
        delimiter: "", // auto detect delimiter
        complete: (result) => {
          setImportBuildings(result.data);
          Logger.debug("data from file", result.data);
        },
      });
    }
  };

  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Typography>Import from .xlsx or .csv file</Typography>
      <Input
        variant="sibaInputFileName"
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileUpload}
      />
      <ImportBuildingButton
        importBuildings={importBuildings}
        setFailedBuildings={setFailedBuildings}
        failedBuildings={failedBuildings}
        getAllBuildings={getAllBuildings}
      />
      <ExportBuildingButton failedBuildings={failedBuildings} />
    </>
  );
}
