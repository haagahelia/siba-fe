import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import SingleSubjectDialog from "./SingleSubjectDialog";
import SubjectList from "./SubjectList";

export default function SubjectListContainer({
  getAllSubjects,
  allSubjectsList,
  paginateSubjects,
  open,
  setOpen,
}) {
  return (
    <Container maxWidth="lg">
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
