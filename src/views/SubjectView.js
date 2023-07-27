import React, { useState, useEffect } from "react";
import SubjectListContainer from "../components/subject/SubjectListContainer";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddSubjectContainer from "../components/subject/AddSubjectContainer";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";
import SubjectFiltering from "../components/subject/SubjectFiltering";
import SubjectPagination from "../components/subject/SubjectPagination";
import Logger from "../logger/logger";

const pageSize = 15;

export default function SubjectView() {
  Logger.logPrefix = "SubjectView";
  Logger.debug("SubjectView component instantiated.");

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
    const { success, data } = await dao.fetchAllSubjects();
    if (!success) {
      Logger.error("getAllSubjects: failed to fetch all subjects.");
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Oops! Something went wrong on the server. No lessons found",
      });
      setAlertOpen(true);
      return;
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
        <AddSubjectContainer
          getAllSubjects={getAllSubjects}
          allSubjectsList={allSubjectsList}
        />
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
