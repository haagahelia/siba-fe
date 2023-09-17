import React from "react";
import Grid from "@mui/material/Grid";
import SingleSubjectDialog from "./SingleSubjectDialog";
import SubjectList from "./SubjectList";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { Container } from "@mui/material";

export default function SubjectListContainer(props) {
  const { getAllSubjects, allSubjectsList, paginateSubjects, open, setOpen } =
    props;
  return (
    <Container maxWidth="md">
      <SingleSubjectDialog
        getAllSubjects={getAllSubjects}
        open={open}
        setOpen={setOpen}
      />

      <Grid container spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <SubjectList
              getAllSubjects={getAllSubjects}
              allSubjectsList={allSubjectsList}
              paginateSubjects={paginateSubjects}
            />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
