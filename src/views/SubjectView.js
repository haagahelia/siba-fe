import React, { useState, useEffect } from "react";
import SubjectList from "../components/subject/SubjectList";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddSubject from "../components/subject/AddSubject";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";
import SubjectFiltering from "../components/subject/SubjectFiltering";
import SubjectPagination from "../components/subject/SubjectPagination";

export default function SubjectView() {
  const [subjectList, setSubjectList] = useState([]);
  const [paginateSubjects, setPaginateSubjects] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [searched, setSearched] = useState("");
  const [filteredSubject, setFilteredSubject] = useState([]);

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
      setFilteredSubject(data);
    }
  };

  useEffect(() => {
    refreshSubjects();
  }, []);
  useEffect(() => {
    setPaginateSubjects(subjectList.slice(0, 15));
  }, [subjectList]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
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
          alignItems="flex-start"
          marginTop="20px"
        >
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Opetukset" />
              <SubjectFiltering
                setFilteredSubject={setFilteredSubject}
                filteredSubject={filteredSubject}
                searched={searched}
                setSearched={setSearched}
              />
              <SubjectList
                refreshSubjects={refreshSubjects}
                subjectList={subjectList}
                setSubjectList={setSubjectList}
                paginateSubjects={paginateSubjects}
              />
              <SubjectPagination
                subjectList={subjectList}
                setSubjectListState={setSubjectList}
                paginateSubjects={paginateSubjects}
                setPaginateSubjects={setPaginateSubjects}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
