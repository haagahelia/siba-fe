import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { validate } from "../../validation/ValidateEditSubjectEquipment";
import AlertBox from "../common/AlertBox";
import dao from "../../ajax/dao";
import EditSubEquipForm from "./EditSubEquipForm";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";

export default function EditSubEquipContainer(props) {
  const { subId, equipId, prio, obli, name, getEquipmentsBySubId } = props;

  const [equipmentPriorityList, setEquipmentPriorityList] = useState([]);
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
  const [initialEquipValues, setInitialEquipValues] = useState({
    subjectId: subId,
    equipmentId: equipId,
    priority: prio,
    obligatory: obli,
    name: name,
  });

  const formik = useFormik({
    // enableReinitialize checks if Formik needs to reset the form if the initial values ​​change
    enableReinitialize: true,
    initialValues: initialEquipValues,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to edit ${initialEquipValues.name}?`,
        content: `Press continue to save ${initialEquipValues.name} new information. `,
      });
      setDialogOpen(true);
      return;
    },
  });

  async function submitEditedSubjectEquip(values) {
    let editedSubEquip = {
      priority: values.priority,
      obligatory: values.obligatory,
      subjectId: values.subjectId,
      equipmentId: values.equipmentId,
    };

    let success = await dao.editSubjectEquipment(editedSubEquip);

    if (!success) {
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
      message: `${values.name} new information added.`,
    });
    setAlertOpen(true);
    // The form resets and gets the new modified initialValues
    formik.resetForm(setInitialEquipValues(formik.values));
    getEquipmentsBySubId(subId);
  }
  const getEquipmentPriority = async function () {
    const { httpStatus, data } = await dao.fetchEquipmentData();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      setEquipmentPriorityList(data);
    }
  };

  useEffect(() => {
    getEquipmentPriority();
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
        submit={submitEditedSubjectEquip}
        submitValues={formik.values}
      />
      <EditSubEquipForm
        formik={formik}
        equipmentPriorityList={equipmentPriorityList}
        subId={subId}
      />
    </div>
  );
}
