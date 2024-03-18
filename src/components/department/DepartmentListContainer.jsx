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
  pagination,
  totalCount,
  rowsPerPage,
  setPaginateDepartment,
  paginateDepartment,
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
              pagination={pagination}
              totalCount={totalCount}
              rowsPerPage={rowsPerPage}
              setPaginateDepartment={setPaginateDepartment}
              paginateDepartment={paginateDepartment}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
