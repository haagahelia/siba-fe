import { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import DepartmentList from "./DepartmentList";
import SingleDepartmentDialog from "./SingleDepartmentDialog";

export default function DepartmentListContainer({
  getAllDepartments,
  departmentList,
  paginateDepartment,
  setPaginateDepartment,
  pagination,
  setPagination,
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
      <DepartmentList
        getAllDepartments={getAllDepartments}
        departmentList={departmentList}
        paginateDepartment={paginateDepartment}
        setPaginateDepartment={setPaginateDepartment}
        pagination={pagination}
        setPagination={setPagination}
        totalCount={totalCount}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
}
