import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SingleSubjectDialog from "./SingleSubjectDialog";
import SubjectList from "./SubjectList";

export default function SubjectListContainer({
  shownSubject,
  getAllSubjects,
  allSubjectsList,
  paginateSubjects,
  setPaginateSubjects,
  pageSize,
  open,
  setOpen,
  userPrograms,
}) {
  return (
    <Container maxWidth="xl">
      <SingleSubjectDialog
        open={open}
        setOpen={setOpen}
        getAllSubjects={getAllSubjects}
        singleSubject={shownSubject ? shownSubject : null}
        userPrograms={userPrograms}
      />

      <Grid container rowSpacing={2}>
        <Card variant="outlined">
          <CardContent>
            <SubjectList
              shownSubject={shownSubject}
              getAllSubjects={getAllSubjects}
              allSubjectsList={allSubjectsList}
              paginateSubjects={paginateSubjects}
              setPaginateSubjects={setPaginateSubjects}
              pageSize={pageSize}
              userPrograms={userPrograms}
            />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
