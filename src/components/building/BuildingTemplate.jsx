import Button from "@mui/material/Button";
import FileDownload from "js-file-download";
import { useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import AlertBox from "../../components/common/AlertBox";

const BuildingTemplate = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const downloadBuildingTemplate = async () => {
    const { httpStatus, data } = await dao.downloadBuildingTemplate();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      FileDownload(data, "building_template.xlsx");
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
        variant="addComponentFormButton"
        onClick={downloadBuildingTemplate}
      >
        Download template
      </Button>
    </>
  );
};

export default BuildingTemplate;
