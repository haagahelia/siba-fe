import React, { useState, useEffect } from "react";
import SubjectList from "../components/SubjectList";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddSubject from "../components/AddSubject";
import Axios from "axios";

export default function SubjectView() {
  const [subjectList, setSubjectList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const getAllSubjects = () => {
    Axios.get("http://localhost:3001/api/subject/getAll")
      .then((response) => {
        setSubjectList(response.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setAlertOptions({
            severity: "error",
            title: "Virhe",
            message:
              "Oho! Jotain meni pieleen palvelimella. Opetuksia ei löytynyt",
          });
          setAlertOpen(true);
          return;
        }
      });
  };

  useEffect(() => {
    getAllSubjects();
  }, []);

  const Card = styled(Paper)(({ theme }) => ({
    backgroundColor: "rgba(52, 139, 147, 0.5 )",
    width: "75%",
    overflow: "auto",
  }));
  return (
    <div>
      <Container maxWidth="100%">
        <AddSubject getAllSubjects={getAllSubjects} subjectList={subjectList} />
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
                getAllSubjects={getAllSubjects}
                subjectList={subjectList}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
