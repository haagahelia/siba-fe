import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { AllocRoundContext } from "../../AppContext";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateEditSubject";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import EditSubjectForm from "./EditSubjectForm";

export default function EditSubjectContainer({
  singleSubject,
  getAllSubjects,
  setSingleSubject,
}) {
  // Whenever the editSubject changes in the SubjectList.jsx file,
  // that information comes here as singleSubject
  const [programSelectList, setProgramSelectList] = useState([
    { id: 3009, name: "Globulist Muusic" },
  ]);
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

  const { allocRoundContext } = useContext(AllocRoundContext);

  const formik = useFormik({
    // enableReinitialize checks if Formik needs to reset the form
    // if the initial values change
    enableReinitialize: true,
    initialValues: singleSubject,
    validate: (values) => validate(values, allocRoundContext.allocRoundId),
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to edit ${values.name}?`,
        content: `Press continue to save ${values.name} new information. `,
      });
      setDialogOpen(true);
      return;
    },
  });

  async function submitEditedSubject(values) {
    const capitalName = capitalizeFirstLetter(values.name);
    const editedSubject = {
      id: values.id,
      name: capitalName,
      groupSize: values.groupSize,
      groupCount: values.groupCount,
      sessionLength: values.sessionLength,
      sessionCount: values.sessionCount,
      area: values.area,
      programId: values.programId,
      spaceTypeId: values.spaceTypeId ? values.spaceTypeId : null,
      allocRoundId: allocRoundContext.allocRoundId,
    };
    const result = await dao.editSubject(editedSubject);
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
      message: `${values.name} information edited.`,
    });
    setAlertOpen(true);
    setSingleSubject(formik.values);
    getAllSubjects();
  }

  const getProgramsForSelect = async function () {
    const { httpStatus, data } = await dao.fetchProgramsWithDepartments();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
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
