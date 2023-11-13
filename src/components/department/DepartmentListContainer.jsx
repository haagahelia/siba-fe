import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DepartmentList from "./DepartmentList";
import SingleDepartmentDialog from "./SingleDepartmentDialog";

export default function DepartmentListContainer({
  getAllDepartments,
  allDepartmentsList,
  paginateDepartments,
  open,
  setOpen,
}) {
  return (
    <Container maxWidth="xl">
      <SingleDepartmentDialog
        open={open}
        setOpen={setOpen}
        getAllDepartments={getAllDepartments}
      />
      <Grid container rowSpacing={1}>
        <Card variant="outlined">
          <CardContent>
            <DepartmentList
              getAllDepartments={getAllDepartments}
              allDepartmentsList={allDepartmentsList}
              paginateDepartments={paginateDepartments}
            />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
