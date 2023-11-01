import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AddDepartmentPlannerForm from "./AddDepartmentPlannerForm";

export default function AddDepartmentPlannerContainer({
  singleUser,
  getDeparmentsByUserId,
  getAllUsers,
}) {
  const [departmentSelectList, setDepartmentSelectList] = useState([]);
  const [initialDepartment] = useState({
    departmentId: 0,
    userId: singleUser?.id,
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

  const userId = singleUser?.id;

  const getUserDepartmentsByUserId = async function (userId) {
    const result = await getDeparmentsByUserId(userId);
    getDepartmentsForSelect(result);
  };

  useEffect(() => {
    getUserDepartmentsByUserId(userId);
  }, []);

  const getDepartmentsForSelect = async function (userDepartments) {
    Logger.debug(
      "getDepartmentsForSelect: fetching all departments for select.",
    );
    const { httpStatus, data } = await dao.fetchAllDepartmentData();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      let filteredList = [];
      if (userDepartments && typeof userDepartments.length === "number") {
        filteredList = data.filter((item) => {
          return !userDepartments.some((element) => {
            return element.id === item.id;
          });
        });
      }
      setDepartmentSelectList(filteredList);
    }
  };

  const formik = useFormik({
    initialValues: initialDepartment,
    onSubmit: (values) => {
      setDialogOptions({
        // Here we search for the name of the department
        // whose id corresponds to values.id
        title: `Are you sure you want to add ${
          departmentSelectList.filter((i) => i.id === values.departmentId)[0]
            .name
        } ?`,
        content: `By clicking continue ${
          departmentSelectList.filter((i) => i.id === values.departmentId)[0]
            .name
        } will be added to the class`,
      });
      setDialogOpen(true);
      return;
    },
  });

  const addUserDepartment = async (values) => {
    console.log(values);
    const newDepartmentPlanner = {
      departmentId: values.departmentId,
      userId: values.userId,
    };
    const success = await dao.postNewDepartmentPlanner(newDepartmentPlanner);
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
      message: "Department added.",
    });
    setAlertOpen(true);
    formik.resetForm();
    getDeparmentsByUserId(singleUser?.id);
    getAllUsers();
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
        submit={addUserDepartment}
        submitValues={formik.values}
      />
      <AddDepartmentPlannerForm
        departmentSelectList={departmentSelectList}
        singleUser={singleUser}
        formik={formik}
      />
    </div>
  );
}
