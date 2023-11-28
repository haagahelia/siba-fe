import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { AllocRoundContext } from "../../AppContext";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import {
  capitalizeFirstLetter,
  validate,
} from "../../validation/ValidateAddProgram";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AddProgramForm from "./AddProgramForm";

export default function AddProgramContainer({
  getAllPrograms,
  allProgramsList,
}) {
  const { allocRoundContext } = useContext(AllocRoundContext);
  // State for checking if Add Program card is expanded
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const [departmentSelectList, setDepartmentSelectList] = useState([
    { id: 101, name: "Jazz" },
  ]);
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
  // Here the initial values of the form are stored in the state
  const [initialProgram, setInitialProgram] = useState({
    name: "",
    departmentId: 101,
  });

  const resetForm = () => {
    setInitialProgram({
      name: "",
      departmentId: 101,
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialProgram,
    validate:(values)=>{validate(values)} ,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to add ${values.name}?`,
        content: `By clicking continue, ${values.name} will be added to the teaching list`,
      });
      setDialogOpen(true);
      return;
    },
  });

  const getDepartmentForSelect = async function () {
    Logger.debug(
      "getDepartmentForSelect: fetching all Departments for select from server.",
    );
    const { httpStatus, data } = await dao.fetchDepartmentForSelect();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug(
        "getDepartmentForSelect: successfully fetched Space Types for select.",
      );
      setDepartmentSelectList(data);
    }
  };

  useEffect(() => {
    getDepartmentForSelect();
  }, []);

  const addProgram = async (submitValues) => {
    const capitalName = capitalizeFirstLetter(submitValues.name);
    const newProgram = {
      name: capitalName,
      departmentId: submitValues.departmentId ? +submitValues.departmentId : null,
    };

    const result = await dao.postNewProgram(newProgram);
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
      message: `${submitValues.name} added.`,
    });
    setAlertOpen(true);
    resetForm();
    getAllPrograms();
  };

  // Here is a list of lessons
  // When you choose a lesson, the information goes to the form's initial values
  const handleChange = (e) => {
    const selected = e.target.value;
    setInitialProgram({
      // This is so that the entered name does not change
      // even if you select the data of an existing lesson
      name: formik.values.name,
      departmentId: selected.departmentIdId,
    });
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
        submit={addProgram}
        submitValues={formik.values}
      />
      <Card variant="outlined">
        <CardContent>
          <CardHeader
            title={
              <>
                Add Program
              </>
            }
            variant="pageHeader"
            action={
              <IconButton
                onClick={() => setIsCardExpanded(!isCardExpanded)}
                aria-expanded={isCardExpanded}
                aria-label="expand/collapse"
                color="primary"
              >
                {isCardExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            }
          />
          {isCardExpanded && (
            <>
              <AddProgramForm
                handleChange={handleChange}
                formik={formik}
                submitValues={formik.values}
                setInitialProgram={setInitialProgram}
                allProgramsList={allProgramsList}
                departmentSelectList={departmentSelectList}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
