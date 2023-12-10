import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
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
import React, { useCallback, useState } from "react";
import SingleEquipmentDialog from "./SingleEquipmentDialog";

export default function EquipmentList({
  getAllEquipments,
  equipmentList,
  onPageChange,
  page,
  rowsPerPage,
}) {
  const [open, setOpen] = useState(false);
  const [singleEquipment, setSingleEquipment] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Id");
  const [searchQuery, setSearchQuery] = useState("");

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleChangePage = useCallback(
    (event, newPage) => {
      onPageChange(newPage);
    },
    [onPageChange],
  );

  const handleRequestSort = useCallback(
    (property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [orderBy, order],
  );

  const handleRowClick = useCallback((equipment) => {
    setSingleEquipment(equipment);
    setOpen(true);
  }, []);

  const cancelSearch = () => {
    setSearchQuery("");
  };

  const sortedEquipmentList = equipmentList.sort((a, b) => {
    switch (orderBy) {
      case "Id":
        return order === "asc" ? a.id - b.id : b.id - a.id;
      case "Name":
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case "Priority":
        return order === "asc"
          ? a.priority - b.priority
          : b.priority - a.priority;
      case "Description":
        return order === "asc"
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description);
      default:
        return 0;
    }
  });

  const filteredEquipmentList = sortedEquipmentList.filter(
    (equipment) =>
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const paginatedData = filteredEquipmentList.slice(startIndex, endIndex);

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
        onChange={(e) => setSearchQuery(e.target.value)}
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
      <Box>
        <Paper>
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
              {paginatedData.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleRowClick(equipment)}
                      aria-label="Open Info"
                    >
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{equipment.id}</TableCell>
                  <TableCell>{equipment.name}</TableCell>
                  <TableCell>{equipment.priority}</TableCell>
                  <TableCell>{equipment.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </div>
  );
}
