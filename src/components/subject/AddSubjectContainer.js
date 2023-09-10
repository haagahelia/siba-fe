import React, { useState, useEffect } from "react";
import { CardHeader, Card, CardContent } from "@mui/material";
import AlertBox from "../common/AlertBox";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import {
  validate,
  capitalizeFirstLetter,
} from "../../validation/ValidateAddSubject";
import dao from "../../ajax/dao";
import AddSubjectForm from "./AddSubjectForm";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";

//const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;
//import {BASEURL} from "../config/consts.js";
//const baseUrl = BASEURL;

export default function AddSubjectContainer(props) {
  const { getAllSubjects, allSubjectsList } = props;
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
  // Here the initialvalues ​​of the form are stored in the state
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
    const { httpStatus, data } = await dao.fetchProgramsForSelect();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      //console.log(data);
      setProgramSelectList(data);
    }
  };
  useEffect(() => {
    getProgramsForSelect();
  }, []);

  const getSpaceTypesForSelect = async function () {
    const { httpStatus, data } = await dao.fetchSpacetypeForSelect();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      setSpaceTypeSelectList(data);
    }
  };
  useEffect(() => {
    getSpaceTypesForSelect();
  }, []);

  const addSubject = async (submitValues) => {
    let capitalName = capitalizeFirstLetter(submitValues.name);
    let newSubject = {
      name: capitalName,
      groupSize: submitValues.groupSize,
      groupCount: submitValues.groupCount,
      sessionLength: submitValues.sessionLength,
      sessionCount: submitValues.sessionCount,
      area: submitValues.area,
      programId: submitValues.programId,
      spaceTypeId: submitValues.spaceTypeId ? submitValues.spaceTypeId : null,
    };

    let result = await dao.postNewSubject(newSubject);
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
  // When you choose a lesson, the information goes to the form's initialvalues
  const handleChange = (e) => {
    let selected = e.target.value;
    setInitialSubject({
      name: formik.values.name, // This is so that the entered name does not change even if you select the data of an existing lesson
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
          <CardHeader title="Add lesson" />
          <AddSubjectForm
            handleChange={handleChange}
            programSelectList={programSelectList}
            formik={formik}
            submitValues={formik.values}
            setInitialSubject={setInitialSubject}
            allSubjectsList={allSubjectsList}
            spaceTypeSelectList={spaceTypeSelectList}
          />
        </CardContent>
      </Card>
    </div>
  );
}
