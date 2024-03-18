import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
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
import { useCallback, useEffect, useState } from "react";
import SingleDepartmentDialog from "./SingleDepartmentDialog";

export default function DepartmentList({
  getAllDepartments,
  departmentList,
  pagination,
  setPaginateDepartment,
  paginateDepartment,
}) {
  const [open, setOpen] = useState(false);
  const [singleDepartment, setSingleDepartment] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Id");
  const [searchQuery, setSearchQuery] = useState("");

  const handleRequestSort = useCallback(
    (property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [orderBy, order],
  );

  const handleRowClick = useCallback((department) => {
    setSingleDepartment(department);
    setOpen(true);
  }, []);

  const requestSearch = (e) => {
    const searchText = e.target.value;
    setSearchQuery(searchText);
    const filteredDepartment = departmentList.filter((department) =>
      department.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setPaginateDepartment(filteredDepartment);
  };

  useEffect(() => {
    if (searchQuery === "") {
      setPaginateDepartment(
        departmentList.slice(pagination.from, pagination.to),
      );
    }
  }, [searchQuery, setPaginateDepartment, departmentList, pagination]);

  const cancelSearch = () => {
    setSearchQuery("");
    setPaginateDepartment(departmentList.slice(pagination.from, pagination.to));
  };

  const sortedDepartmentList = paginateDepartment.sort((a, b) => {
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
        onChange={(e) => requestSearch(e)}
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
                {sortedDepartmentList.map((department) => (
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
