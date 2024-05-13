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

export default function ProgramList({
  getAllPrograms,
  allProgramsList,
  paginatePrograms,
  setPaginatePrograms,
  pagination,
  setPagination,
}) {
  const pageSize = useContext(AppContext).settings.itemsPerPage;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [searchQuery, setSearched] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchToBeHandled, setSearchToBeHandled] = useState(false);

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
      if (searchQuery !== "") {
        sorted = sorted.filter(
          (program) =>
            program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            program.departmentName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
        );
      }

      // Apply pagination
      const paginated = sorted.slice(pagination.from, pagination.to);
      setPaginatePrograms(paginated);
    };

    sortAndPaginatePrograms();
  }, [allProgramsList, orderBy, order, searchQuery, pagination]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearched(searchText);

    // Reset pagination when search criteria change
    setPagination({ from: 0, to: pageSize });
    setSearchToBeHandled(true);
    setCurrentPage(1);
  };

  const handleChangePage = (e, p) => {
    const from = (p - 1) * pageSize;
    const to = (p - 1) * pageSize + pageSize;
    setPagination({ from, to });

    if (searchToBeHandled) {
      setSearchToBeHandled(false);
      setCurrentPage(p);
    } else {
      setCurrentPage(p);
    }
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
        label="Search programs"
        value={searchQuery}
        onChange={handleSearch}
        variant="outlined"
        className="search"
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => {
                setSearched("");
                setCurrentPage(1);
              }}
              sx={{ visibility: searchQuery ? "visible" : "hidden" }}
              variant="clearFilterButton"
            >
              <ClearIcon />
            </IconButton>
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
            {paginatePrograms.map((value) => (
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
          page={currentPage}
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
