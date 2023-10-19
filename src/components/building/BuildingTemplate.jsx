import Button from "@mui/material/Button";
import FileDownload from "js-file-download";
import React from "react";

const BuildingTemplate = () => {
  const downloadBuildingTemplate = async () => {
    const response = await fetch("http://localhost:8764/api/template", {
      method: "GET",
      responseType: "blob",
    });

    console.log("res", response);
    if (response.ok) {
      const data = await response.data;
      FileDownload(data, "template.xlsx");
    }
  };

  return (
    <>
      <Button onClick={downloadBuildingTemplate}>Download template</Button>
    </>
  );
};

export default BuildingTemplate;
