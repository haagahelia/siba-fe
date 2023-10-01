import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddSubjectEquipment";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AddSubEquipForm from "./AddSubEquipForm";

export default function AddSubEquipContainer({
  singleSubject,
  equipmentsBySubId,
}) {
  const [equipmentSelectList, setEquipmentSelectList] = useState([]);
  const [initialSubEquip] = useState({
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

  const subId = singleSubject?.id;

  const getSubEquipBySubId = async function (subId) {
    const result = await equipmentsBySubId(subId);
    getEquipmentsForSelect(result);
  };

  useEffect(() => {
    getSubEquipBySubId(subId);
  }, []);

  const getEquipmentsForSelect = async function (subEquipList) {
    const { httpStatus, data } = await dao.fetchEquipmentData();

    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      // Here we filter out the already existing equipment in teaching
      let filteredList = [];

      // console.log(`data: ${data}`);
      // console.log(`subEquipList: ${subEquipList}`);
      // console.log(`subEquipList.length: ${subEquipList.length}`);
      if (subEquipList && typeof subEquipList.length === "number") {
        filteredList = data.filter((item) => {
          return !subEquipList.some((element) => {
            return element.equipmentId === item.id;
          });
        });
      }
      // console.log(`filteredList:${filteredList},first:${filteredList[0]}`);
      setEquipmentSelectList(filteredList);
    }
  };

  const formik = useFormik({
    initialValues: initialSubEquip,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        // Here we search for the name of the equipment
        // whose id corresponds to values.id
        title: `Are you sure you want to add ${
          equipmentSelectList.filter((i) => i.id === values.equipmentId)[0].name
        } ?`,
        content: `By clicking continue ${
          equipmentSelectList.filter((i) => i.id === values.equipmentId)[0].name
        } will be added to the class`,
      });
      setDialogOpen(true);
      return;
    },
  });

  const addSubjectEquipment = async (values) => {
    const newSubjectEquipment = {
      subjectId: values.subjectId,
      equipmentId: values.equipmentId,
      priority: values.priority,
      obligatory: Number.parseInt(values.obligatory),
    };
    const success = await dao.postNewSubjectEquipment(newSubjectEquipment);
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
      message: "Equipment added.",
    });
    setAlertOpen(true);
    formik.resetForm();
    getSubEquipBySubId(subId);
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
        submit={addSubjectEquipment}
        submitValues={formik.values}
      />
      <AddSubEquipForm
        equipmentSelectList={equipmentSelectList}
        singleSubject={singleSubject}
        formik={formik}
      />
    </div>
  );
}
