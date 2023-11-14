import InfoIcon from "@mui/icons-material/Info";

import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import styled from "@mui/material/styles/styled";
import { useState } from "react";
import SingleDepartmentDialog from "./SingleDepartmentDialog";

export default function DepartmentList({
  getAllDepartments,
  departmentList,
  onPageChange,
  page,
  rowsPerPage,
}) {
  const [open, setOpen] = useState(false);
  const [singleDepartment, setSingleDepartment] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Id");

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedDepartmentList = [...departmentList].sort((a, b) => {
    switch (orderBy) {
      case "Id":
        return order === "asc" ? a.id - b.id : b.id - a.id;
      case "Name":
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case "Description":
        return order === "asc"
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description);
      default:
        return 0;
    }
  });

  const paginatedData = sortedDepartmentList.slice(startIndex, endIndex);

  const handleRowClick = (department) => {
    setSingleDepartment(department);
    setOpen(true);
  };

  // STYLE
  const Box = styled(Table)(({ theme }) => ({
    overflow: "auto",
  }));

  return (
    <div>
      <SingleDepartmentDialog
        open={open}
        setOpen={setOpen}
        singleDepartment={singleDepartment}
        setSingleDepartment={setSingleDepartment}
        getAllDepartments={getAllDepartments}
      />
      <Box>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "Id"}
                      direction={order}
                      onClick={() => handleRequestSort("Id")}
                    >
                      ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "Name"}
                      direction={order}
                      onClick={() => handleRequestSort("Name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell>
                      <IconButton
                        onClick={() => handleRowClick(department)}
                        aria-label="Open Info"
                      >
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{department.id}</TableCell>
                    <TableCell>{department.name}</TableCell>
                    <TableCell>{department.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
