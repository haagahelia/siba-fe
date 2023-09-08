import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import {
  validate,
  capitalizeFirstLetter,
} from "../../validation/ValidateEditSubject";
import AlertBox from "../common/AlertBox";
import dao from "../../ajax/dao";
import EditSubjectForm from "./EditSubjectForm";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";

export default function EditSubjectContainer(props) {
  // Whenever the editSubject changes in the subjectList.js file, that information comes here as singleSubject
  const { singleSubject, getAllSubjects, setSingleSubject } = props;
  const [programSelectList, setProgramSelectList] = useState([]);
  const [spaceTypeSelectList, setSpaceTypeSelectList] = useState([]);
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

  const formik = useFormik({
    // enableReinitialize checks if Formik needs to reset the form if the initial values ​​change
    enableReinitialize: true,
    initialValues: singleSubject,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to edit ${values.subjectName}?`,
        content: `Press continue to save ${values.subjectName} new information. `,
      });
      setDialogOpen(true);
      return;
    },
  });

  async function submitEditedSubject(values) {
    let capitalName = capitalizeFirstLetter(values.subjectName);
    let editedSubject = {
      name: capitalName,
      groupSize: values.groupSize,
      groupCount: values.groupCount,
      sessionLength: values.sessionLength,
      sessionCount: values.sessionCount,
      area: values.area,
      programId: values.programId,
      spaceTypeId: values.spaceTypeId ? values.spaceTypeId : null,
      id: values.id,
    };
    let result = await dao.editSubject(editedSubject);
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
      message: `${values.subjectName} new information added.`,
    });
    setAlertOpen(true);
    setSingleSubject(formik.values);
    getAllSubjects();
  }

  const getProgramsForSelect = async function () {
    const { success, data } = await dao.fetchProgramsForSelect();
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong on the server. No majors found.",
      });
      setAlertOpen(true);
      return;
    }
    setProgramSelectList(data);
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
        submit={submitEditedSubject}
        submitValues={formik.values}
      />
      <EditSubjectForm
        programSelectList={programSelectList}
        spaceTypeSelectList={spaceTypeSelectList}
        formik={formik}
      />
    </div>
  );
}
