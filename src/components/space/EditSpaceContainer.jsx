import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateEditSpace";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import EditSpaceForm from "./EditSpaceForm";

export default function EditSpaceContainer({
  singleSpace,
  getAllSpaces,
  setSingleSpace,
}) {
  const [buildingSelectList, setBuildingSelectList] = useState([]);
  const [spaceTypeSelectList, setSpaceTypeSelectList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "This is dialog",
    content: "Something here",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: singleSpace,
    validate: (values) => validate(values),
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to edit ${values.name}?`,
        content: `Press continue to save ${values.name}'s new information. `,
      });
      setDialogOpen(true);
      return;
    },
  });

  async function submitEditedSpace(values) {
    const capitalName = capitalizeFirstLetter(values.name);
    const editedSpace = {
      name: capitalName,
      area: values.area,
      info: values.info,
      personLimit: values.personLimit,
      buildingId: values.buildingId,
      availableFrom: values.availableFrom,
      availableTo: values.availableTo,
      classesFrom: values.classesFrom,
      classesTo: values.classesTo,
      inUse: Number(values.inUse),
      spaceTypeId: values.spaceTypeId ? values.spaceTypeId : null,
      id: values.id,
    };
    const result = await dao.editSpace(editedSpace);
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
      message: `${values.name}'s new information added.`,
    });
    setAlertOpen(true);
    setSingleSpace(formik.values);
    getAllSpaces();
  }

  const getBuildingsForSelect = async () => {
    const { httpStatus, data } = await dao.fetchAllBuildings();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      setBuildingSelectList(data);
    }
  };

  useEffect(() => {
    getBuildingsForSelect();
  }, []);

  const getSpaceTypesForSelect = async () => {
    const { httpStatus, data } = await dao.fetchAllSpaceTypes();
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
        submit={submitEditedSpace}
        submitValues={formik.values}
      />
      {singleSpace ? (
        <EditSpaceForm
          buildingSelectList={buildingSelectList}
          spaceTypeSelectList={spaceTypeSelectList}
          formik={formik}
        />
      ) : (
        ""
      )}
    </div>
  );
}
