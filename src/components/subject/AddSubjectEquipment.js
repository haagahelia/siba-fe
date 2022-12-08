import React, { useState, useEffect } from "react";
import dao from "../../ajax/dao";
import AddSubjectEquipmentDialog from "./AddSubjectEquipmentDialog";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { validate } from "../../validation/ValidateAddSubjectEquipment";

export default function AddSubjectEquipment(props) {
  const { data } = props;

  const [equipmentList, setEquipmentList] = useState([]);
  const [initialSubEquip, setInitialSubEquip] = useState({
    subjectId: data?.id,
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

  let subId = data?.id;

  const getSubjectEquipment = async function (subId) {
    const data = await dao.getEquipmentBySubjectId(subId);

    equipment(data);
  };
  useEffect(() => {
    getSubjectEquipment(subId);
  }, []);

  const equipment = async function (subEquipList) {
    const data = await dao.getEquipmentNames();

    if (data === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen palvelimella. Varusteita ei löytynyt.",
      });
      setAlertOpen(true);
      return;
    } else {
      const filteredList = data.filter((item) => {
        return !subEquipList.some((element) => {
          return element.equipmentId === item.id;
        });
      });
      setEquipmentList(filteredList);
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
  };

  return (
    <div>
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        confirmfunction={addSubjectEquipment}
        functionparam={formik.values}
      />
      <AddSubjectEquipmentDialog
        equipmentList={equipmentList}
        data={data}
        addSubjectEquipment={addSubjectEquipment}
        formik={formik}
        values={formik.values}
        setInitialSubEquip={setInitialSubEquip}
      />
    </div>
  );
}
