import React, { useState, useEffect } from "react";
import dao from "../../ajax/dao";
import AddSubjectEquipmentForm from "./AddSubjectEquipmentForm";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { validate } from "../../validation/ValidateAddSubjectEquipment";
import AlertBox from "../common/AlertBox";

export default function AddSubjectEquipment(props) {
  const { singleSubject, equipmentsBySubId } = props;
  const [equipmentSelectList, setEquipmentSelectList] = useState([]);
  const [initialSubEquip, setInitialSubEquip] = useState({
    subjectId: singleSubject?.id,
    equipmentId: 0,
    priority: 0,
    obligatory: 1,
  });

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

  let subId = singleSubject?.id;

  const getSubEquipBySubId = async function (subId) {
    let result = await equipmentsBySubId(subId);
    getEquipmentsForSelect(result);
  };

  useEffect(() => {
    getSubEquipBySubId(subId);
  }, []);

  const getEquipmentsForSelect = async function (subEquipList) {
    const result = await dao.fetchEquipmentData();

    if (result === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen palvelimella. Varusteita ei löytynyt.",
      });
      setAlertOpen(true);
      return;
    } else {
      // Tässä suodetetaan pois jo olemassa olevat varustukset opetuksessa
      const filteredList = result.filter((item) => {
        return !subEquipList.some((element) => {
          return element.equipmentId === item.id;
        });
      });
      setEquipmentSelectList(filteredList);
    }
  };

  const formik = useFormik({
    initialValues: initialSubEquip,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: "Haluatko varmasti lisätä varusteen?",
        content: "Painamalla jatka, varuste lisätään opetukseen",
      });
      setDialogOpen(true);
      return;
    },
  });

  const addSubjectEquipment = async (values) => {
    let newSubjectEquipment = {
      subjectId: values.subjectId,
      equipmentId: values.equipmentId,
      priority: values.priority,
      obligatory: Number.parseInt(values.obligatory),
    };
    let result = await dao.postNewSubjectEquipment(newSubjectEquipment);
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
        message:
          "Jokin meni pieleen palvelimella - yritä hetken kuluttua uudestaan.",
      });
      setAlertOpen(true);
      return;
    }
    setAlertOptions({
      severity: "success",
      title: "Onnistui!",
      message: "Varuste lisätty.",
    });
    setAlertOpen(true);

    getSubEquipBySubId(subId);
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      ></AlertBox>
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        confirmfunction={addSubjectEquipment}
        functionparam={formik.values}
      />
      <AddSubjectEquipmentForm
        equipmentSelectList={equipmentSelectList}
        singleSubject={singleSubject}
        formik={formik}
        submitValues={formik.values}
      />
    </div>
  );
}
