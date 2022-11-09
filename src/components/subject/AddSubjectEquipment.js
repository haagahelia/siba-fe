import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import dao from "../../ajax/dao";
import AddSubjectEquipmentDialog from "./AddSubjectEquipmentDialog";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function AddSubjectEquipment(props) {
  const { data } = props;
  const [equipmentList, setEquipmentList] = useState([]);
  const [initialSubEquip, setInitialSubEquip] = useState({
    subjectId: data?.id,
    equipmentId: null,
    priority: null,
    obligatory: null,
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

  const equipment = async function () {
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
      setEquipmentList(data);
    }
  };
  useEffect(() => {
    equipment();
  }, []);

  const formik = useFormik({
    initialValues: initialSubEquip,
    // validate,
    onSubmit: (values) => {
      console.log("values after submit", values); //Tähän tulee kaikki tiedot
      //  addSubjectEquipment(values);
      setDialogOptions({
        title: "Haluatko varmasti lisätä varusteen?",
        content: "Painamalla jatka, varuste lisätään opetukseen",
      });
      setDialogOpen(true);
      return;
    },
  });

  const addSubjectEquipment = async (values) => {
    console.log("add values", values); // Noniin tulee tännekkin
    //let subID = data?.id;
    let newSubjectEquipment = {
      subjectId: values.subjectId,
      equipmentId: values.equipmentId,
      priority: Number.parseInt(values.priority),
      obligatory: Number.parseInt(values.obligatory),
    };
    console.log("addSubNEW", newSubjectEquipment); // so far so good
    let result = await dao.postNewSubjectEquipment(newSubjectEquipment);
    console.log("result", result); // 404
    // if (result === 400) {
    //   setAlertOptions({
    //     severity: "error",
    //     title: "Virhe",
    //     message: "Jokin meni pieleen - yritä hetken kuluttua uudestaan.",
    //   });
    //   setAlertOpen(true);
    //   return;
    // }
    // if (result === 500) {
    //   setAlertOptions({
    //     severity: "error",
    //     title: "Virhe",
    //     message:
    //       "Jokin meni pieleen palvelimella - yritä hetken kuluttua uudestaan.",
    //   });
    //   setAlertOpen(true);
    //   return;
    // }
    // if (result === "error") {
    //   setAlertOptions({
    //     severity: "error",
    //     title: "Virhe",
    //     message:
    //       "Jokin meni pieleen palvelimella - yritä hetken kuluttua uudestaan.",
    //   });
    //   setAlertOpen(true);
    //   return;
    // }
  };

  //   const handleChange = (e) => {
  //     let selected = e.target.value;
  //     console.log("First select:", selected);
  //     setNewSubjectEquipment({
  //       //subjectId: selected.subjectId,
  //       // ...newSubjectEquipment,
  //       equipmentId: selected.equipmentId,
  //       //  priority: selected.priority,
  //     });
  //     console.log("selected", selected);
  //   };

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
        // handleChange={handleChange}
        formik={formik}
        values={formik.values}
        setInitialSubEquip={setInitialSubEquip}
        initialSubEquip={initialSubEquip}
      />
    </div>
  );
}
