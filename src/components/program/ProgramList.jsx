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

export default function ProgramList({ getAllPrograms, paginatePrograms }) {
  const [open, setOpen] = useState(false);
  const [singleProgram, setSingleProgram] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("ProgramName");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedPrograms = paginatePrograms.sort((a, b) => {
    switch (orderBy) {
      case "name":
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case "departmentName":
        return order === "asc"
          ? a.departmentName.localeCompare(b.departmentName)
          : b.departmentName.localeCompare(a.departmentName);
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
      <Box>
        <Paper>
          <TableContainer>
            <Table>
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
                        onClick={() => {
                          setSingleProgram(value);
                          setOpen(true);
                        }}
                        aria-label="Open Info"
                      >
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{value.name}</TableCell>
                    <TableCell>{value.departmentId}</TableCell>
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
