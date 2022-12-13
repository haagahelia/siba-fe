import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { validate } from "../../validation/ValidateEditSubjectEquipment";
import AlertBox from "../common/AlertBox";
import dao from "../../ajax/dao";
import EditSubjectEquipmentForm from "./EditSubjectEquipmentForm";

export default function EditSubjectEquipment(props) {
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

  const [editSubEquip, setEditSubEquip] = useState({
    priority: null,
    obligatory: null,
    subjectId: null,
    equipmentId: null,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialEquipValues,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title:
          `Haluatko varmasti muuttaa ${initialEquipValues.name} tietoja?`,
        content:
          `Painamalla jatka, tallennat ${initialEquipValues.name} uudet tiedot. `,
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

    let result = await dao.editSubjectEquipment(editedSubEquip);

    if (result === 400) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen - yritä hetken kuluttua uudestaan.",
      });
      setAlertOpen(true);
      return;
    }
    if (result === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message:
          "Jokin meni pieleen palvelimella - yritä hetken kuluttua uudestaan.",
      });
      setAlertOpen(true);
      return;
    }
    if (result === "error") {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen - yritä hetken kuluttua uudestaan.",
      });

      setAlertOpen(true);
      return;
    }
    setAlertOptions({
      severity: "success",
      title: "Onnistui!",
      message: `${values.name} uudet tiedot lisätty.`,
    });
    setAlertOpen(true);
    getEquipmentsBySubId(subId);
  }
  const getEquipmentPriority = async function () {
    const data = await dao.fetchEquipmentData();
    if (data === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen palvelimella. Varusteita ei löytynyt.",
      });
      setAlertOpen(true);
      return;
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
        confirmfunction={submitEditedSubjectEquip}
        functionparam={formik.values}
      />
      <EditSubjectEquipmentForm
        formik={formik}
        editSubEquip={editSubEquip}
        setEditSubEquip={setEditSubEquip}
        equipmentPriorityList={equipmentPriorityList}
      />
    </div>
  );
}
