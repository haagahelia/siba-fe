import Papa from "papaparse";
import { useState, useEffect } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import AlertBox from "../common/AlertBox";
import ExportSubjectButton from "./ExportSubjectButton";
import ImportSubjectButton from "./ImportSubjectButton";

export default function ImportSubjectContainer({ getAllSubjects }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState('');
  // data import
  const [importSubjects, setImportSubjects] = useState([]);
  const [failedSubjects, setFailedSubjects] = useState([]);

  const getDepartmentsForUser = async function () {
    //user
    // Logger.debug("getAllUsers: fetching all Users from server.");
    let currentUser = null;
    let currentRole = [];
    const { httpStatus, data: userData } = await dao.fetchAllUsers();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2), // View name, 2 = parent of the caller function
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      // Logger.debug(`getAllUsers: successfully fetched ${userData.length} Users.`);
      currentUser = userData.find((user) => user.email === localStorage.getItem("email"));
      if(currentRole.length !== 0)
        currentRole = currentUser.plannerdepartment.split(' | ');
      // console.log(currentUser)
    }

    //dep
    // Logger.debug("getAllDepartments: fetching all departments from server.");
    const { success, data } = await dao.fetchDepartmentData();
    if (!success) {
      // Logger.error("getAllDepartments: failed to fetch all departments.");
      setAlertOptions({
        severity: "error",
        title: "Error",
        message:
          "Oops! Something went wrong on the server. Department not found",
      });
      setAlertOpen(true);
      return;
    } else {
      Logger.info(
        // `getAllDepartments: successfully fetched ${data.length} departments.`,
      );
      const departmentsToShow = data.filter((dept) => currentRole.includes(dept.name));
      setDepartmentList([...departmentList, ...departmentsToShow])
    }
  };

  useEffect(() => {
    // Logger.debug("Running effect to fetch all departments for user.");
    getDepartmentsForUser();
  }, []);

  const isUploaded = (file) => {
    return file;
  };

  const isValidType = (file) => {
    return file.type === "text/csv";
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!isUploaded(file)) {
      return;
    } else if (!isValidType(file)) {
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
        skipEmptyLines: 'greedy', //set to 'greedy', lines that don't have any content (those which have only whitespace after parsing) will be skipped.
        dynamicTyping: true,
        complete: (result) => {
          setImportSubjects(result.data);
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
      <FormControl sx={{ maxWidth: 220, maxHeight: 58, minWidth: 120 }}>
        <InputLabel>Department</InputLabel>
        <Select
          labelId="department-label-id"
          id="department-id"
          value={department}
          onChange={(event) => {
            setDepartment(event.target.value);
            console.log(event.target.value)
          }}
          label="department"
        >
          {departmentList.map((dept) => (
            <MenuItem key={dept.id} value={dept.name}>
              {dept.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl >

      <Typography>Import from .csv file</Typography>
      <Input
        variant="sibaInputFileName"
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileUpload}
      />
      <ImportSubjectButton
        importSubjects={importSubjects}
        failedSubjects={failedSubjects}
        setFailedSubjects={setFailedSubjects}
        getAllSubjects={getAllSubjects}
      />
      <ExportSubjectButton failedSubjects={failedSubjects}/>
    </>
  );
}
