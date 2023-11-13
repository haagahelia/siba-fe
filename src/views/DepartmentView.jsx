import { useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import { useRoleLoggedIn } from "../hooks/useRoleLoggedIn";
import Logger from "../logger/logger";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddDepartment from "../components/department/AddDepartment";
import DepartmentListContainer from "../components/department/DepartmentListContainer";
import DepartmentPagination from "../components/department/DepartmentPagination";

const pageSize = 15;

export default function DepartmenttView() {
  Logger.logPrefix = "Departments";
  Logger.debug("Departments component instantiated.");

  const { roles } = useRoleLoggedIn();
  const [paginateDepartments, setPaginateDepartments] = useState([]);
  const [allDepartmentsList, setAllDepartmentsList] = useState([]);

  const [/*alertOptions,*/ setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [/*alertOpen,*/ setAlertOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });

  const getAllDepartments = async function () {
    Logger.debug("getAllDepartments: fetching all departments from server.");
    const { httpStatus, data } = await dao.fetchAllDepartmentData();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen
      );
    } else {
      setAllDepartmentsList(data);
      Logger.info(
        `getAllDepartments: successfully fetched ${data.length} departments.`
      );
    }
  };

  useEffect(() => {
    Logger.debug("Calling getAllDepartments in useEffect");
    getAllDepartments();
  }, []);

  useEffect(() => {
    Logger.debug("Running effect to update paginated departments.");
    setPaginateDepartments(allDepartmentsList.slice(0, 15));
  }, [allDepartmentsList]);

  return (
    <div>
      <Container maxWidth="xl">
        {(roles.admin === "1" || roles.planner === "1") && (
          <AddDepartment getAllDepartments={getAllDepartments} />
        )}
        <Grid container rowSpacing={0.5}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Department" variant="pageHeader" />
              <DepartmentListContainer
                getAllDepartments={getAllDepartments}
                allDepartmentsList={allDepartmentsList}
                paginateDepartments={paginateDepartments}
                open={open}
                setOpen={setOpen}
              />

              <DepartmentPagination
                pagination={pagination}
                setPagination={setPagination}
                allDepartmentsList={allDepartmentsList}
                paginateDepartments={paginateDepartments}
                setPaginateDepartments={setPaginateDepartments}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
