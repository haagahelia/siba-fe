import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import { validate } from "../../validation/ValidateAddAllocRound";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import CopyAllocRoundContainer from "./CopyAllocRoundContainer";

export const CopyAllocRound = ({ allAllocRoundsList }) => {
  const { userId } = useContext(AppContext);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "Error",
    message: "",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "Confirm",
    content: "",
  });
  const [initialAllocRound, setInitialEmptyAllocRound] = useState({
    name: "",
    description: "",
    copiedAllocRoundId: "",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialAllocRound,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to copy allocation ${values.copiedAllocRoundId}
           as ${values.name}?`,
        content: `By clicking continue, ${values.name} will be created as separate copy. With it's subjects and subjectEquipments`,
        onConfirm: () => handleCopyAllocRoundSubmit(values),
      });
      setDialogOpen(true);
    },
  });

  const resetForm = () => {
    setInitialEmptyAllocRound({
      name: "",
      description: "",
      copiedAllocRoundId: -2,
      userId: -2,
    });
  };

  const handleCopyAllocRoundSubmit = async (event) => {
    event.preventDefault();
    formik.handleSubmit();
    const { name, description, copiedAllocRoundId } = formik.values;

    Logger.debug(
      `Trying to create a copy of alloc round with: ${name},${description},${copiedAllocRoundId},${userId}`,
    );

    const response = await dao.copyAllocRound(
      name,
      description,
      userId,
      copiedAllocRoundId,
    );

    Logger.debug(`Response Data: ${response.data}`);

    if (response.success) {
      const idOfNewAllocation = response.data.returnedNumberValue;
      setAlertOptions({
        severity: "success",
        title: "Success",
        message: `Existing allocation ${copiedAllocRoundId} copied \n as ${idOfNewAllocation} : ${name} successfully.`,
      });
      resetForm();
    } else {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Failed to copy allocation round.",
      });
    }
    setAlertOpen(true);
  };
  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={handleCopyAllocRoundSubmit}
        submitValues={formik.values}
      />
      <Card variant="outlined">
        <CardContent>
          <CardHeader title="... OR Copy existing allocation round as separate copy" />
          <CopyAllocRoundContainer
            formik={formik}
            submitValues={formik.values}
            setInitialAllocRound={setInitialEmptyAllocRound}
            allAllocRoundsList={allAllocRoundsList}
            handleCopyAllocRoundSubmit={handleCopyAllocRoundSubmit}
          />
        </CardContent>
      </Card>
    </>
  );
};
