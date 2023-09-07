import React, { useState, useEffect, useContext } from "react";
import SubjectListContainer from "../components/subject/SubjectListContainer";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddSubjectContainer from "../components/subject/AddSubjectContainer";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";
import SubjectFiltering from "../components/subject/SubjectFiltering";
import SubjectPagination from "../components/subject/SubjectPagination";
import { AppContext } from "../AppContext";
import Logger from "../logger/logger";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";

const pageSize = 15;

export default function SubjectView() {
  Logger.logPrefix = "SubjectView";
  Logger.debug("SubjectView component instantiated.");

  const appContext = useContext(AppContext);

  const [paginateSubjects, setPaginateSubjects] = useState([]);
  const [allSubjectsList, setAllSubjectsList] = useState([]);
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

  const getAllSubjects = async function () {
    Logger.debug("getAllSubjects: fetching all subjects from server.");
    const { httpStatus, data } = await dao.fetchAllSubjects();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2), // View name, 2 = parent of the caller function
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug(
        `getAllSubjects: successfully fetched ${data.length} subjects.`,
      );
      setAllSubjectsList(data);
      setPaginateSubjects(data.slice(0, 15));
    }
  };

  useEffect(() => {
    Logger.debug("Running effect to fetch all subjects.");
    getAllSubjects();
  }, []);

  useEffect(() => {
    Logger.debug("Running effect to update paginated subjects.");
    setPaginateSubjects(allSubjectsList.slice(0, 15));
  }, [allSubjectsList]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Container maxWidth="100%">
        {appContext.roles.admin ? (
          <AddSubjectContainer
            getAllSubjects={getAllSubjects}
            allSubjectsList={allSubjectsList}
          />
        ) : (
          <Typography variant="subtitle1">
            <br />
            <br />
            <br />
            "Not showing add subject to your role"
          </Typography>
        )}
        <Grid container rowSpacing={1}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Lessons" />
              <SubjectFiltering
                allSubjectsList={allSubjectsList}
                setAllSubjectsList={setAllSubjectsList}
                paginateSubjects={paginateSubjects}
                setPaginateSubjects={setPaginateSubjects}
                pagination={pagination}
              />
              <SubjectListContainer
                getAllSubjects={getAllSubjects}
                allSubjectsList={allSubjectsList}
                paginateSubjects={paginateSubjects}
                open={open}
                setOpen={setOpen}
              />
              <SubjectPagination
                pagination={pagination}
                setPagination={setPagination}
                allSubjectsList={allSubjectsList}
                paginateSubjects={paginateSubjects}
                setPaginateSubjects={setPaginateSubjects}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
