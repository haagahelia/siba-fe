import React, { useState } from "react";
import Papa from "papaparse";
import { Typography } from "@mui/material";
import AlertBox from "../common/AlertBox";
import {
  validate,
  capitalizeFirstLetter,
} from "../../validation/ValidateAddBuilding";
import dao from "../../ajax/dao";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

export default function ImportBuilding(props) {
  const { getAllBuildings } = props;
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  //data import
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
      Papa.parse(file, {
        header: true,
        delimiter: "",
        complete: (result) => {
          setImportBuildings(result.data);
        },
      });
    }
  };

  const importData = async () => {
    let successCount = 0;
    let failedCount = 0;
    let tempFailedBuildings = [];

    await Promise.all(
      importBuildings.map(async (building) => {
        let newBuilding = {
          name: building.name ? capitalizeFirstLetter(building.name) : "",
          description: building.description ? building.description : "",
        };

        const validateResult = await validate(newBuilding);

        if (Object.keys(validateResult).length !== 0) {
          tempFailedBuildings.push(building);
          failedCount++;

          return;
        }

        let result = await dao.postNewBuilding(newBuilding);

        if (!result) {
          tempFailedBuildings.push(building);
          failedCount++;
        } else {
          getAllBuildings();
          successCount++;
        }
      }),
    );

    setFailedBuildings([...failedBuildings, ...tempFailedBuildings]);

    setAlertOptions({
      severity: "success",
      title: "Success!",
      message: `${successCount} building added and ${failedCount} building failed to add.`,
    });
    setAlertOpen(true);
  };

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
      <Typography>Import from .xlsx or .csv file</Typography>
      <Input
        variant="sibaInputFileName"
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileUpload}
      />
      <Button
        variant="contained"
        onClick={() => {
          importData();
        }}
      >
        Import data
      </Button>
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
