import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import SingleProgramDialog from "./SingleProgramDialog";

export default function ProgramList({ getAllPrograms, allProgramsList }) {
  const pageSize = useContext(AppContext).settings.itemsPerPage;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [searched, setSearched] = useState("");
  const [paginatedPrograms, setPaginatedPrograms] = useState([]);
  const [pagination, setPagination] = useState({ from: 0, to: pageSize });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const sortAndPaginatePrograms = () => {
      let sorted = allProgramsList.slice().sort((a, b) => {
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

      // Apply search filter to both name and departmentName
      if (searched !== "") {
        sorted = sorted.filter(
          (program) =>
            program.name.toLowerCase().includes(searched.toLowerCase()) ||
            program.departmentName
              .toLowerCase()
              .includes(searched.toLowerCase()),
        );
      }

      // Apply pagination
      const paginated = sorted.slice(pagination.from, pagination.to);
      setPaginatedPrograms(paginated);
    };

    sortAndPaginatePrograms();
  }, [allProgramsList, orderBy, order, searched, pagination]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pagination]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    // Reset pagination when sorting criteria change
    setPagination({ from: 0, to: pageSize });
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearched(searchText);

    // Reset pagination when search criteria change
    setPagination({ from: 0, to: pageSize });
  };

  const handleChangePage = (e, p) => {
    const from = (p - 1) * pageSize;
    const to = (p - 1) * pageSize + pageSize;
    setPagination({ from, to });
    setCurrentPage(p);
  };

  const handleOpenDialog = (program) => {
    setSelectedProgram(program);
    setOpenDialog(true);
  };

  // STYLE
  const Box = styled(Table)(({ theme }) => ({
    overflow: "auto",
    borderCollapse: "collapse",
  }));

  return (
    <div>
      <TextField
        type="text"
        placeholder="Search programs"
        value={searched}
        onChange={handleSearch}
        fullWidth
        variant="outlined"
        size="medium"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setSearched("")}
                sx={{ visibility: searched ? "visible" : "hidden" }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Paper>
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
            {paginatedPrograms.map((value) => (
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
        </Table>
      </Paper>
      <div>
        <Pagination
          count={Math.ceil(allProgramsList.length / pageSize)}
          onChange={handleChangePage}
          variant="outlined"
        />
      </div>
      <SingleProgramDialog
        open={openDialog}
        setOpen={setOpenDialog}
        singleProgram={selectedProgram}
        setSingleProgram={setSelectedProgram}
        getAllPrograms={getAllPrograms}
      />
    </div>
  );
}
