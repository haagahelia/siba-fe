import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddSpaceEquipment";

import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AddSpaceEquipForm from "./AddSpaceEquipForm";

export default function AddSpaceEquipContainer({
  singleSpace,
  equipmentsBySpaceId,
}) {
  const [equipmentSelectList, setEquipmentSelectList] = useState([]);
  const [initialSpaceEquip] = useState({
    spaceId: singleSpace?.id,
    equipmentId: 0,
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

  const spaceId = singleSpace?.id;

  const getSpaceEquipBySpaceId = async function (spaceId) {
    const result = await equipmentsBySpaceId(spaceId);
    getEquipmentsForSelect(result);
  };

  useEffect(() => {
    getSpaceEquipBySpaceId(spaceId);
  }, []);

  const getEquipmentsForSelect = async function (spaceEquipList) {
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
      if (spaceEquipList && typeof spaceEquipList.length === "number") {
        filteredList = data.filter((item) => {
          return !spaceEquipList.some((element) => {
            return element.equipmentId === item.id;
          });
        });
      }
      // console.log(`filteredList:${filteredList},first:${filteredList[0]}`);
      setEquipmentSelectList(filteredList);
    }
  };

  const formik = useFormik({
    initialValues: initialSpaceEquip,
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
        } will be added to the space`,
      });
      setDialogOpen(true);
      return;
    },
  });

  const addSpaceEquipment = async (values) => {
    const newSpaceEquipment = {
      spaceId: values.spaceId,
      equipmentId: values.equipmentId,
    };
    const success = await dao.postNewSpaceEquipment(newSpaceEquipment);
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
    getSpaceEquipBySpaceId(spaceId);
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
        submit={addSpaceEquipment}
        submitValues={formik.values}
      />
      <AddSpaceEquipForm
        equipmentSelectList={equipmentSelectList}
        singleSpace={singleSpace}
        formik={formik}
      />
    </div>
  );
}
