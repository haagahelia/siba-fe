import { useContext, useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";

import { Pagination } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { AppContext } from "../../AppContext";
import AddDepartment from "./AddDepartment";
import DepartmentListContainer from "./DepartmentListContainer";

export default function Departments() {
  Logger.logPrefix = "Departments";
  Logger.debug("Departments component instantiated.");

  const { roles } = useRoleLoggedIn();
  const [departmentList, setDepartmentList] = useState([]);

  const rowsPerPage = useContext(AppContext).settings.itemsPerPage;
  const [paginateDepartment, setPaginateDepartment] = useState([]);

  const [pagination, setPagination] = useState({
    from: 0,
    to: rowsPerPage,
  });

  const totalCount = Math.ceil(departmentList.length / rowsPerPage);

  useEffect(() => {
    if (!pagination.from) return;
    const slicedDepartment = departmentList.slice(
      pagination.from,
      pagination.to,
    );
    setPaginateDepartment(slicedDepartment);
  }, [pagination, departmentList, setPaginateDepartment]);

  const handlePageChange = (e, p) => {
    const from = (p - 1) * rowsPerPage;
    const to = (p - 1) * rowsPerPage + rowsPerPage;
    setPagination({ from, to });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [/* alertOptions, */ setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [/* alertOpen, */ setAlertOpen] = useState(false);

  const getAllDepartments = async () => {
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

  useEffect(() => {
    document.title = "Departments";
  }, []);

  return (
    <div>
      <Container maxWidth="100%">
        {roles.admin === "1" && (
          <AddDepartment getAllDepartments={getAllDepartments} />
        )}
        <Grid container rowSpacing={0.5}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Departments" variant="pageHeader" />
              <DepartmentListContainer
                getAllDepartments={getAllDepartments}
                departmentList={departmentList}
                onPageChange={handlePageChange}
                pagination={pagination}
                totalCount={totalCount}
                rowsPerPage={rowsPerPage}
                setPaginateDepartment={setPaginateDepartment}
                paginateDepartment={paginateDepartment}
              />
              <Pagination
                count={totalCount}
                pagination={pagination}
                onChange={handlePageChange}
                variant="outlined"
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
