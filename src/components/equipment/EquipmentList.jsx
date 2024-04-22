import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import { Pagination } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import React, { useCallback, useState, useEffect } from "react";
import SingleEquipmentDialog from "./SingleEquipmentDialog";

export default function EquipmentList({
  getAllEquipments,
  equipmentList,
  paginateEquipment,
  setPaginateEquipment,
  pagination,
  setPagination,
  totalCount,
  rowsPerPage,
}) {
  const [open, setOpen] = useState(false);
  const [singleEquipment, setSingleEquipment] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Id");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchToBeHandled, setSearchToBeHandled] = useState(false);

  useEffect(() => {
    const sortAndPaginateEquipment = () => {
      let sorted = equipmentList.slice().sort((a, b) => {
        switch (orderBy) {
          case "Id":
            return order === "asc" ? a.id - b.id : b.id - a.id;
          case "Name":
            return order === "asc"
              ? a.name.localeCompare(b.name, "fi-FI")
              : b.name.localeCompare(a.name, "fi-FI");
          case "Priority":
            return order === "asc"
              ? a.priority - b.priority
              : b.priority - a.priority;
          case "Description":
            return order === "asc"
              ? a.description.localeCompare(b.description, "fi-FI")
              : b.description.localeCompare(a.description, "fi-FI");
          default:
            return 0;
        }
      });

      if (searchQuery !== "") {
        sorted = sorted.filter((equipment) =>
          equipment.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }
      const paginated = sorted.slice(pagination.from, pagination.to);
      setPaginateEquipment(paginated);
    };

    sortAndPaginateEquipment();
  }, [equipmentList, orderBy, order, searchQuery, pagination]);

  const handleRequestSort = useCallback(
    (property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [orderBy, order],
  );

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchQuery(searchText);
    setPagination({ from: 0, to: rowsPerPage });
    setSearchToBeHandled(true);
    setCurrentPage(1);
  };

  const handleChangePage = (e, p) => {
    const from = (p - 1) * rowsPerPage;
    const to = (p - 1) * rowsPerPage + rowsPerPage;
    setPagination({ from, to });
    if (searchToBeHandled) {
      setSearchToBeHandled(false);
      setCurrentPage(p);
    } else {
      setCurrentPage(p);
    }
  };

  const handleRowClick = useCallback((equipment) => {
    setSingleEquipment(equipment);
    setOpen(true);
  }, []);

  const cancelSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // STYLE
  const Box = styled(Table)(({ theme }) => ({
    overflow: "auto",
  }));

  return (
    <div>
      <SingleEquipmentDialog
        open={open}
        setOpen={setOpen}
        singleEquipment={singleEquipment}
        setSingleEquipment={setSingleEquipment}
        getAllEquipments={getAllEquipments}
      />
      <TextField
        label="Search equipment"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={cancelSearch}
              sx={{ visibility: searchQuery ? "visible" : "hidden" }}
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
        style={{ marginBottom: 16, width: "100%" }}
      />
      <Paper>
        <Box>
          <TableHead>
            <TableRow>
              <TableCell />

              {/*
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Id"}
                  direction={order}
                  onClick={() => handleRequestSort("Id")}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              */}

              <TableCell>
                <TableSortLabel
                  active={orderBy === "Name"}
                  direction={order}
                  onClick={() => handleRequestSort("Name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Priority"}
                  direction={order}
                  onClick={() => handleRequestSort("Priority")}
                >
                  Priority
                </TableSortLabel>
              </TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateEquipment.map((equipment) => (
              <TableRow key={equipment.id}>
                <TableCell>
                  <IconButton
                    onClick={() => handleRowClick(equipment)}
                    aria-label="Open Info"
                  >
                    <InfoIcon />
                  </IconButton>
                </TableCell>

                {/* <TableCell>{equipment.id}</TableCell> */}

                <TableCell>{equipment.name}</TableCell>
                <TableCell>{equipment.priority}</TableCell>
                <TableCell>{equipment.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Box>
        <div>
          <Pagination
            count={totalCount}
            onChange={handleChangePage}
            page={currentPage}
            variant="outlined"
          />
        </div>
      </Paper>
    </div>
  );
}
