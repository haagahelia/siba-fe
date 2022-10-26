import React, { useState, useEffect } from "react";
import SubjectList from "../components/subject/SubjectList";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddSubject from "../components/subject/AddSubject";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";

export default function SubjectView() {
  const [subjectList, setSubjectList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const refreshSubjects = async function () {
    const data = await dao.fetchSubjects();
    if (data === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Oho! Jotain meni pieleen palvelimella. Opetuksia ei löytynyt",
      });
      setAlertOpen(true);
      return;
    } else {
      setSubjectList(data);
    }
  };

  useEffect(() => {
    refreshSubjects();
  }, []);

  const Card = styled(Paper)(({ theme }) => ({
    backgroundColor: "rgba(52, 139, 147, 0.5 )",
    width: "75%",
    overflow: "auto",
  }));
  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      ></AlertBox>
      <Container maxWidth="100%">
        <AddSubject
          refreshSubjects={refreshSubjects}
          subjectList={subjectList}
          setSubjectList={setSubjectList}
        />
        <Grid
          container
          rowSpacing={0.5}
          justifyContent="space-evenly"
          //padding={2} // was 7
          alignItems="flex-start"
          marginTop="20px"
        >
          <Card variant="outlined">
            <CardContent>
              <CardHeader
                title="Opetukset"
                sx={{ fontSize: 25 }}
                className="card-header"
              />
              <SubjectList
                refreshSubjects={refreshSubjects}
                subjectList={subjectList}
                setSubjectList={setSubjectList}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
