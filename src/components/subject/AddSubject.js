import React, { useState, useEffect } from "react";
import { CardHeader, Card, CardContent } from "@mui/material";
import AlertBox from "../common/AlertBox";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import {
  validate,
  capitalizeFirstLetter,
} from "../../validation/ValidateAddSubject";
import dao from "../../ajax/dao";
import AddSubjectForm from "./AddSubjectForm";

//const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;
//import {BASEURL} from "../config/consts.js";
//const baseUrl = BASEURL;

export default function AddSubject(props) {
  const { getAllSubjects, allSubjectsList } = props;
  const [programNameList, setProgramNameList] = useState([]);
  const [spaceTypeNameList, setSpaceTypeNameList] = useState([]);
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
  // Tässä formikin initialvalues tallennetaan stateen
  const [copySubjectData, setCopySubjectData] = useState({
    name: "",
    groupSize: 0,
    groupCount: 0,
    sessionLength: "",
    sessionCount: 0,
    area: 0,
    programId: 0,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: copySubjectData,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: "Haluatko varmasti lisätä " + values.name + "?",
        content:
          "Painamalla jatka, " + values.name + " lisätään opetuslistaukseen",
      });
      setDialogOpen(true);
      return;
    },
  });

  const getProgramNames = async function () {
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
      setProgramNameList(result);
    }
  };
  useEffect(() => {
    getProgramNames();
  }, []);

  const getSpaceTypeNames = async function () {
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
      setSpaceTypeNameList(result);
    }
  };
  useEffect(() => {
    getSpaceTypeNames();
  }, []);

  const addSubject = async (submitValues) => {
    let capitalName = capitalizeFirstLetter(submitValues.name);
    let newSubject = {
      name: capitalName,
      groupSize: submitValues.groupSize,
      groupCount: submitValues.groupCount,
      sessionLength: submitValues.sessionLength,
      sessionCount: submitValues.sessionCount,
      area: submitValues.area,
      programId: submitValues.programId,
      spaceTypeId: submitValues.spaceTypeId ? submitValues.spaceTypeId : null,
    };

    let result = await dao.postNewSubject(newSubject);
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
      message: submitValues.name + " lisätty.",
    });
    setAlertOpen(true);

    getAllSubjects();
  };
  // Tässä tulee lista opetuksia
  // Kun opetuksen valitsee menee tiedot formikin initialvaluesiin
  const handleChange = (e) => {
    let selected = e.target.value;
    setCopySubjectData({
      name: formik.values.name, // Tämä, jotta syötetty nimi ei vaihdu vaikka valitsisi olemassa olevan opetuksen tiedot
      groupSize: selected.groupSize,
      groupCount: selected.groupCount,
      sessionLength: selected.sessionLength,
      sessionCount: selected.sessionCount,
      area: selected.area,
      programId: selected.programId,
      spaceTypeId: selected.spaceTypeId,
    });
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
        confirmfunction={addSubject}
        functionparam={formik.values}
      ></ConfirmationDialog>
      <Card
        variant="outlined"
        sx={{
          width: "65%",
          padding: 1,
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <CardContent>
          <CardHeader
            title="Lisää opetus"
            sx={{ marginBottom: "30px" }}
          ></CardHeader>
          <AddSubjectForm
            handleChange={handleChange}
            programNameList={programNameList}
            formik={formik}
            submitValues={formik.values}
            setCopySubjectData={setCopySubjectData}
            allSubjectsList={allSubjectsList}
            copySubjectData={copySubjectData}
            spaceTypeNameList={spaceTypeNameList}
          ></AddSubjectForm>
        </CardContent>
      </Card>
    </div>
  );
}
