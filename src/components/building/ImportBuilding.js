import React, { useState } from "react";
import * as XLSX from "xlsx";
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (
      file.type !== "application/vnd.ms-excel" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      file.type !== "text/csv"
    ) {
      setAlertOptions({
        title: "Invalid file type",
        message: "Please upload a .xlsx or .csv file.",
        severity: "error",
      });
      setAlertOpen(true);
      return;
    }

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const parsedData = XLSX.utils.sheet_to_json(worksheet);
    setImportBuildings(parsedData);
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
    let workbook_fail = XLSX.utils.book_new();
    let worksheet_fail = XLSX.utils.json_to_sheet(failedBuildings);

    XLSX.utils.book_append_sheet(workbook_fail, worksheet_fail, "Buildings");
    XLSX.writeFile(workbook_fail, "BuildingsFailedToImport.xlsx");
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
