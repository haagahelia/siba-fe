import CardHeader from "@mui/material/CardHeader";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";
import {
  CommonContainer,
  CommonContentContainer,
} from "../common/CommonContainers";
import AddDepartment from "./AddDepartment";
import DepartmentListContainer from "./DepartmentListContainer";

export default function Departments() {
  Logger.logPrefix = "Departments";
  Logger.debug("Departments component instantiated.");

  const { roles } = useRoleLoggedIn();
  const [departmentList, setDepartmentList] = useState([]);
  const [paginateDepartment, setPaginateDepartment] = useState([]);
  const rowsPerPage = useContext(AppContext).settings.itemsPerPage;

  const [pagination, setPagination] = useState({
    from: 0,
    to: rowsPerPage,
  });

  const totalCount = Math.ceil(departmentList.length / rowsPerPage);

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
      setPaginateDepartment(data.slice(0, rowsPerPage));
      Logger.info(
        `getAllDepartments: successfully fetched ${data.length} departments.`,
      );
    }
  };

  useEffect(() => {
    Logger.debug("Calling getAllDepartments in useEffect");
    getAllDepartments();
    document.title = "Departments";
  }, []);

  useEffect(() => {
    Logger.debug("Running effect to update paginated department.");
    setPaginateDepartment(departmentList.slice(0, rowsPerPage));
  }, [departmentList]);

  return (
    <div>
      <CommonContainer>
        {roles.admin === "1" && (
          <AddDepartment getAllDepartments={getAllDepartments} />
        )}
        <CommonContentContainer>
          <CardHeader title="Departments" variant="pageHeader" />
          <DepartmentListContainer
            getAllDepartments={getAllDepartments}
            departmentList={departmentList}
            paginateDepartment={paginateDepartment}
            setPaginateDepartment={setPaginateDepartment}
            pagination={pagination}
            setPagination={setPagination}
            totalCount={totalCount}
            rowsPerPage={rowsPerPage}
          />
        </CommonContentContainer>
      </CommonContainer>
    </div>
  );
}
