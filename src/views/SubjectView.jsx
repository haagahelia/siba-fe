// The Lessons Page
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AllocRoundContext, AppContext } from "../AppContext";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import Logger from "../logger/logger";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AlertBox from "../components/common/AlertBox";
import AddSubjectContainer from "../components/subject/AddSubjectContainer";
import SubjectFiltering from "../components/subject/SubjectFiltering";
import SubjectListContainer from "../components/subject/SubjectListContainer";
import SubjectPagination from "../components/subject/SubjectPagination";

const pageSize = 15;

export default function SubjectView() {
  Logger.logPrefix = "SubjectView";
  Logger.debug("SubjectView component instantiated.");

  const appContext = useContext(AppContext);
  const { allocRoundContext } = useContext(AllocRoundContext);

  let { subjectIdToShow } = useParams();
  const [subjectIdToShowState, setSubjectIdToShowState] =
    useState(subjectIdToShow);
  const [shownSubject, setShownSubject] = useState(null);
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
    Logger.debug(
      "getAllSubjects: fetching all subjects in allocRound, from server.",
    );
    console.log("allocRoundId", allocRoundContext.allocRoundId);
    const { httpStatus, data } = await dao.fetchAllSubjects(
      allocRoundContext.allocRoundId,
    );
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
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
    const getShownSubjectById = async (subjectIdToShowState) => {
      Logger.debug(
        `subjectId: ${subjectIdToShowState} Starting or not? Based on that id.`,
      );
      if (subjectIdToShowState) {
        Logger.debug("getShownSubjectById: starts");
        const { httpStatus, data } =
          await dao.fetchSubjectById(subjectIdToShowState);
        if (httpStatus !== 200) {
          ajaxRequestErrorHandler(
            httpStatus,
            getFunctionName(2),
            setAlertOptions,
            setAlertOpen,
          );
        } else {
          Logger.debug(
            `getShownSubjectById: successfully fetched ${data[0].id}:${data[0].name} subject.`,
          );
          setShownSubject(data[0]);
          //setOpen(true);
          setSubjectIdToShowState(0);
          subjectIdToShow = 0;
        }
      } else {
        Logger.debug("No subject to show directly");
      }
    };

    Logger.debug("Running effect to fetch possible directly shown subejct.");
    getShownSubjectById(subjectIdToShowState);
  }, [subjectIdToShowState, subjectIdToShow]);

  useEffect(() => {
    Logger.debug("Running effect to fetch all subjects.");
    getAllSubjects();
  }, []);

  useEffect(() => {
    Logger.debug("Running effect to update paginated subjects.");
    setPaginateSubjects(allSubjectsList.slice(0, 15));
  }, [allSubjectsList]);

  useEffect(() => {
    document.title = "Lessons";
  }, []);

  useEffect(() => {
    (async () => {})();
  }, []);

  useEffect(() => {
    const foo = async () => {};
    foo();
  }, []);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Container maxWidth="100%">
        {appContext.roles.admin || appContext.roles.planner ? (
          <AddSubjectContainer
            getAllSubjects={getAllSubjects}
            allSubjectsList={allSubjectsList}
          />
        ) : (
          <Typography variant="subtitle1" mt={3}>
            "Not showing add subject to your role"
          </Typography>
        )}
        <Grid container rowSpacing={1}>
          <Card variant="outlined">
            <CardHeader
              title={
                <>
                  Lessons -
                  <span className="allocRoundHeader">
                    {` ${allocRoundContext.allocRoundId} : ${allocRoundContext.allocRoundName}`}
                  </span>
                </>
              }
              variant="pageHeader"
            />
            <CardContent>
              <SubjectFiltering
                allSubjectsList={allSubjectsList}
                setAllSubjectsList={setAllSubjectsList}
                paginateSubjects={paginateSubjects}
                setPaginateSubjects={setPaginateSubjects}
                pagination={pagination}
              />
              <SubjectListContainer
                shownSubject={shownSubject}
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
