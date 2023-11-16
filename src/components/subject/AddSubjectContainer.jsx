import { AppContext } from "../../AppContext";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import {
  capitalizeFirstLetter,
  validate,
} from "../../validation/ValidateAddSubject";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AddSubjectForm from "./AddSubjectForm";
import ImportSubjectContainer from "./ImportSubjectContainer";
import SubjectTemplate from "./SubjectTemplate";

export default function AddSubjectContainer({
  getAllSubjects,
  allSubjectsList,
}) {

  const appContext = useContext(AppContext);
  // State for checking if Add Lesson card is expanded
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const [programSelectList, setProgramSelectList] = useState([
    { id: 3009, name: "Globalist music" },
  ]);
  const [spaceTypeSelectList, setSpaceTypeSelectList] = useState([
    { id: 5004, name: "Musicalist room" },
  ]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });
  // Here the initial values of the form are stored in the state
  const [initialSubject, setInitialSubject] = useState({
    name: "",
    groupSize: 0,
    groupCount: 0,
    sessionLength: "",
    sessionCount: 0,
    area: 0,
    programId: 3009,
    spaceTypeId: 5004,
  });

  const resetForm = () => {
    setInitialSubject({
      name: "",
      groupSize: 0,
      groupCount: 0,
      sessionLength: "",
      sessionCount: 0,
      area: 0,
      programId: 3009,
      spaceTypeId: 5004,
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialSubject,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to add ${values.name}?`,
        content: `By clicking continue, ${values.name} will be added to the teaching list`,
      });
      setDialogOpen(true);
      return;
    },
  });

  const getProgramsForSelect = async function () {
    Logger.debug(
      "getProgramsForSelect: fetching all programs for select from server.",
    );
    const { httpStatus, data } = await dao.fetchProgramsForSelect();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      setProgramSelectList(data);
      Logger.debug("getProgramsForSelect: successfully fetched programs.");
    }
  };

  useEffect(() => {
    getProgramsForSelect();
  }, []);

  const getSpaceTypesForSelect = async function () {
    Logger.debug(
      "getSpaceTypesForSelect: fetching all Space Types for select from server.",
    );
    const { httpStatus, data } = await dao.fetchSpacetypeForSelect();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug(
        "getSpaceTypesForSelect: successfully fetched Space Types for select.",
      );
      setSpaceTypeSelectList(data);
    }
  };

  useEffect(() => {
    getSpaceTypesForSelect();
  }, []);

  const addSubject = async (submitValues) => {
    const capitalName = capitalizeFirstLetter(submitValues.name);
    const newSubject = {
      name: capitalName,
      groupSize: submitValues.groupSize,
      groupCount: submitValues.groupCount,
      sessionLength: submitValues.sessionLength,
      sessionCount: submitValues.sessionCount,
      area: submitValues.area,
      programId: submitValues.programId,
      spaceTypeId: submitValues.spaceTypeId ? submitValues.spaceTypeId : null,
    };

    const result = await dao.postNewSubject(newSubject);
    if (!result) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
      setAlertOpen(true);
      return;
    }
    setAlertOptions({
      severity: "success",
      title: "Success!",
      message: `${submitValues.name} added.`,
    });
    setAlertOpen(true);
    resetForm();
    getAllSubjects();
  };

  // Here is a list of lessons
  // When you choose a lesson, the information goes to the form's initial values
  const handleChange = (e) => {
    const selected = e.target.value;
    setInitialSubject({
      // This is so that the entered name does not change
      // even if you select the data of an existing lesson
      name: formik.values.name,

      groupSize: selected.groupSize,
      groupCount: selected.groupCount,
      sessionLength: selected.sessionLength,
      sessionCount: selected.sessionCount,
      area: selected.area,
      programId: selected.programId,
      spaceTypeId: selected.spaceTypeId,
    });
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={addSubject}
        submitValues={formik.values}
      />
      <Card variant="outlined">
        <CardContent>
          <CardHeader
            title={
              <>
                Lessons -
                <span className="allocRoundHeader">
                  {` ${appContext.allocRoundId} : ${appContext.allocRoundName}`}
                </span>
              </>
            }
            variant="pageHeader"
            action={
              <IconButton
                onClick={() => setIsCardExpanded(!isCardExpanded)}
                aria-expanded={isCardExpanded}
                aria-label="expand/collapse"
                color="primary"
              >
                {isCardExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            }
          />
          {isCardExpanded && (
            <>
              {/* The extra program selection dropdown has been removed */}
              <AddSubjectForm
                handleChange={handleChange}
                programSelectList={programSelectList}
                formik={formik}
                submitValues={formik.values}
                setInitialSubject={setInitialSubject}
                allSubjectsList={allSubjectsList}
                spaceTypeSelectList={spaceTypeSelectList}
              />
              <ImportSubjectContainer
                getAllSubjects={getAllSubjects}
                spaceTypeSelectList={spaceTypeSelectList}
              />
              <SubjectTemplate />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
