import { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import DepartmentList from "./DepartmentList";
import SingleDepartmentDialog from "./SingleDepartmentDialog";

export default function DepartmentListContainer({
  getAllDepartments,
  departmentList,
  onPageChange,
  page,
  totalCount,
  rowsPerPage,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
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
              departmentList={departmentList}
              onPageChange={onPageChange}
              page={page}
              totalCount={totalCount}
              rowsPerPage={rowsPerPage}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
