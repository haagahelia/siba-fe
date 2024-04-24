import CardHeader from "@mui/material/CardHeader";
// The programs Page
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";
import {
  CommonContainer,
  CommonContentContainer,
} from "../components/common/CommonContainers";
import AddProgramContainer from "../components/program/AddProgramContainer";
import ProgramListContainer from "../components/program/ProgramListContainer";
import { useRoleLoggedIn } from "../hooks/useRoleLoggedIn";
import Logger from "../logger/logger";

export default function ProgramView() {
  Logger.logPrefix = "ProgramView";
  Logger.debug("ProgramView component instantiated.");

  const { roles } = useRoleLoggedIn();
  const appContext = useContext(AppContext);
  const pageSize = appContext.settings.itemsPerPage;

  const [paginatePrograms, setPaginatePrograms] = useState([]);
  const [allProgramsList, setAllProgramsList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });

  Logger.debug("Initial state set.");

  const getAllPrograms = async () => {
    Logger.debug("getAllPrograms: fetching all programs from server.");
    const { httpStatus, data } = await dao.fetchProgramsWithDepartments();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug(
        `getAllPrograms: successfully fetched ${data.length} programs.`,
      );
      setAllProgramsList(data);
      setPaginatePrograms(data.slice(0, pageSize));
    }
  };

  useEffect(() => {
    Logger.debug("Running effect to fetch all programs.");
    getAllPrograms();
    document.title = "Programs";
  }, []);

  useEffect(() => {
    Logger.debug("Running effect to update paginated programs.");
    setPaginatePrograms(allProgramsList.slice(0, pageSize));
  }, [allProgramsList]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <CommonContainer>
        {(roles.admin === "1" || roles.planner === "1") && (
          <AddProgramContainer
            getAllPrograms={getAllPrograms}
            allProgramsList={allProgramsList}
          />
        )}
        <CommonContentContainer>
          <CardHeader title="Programs" variant="pageHeader" />
          <ProgramListContainer
            getAllPrograms={getAllPrograms}
            allProgramsList={allProgramsList}
            paginatePrograms={paginatePrograms}
            setPaginatePrograms={setPaginatePrograms}
            pagination={pagination}
            setPagination={setPagination}
            open={open}
            setOpen={setOpen}
          />
        </CommonContentContainer>
      </CommonContainer>
    </div>
  );
}
