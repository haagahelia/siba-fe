import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import SingleDepartmentDialog from "./SingleDepartmentDialog";

export default function DepartmentList({
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
  const [singleDepartment, setSingleDepartment] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Id");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const sortAndPaginateDepartment = () => {
      let sorted = departmentList.slice().sort((a, b) => {
        switch (orderBy) {
          case "Id":
            return order === "asc" ? a.id - b.id : b.id - a.id;
          case "Name":
            return order === "asc"
              ? a.name.localeCompare(b.name, "fi-FI")
              : b.name.localeCompare(a.name, "fi-FI");
          case "Description":
            return order === "asc"
              ? a.description.localeCompare(b.description, "fi-FI")
              : b.description.localeCompare(a.description, "fi-FI");
          default:
            return 0;
        }
      });

      if (searchQuery !== "") {
        sorted = sorted.filter((department) =>
          department.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }
      const paginated = sorted.slice(pagination.from, pagination.to);
      setPaginateDepartment(paginated);
    };

    sortAndPaginateDepartment();
  }, [departmentList, orderBy, order, searchQuery, pagination]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pagination]);

  const handleChangePage = (e, p) => {
    const from = (p - 1) * rowsPerPage;
    const to = (p - 1) * rowsPerPage + rowsPerPage;
    setPagination({ from, to });
    setCurrentPage(p);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchQuery(searchText);
    setPagination({ from: 0, to: rowsPerPage });
  };

  const handleRowClick = (department) => {
    setSingleDepartment(department);
    setOpen(true);
  };

  const cancelSearch = () => {
    setSearchQuery("");
  };

  return (
    <div>
      <SingleDepartmentDialog
        open={open}
        setOpen={setOpen}
        singleDepartment={singleDepartment}
        setSingleDepartment={setSingleDepartment}
        getAllDepartments={getAllDepartments}
      />
      <TextField
        label="Search departments"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={cancelSearch}
              sx={{ visibility: searchQuery ? "visible" : "hidden" }}
              variant="clearFilterButton"
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
        style={{ marginBottom: 16, width: "100%" }}
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
                {paginateDepartment.map((department) => (
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
        <div>
          <Pagination
            count={totalCount}
            onChange={handleChangePage}
            variant="outlined"
          />
        </div>
      </Box>
    </div>
  );
}
