// The programs Page
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
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
import Typography from "@mui/material/Typography";
import AlertBox from "../components/common/AlertBox";
import AddProgramContainer from "../components/program/AddProgramContainer";
import ProgramListContainer from "../components/program/ProgramListContainer";

const pageSize = 15;

export default function ProgramView() {
  Logger.logPrefix = "ProgramView";
  Logger.debug("ProgramView component instantiated.");

  const appContext = useContext(AppContext);
  const { roles } = useRoleLoggedIn();
  const [paginatePrograms, setPaginatePrograms] = useState([]);
  const [allProgramsList, setAllProgramsList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  Logger.debug("Initial state set.");

  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });

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
      setPaginatePrograms(data.slice(0, 15));
    }
  };

  useEffect(() => {
    Logger.debug("Running effect to fetch all programs.");
    getAllPrograms();
    document.title = "Programs";
  }, []);

  useEffect(() => {
    Logger.debug("Running effect to update paginated programs.");
    setPaginatePrograms(allProgramsList.slice(0, 15));
  }, [allProgramsList]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Container maxWidth="100%">
        {(roles.admin === "1" || roles.planner === "1") && (
          <AddProgramContainer
            getAllPrograms={getAllPrograms}
            allProgramsList={allProgramsList}
          />
        )}
        <Grid container rowSpacing={1}>
          <Card variant="outlined">
            <CardHeader title="Programs" variant="pageHeader" />
            <CardContent>
              <ProgramListContainer
                getAllPrograms={getAllPrograms}
                allProgramsList={allProgramsList}
                paginatePrograms={paginatePrograms}
                open={open}
                setOpen={setOpen}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
