import { useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import { processFile } from "../../importDataFunctions/processFile";

import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import AlertBox from "../common/AlertBox";
import ExportSubjectButton from "./ExportSubjectButton";
import ImportSubjectButton from "./ImportSubjectButton";

export default function ImportSubjectContainer({
  getAllSubjects,
  spaceTypeSelectList,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [progNameList, setProgNameList] = useState([]);
  const [subjectToImport, setSubjectToImport] = useState([]);
  const [subjectFailedToImport, setSubjectFailedToImport] = useState([]);

  const getAuthorizedProgramForUser = async function () {
    let { httpStatus, data } = await dao.getProgramByUserEmail(
      localStorage.getItem("email"),
    );
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2), // View name, 2 = parent of the caller function
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      data = data.map((item) => item.name);
      setProgNameList(...[data]);
    }
  };

  useEffect(() => {
    getAuthorizedProgramForUser();
  }, []);

  const handleUploadeFiled = (e) => {
    processFile(e, setSubjectToImport, setAlertOpen, setAlertOptions);
  };

  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Typography variant="sibaTypography">
        Import data from .csv file
      </Typography>
      <Grid container direction="column" variant="sibaGridAddForm">
        <Grid item>
          <Input
            variant="sibaInputFileName"
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleUploadeFiled}
          />
        </Grid>
        <Grid item>
          <ImportSubjectButton
            progNameList={progNameList}
            subjectToImport={subjectToImport}
            subjectFailedToImport={subjectFailedToImport}
            setSubjectFailedToImport={setSubjectFailedToImport}
            getAllSubjects={getAllSubjects}
            spaceTypeSelectList={spaceTypeSelectList}
          />
        </Grid>
        <Grid item>
          <ExportSubjectButton subjectFailedToImport={subjectFailedToImport} />
        </Grid>
      </Grid>
    </>
  );
}
