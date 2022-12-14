import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import {
  validate,
  capitalizeFirstLetter,
} from "../../validation/ValidateEditSubject";
import AlertBox from "../common/AlertBox";
import dao from "../../ajax/dao";
import EditSubjectForm from "./EditSubjectForm";

export default function EditSubject(props) {
  // Aina kun editSubject muuttuu subjectList.js filussa ne tiedot tulee tähän nimellä singleSubject
  const { singleSubject, getAllSubjects, setSingleSubject } = props;
  const [programSelectList, setProgramSelectList] = useState([]);
  const [spaceTypeSelectList, setSpaceTypeSelectList] = useState([]);
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
  const [editSubject, setEditSubject] = useState({
    id: null,
    name: null,
    groupSize: null,
    groupCount: null,
    sessionLength: null,
    sessionCount: null,
    area: null,
    programId: null,
    subjectName: null,
    spaceTypeId: null,
  });

  const formik = useFormik({
    // enableReinitialize katsoo pitääkö Formikin nollata lomake, jos aloitusarvot muuttuvat
    enableReinitialize: true,
    initialValues: singleSubject,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: "Haluatko varmasti muuttaa " + values.subjectName + " tietoja?",
        content:
          "Painamalla jatka, tallennat " +
          values.subjectName +
          " uudet tiedot. ",
      });
      setDialogOpen(true);
      return;
    },
  });

  async function submitEditedSubject(values) {
    let capitalName = capitalizeFirstLetter(values.subjectName);
    let editedSubject = {
      name: capitalName,
      groupSize: values.groupSize,
      groupCount: values.groupCount,
      sessionLength: values.sessionLength,
      sessionCount: values.sessionCount,
      area: values.area,
      programId: values.programId,
      spaceTypeId: values.spaceTypeId ? values.spaceTypeId : null,
      id: values.id,
    };
    let result = await dao.editSubject(editedSubject);
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
      message: values.subjectName + " uudet tiedot lisätty.",
    });
    setAlertOpen(true);
    setSingleSubject(formik.values);
    getAllSubjects();
  }

  const getProgramsForSelect = async function () {
    const result = await dao.fetchProgramsForSelect();
    if (result === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen palvelimella. Pääaineita ei löytynyt.",
      });
      setAlertOpen(true);
      return;
    } else {
      setProgramSelectList(result);
    }
  };

  useEffect(() => {
    getProgramsForSelect();
  }, []);

  const getSpaceTypesForSelect = async function () {
    const result = await dao.fetchSpacetypeForSelect();
    if (result === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen palvelimella. Huonetyyppejä ei löytynyt.",
      });
      setAlertOpen(true);
      return;
    } else {
      setSpaceTypeSelectList(result);
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
      ></AlertBox>
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        confirmfunction={submitEditedSubject}
        functionparam={formik.values}
      ></ConfirmationDialog>
      <EditSubjectForm
        programSelectList={programSelectList}
        spaceTypeSelectList={spaceTypeSelectList}
        formik={formik}
        setEditSubject={setEditSubject}
      ></EditSubjectForm>
    </div>
  );
}
