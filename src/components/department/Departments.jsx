// The Department Page
import { useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddDepartment from "./AddDepartment";
import DepartmentListContainer from "./DepartmentListContainer";

export default function Departments() {
  Logger.logPrefix = "Departments";
  Logger.debug("Departments component instantiated.");

  const { roles } = useRoleLoggedIn();
  const [departmentList, setDepartmentList] = useState([]);

  const [/* alertOptions, */ setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [/* alertOpen, */ setAlertOpen] = useState(false);

  const getAllDepartments = async function () {
    Logger.debug("getAllDepartments: fetching all departments from server.");
    const { httpStatus, data } = await dao.fetchAllDepartmentData();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      setDepartmentList(data);
      Logger.info(
        `getAllDepartments: successfully fetched ${data.length} departments.`,
      );
    }
  };

  useEffect(() => {
    Logger.debug("Calling getAllDepartments in useEffect");
    getAllDepartments();
  }, []);

  return (
    <div>
      <Container maxWidth="100%">
        {(roles.admin === "1" || roles.planner === "1") && (
          <AddDepartment getAllDepartments={getAllDepartments} />
        )}
        <Grid container rowSpacing={0.5}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Department" variant="pageHeader" />
              <DepartmentListContainer
                getAllDepartments={getAllDepartments}
                departmentList={departmentList}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
