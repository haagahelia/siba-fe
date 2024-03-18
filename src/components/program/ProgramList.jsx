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
import React, { useContext, useEffect, useState } from "react";
import SingleProgramDialog from "./SingleProgramDialog";

export default function ProgramList({ getAllPrograms, paginatePrograms }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedPrograms = paginatePrograms.sort((a, b) => {
    switch (orderBy) {
      case "name":
        return order === "asc"
          ? a.name.localeCompare(b.name, "fi-FI")
          : b.name.localeCompare(a.name, "fi-FI");
      case "departmentName":
        return order === "asc"
          ? a.departmentName.localeCompare(b.departmentName, "fi-FI")
          : b.departmentName.localeCompare(a.departmentName, "fi-FI");
      default:
        return 0;
    }
  });

  // STYLE
  const Box = styled(Table)(({ theme }) => ({
    overflow: "auto",
    borderCollapse: "collapse",
  }));

  return (
    <div>
      <SingleProgramDialog
        open={openDialog}
        setOpen={setOpenDialog}
        singleProgram={selectedProgram}
        setSingleProgram={setSelectedProgram}
        getAllPrograms={getAllPrograms}
      />
      <Paper>
        <TableContainer>
          <Box>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={order}
                    onClick={() => handleRequestSort("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "departmentName"}
                    direction={order}
                    onClick={() => handleRequestSort("departmentName")}
                  >
                    Department
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPrograms.map((value) => (
                <TableRow key={value.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenDialog(value)}
                      aria-label="Open Info"
                    >
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.departmentName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Box>
        </TableContainer>
      </Paper>
    </div>
  );
}
