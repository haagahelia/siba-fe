import React, { useState, useEffect } from "react";
import SubjectListContainer from "../components/subject/SubjectListContainer";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddSubjectContainer from "../components/subject/AddSubjectContainer";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";

export default function SubjectView() {
  const [allSubjectsList, setAllSubjectsList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getAllSubjects = async function () {
    const result = await dao.fetchAllSubjects();
    if (result === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Oho! Jotain meni pieleen palvelimella. Opetuksia ei löytynyt",
      });
      setAlertOpen(true);
      return;
    } else {
      setAllSubjectsList(result);
    }
  };

  useEffect(() => {
    getAllSubjects();
  }, []);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      ></AlertBox>
      <Container maxWidth="100%">
        <AddSubjectContainer
          getAllSubjects={getAllSubjects}
          allSubjectsList={allSubjectsList}
        />
        <Grid
          container
          rowSpacing={0.5}
          justifyContent="space-evenly"
          alignItems="flex-start"
          marginTop="20px"
        >
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Opetukset" />
              <SubjectListContainer
                getAllSubjects={getAllSubjects}
                allSubjectsList={allSubjectsList}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
