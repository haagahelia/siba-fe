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
import React, { useCallback, useEffect, useState } from "react";
import SingleEquipmentDialog from "./SingleEquipmentDialog";

export default function EquipmentList({
  getAllEquipments,
  equipmentList,
  pagination,
  setPaginateEquipment,
  paginateEquipment,
}) {
  const [open, setOpen] = useState(false);
  const [singleEquipment, setSingleEquipment] = useState(null);
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

  const handleRowClick = useCallback((equipment) => {
    setSingleEquipment(equipment);
    setOpen(true);
  }, []);

  const requestSearch = (e) => {
    const searchText = e.target.value;
    setSearchQuery(searchText);
    const filteredEquipment = equipmentList.filter((equipment) =>
      equipment.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setPaginateEquipment(filteredEquipment);
  };

  useEffect(() => {
    if (searchQuery === "") {
      setPaginateEquipment(equipmentList.slice(pagination.from, pagination.to));
    }
  }, [searchQuery, setPaginateEquipment, equipmentList, pagination]);

  const cancelSearch = () => {
    setSearchQuery("");
    setPaginateEquipment(equipmentList.slice(pagination.from, pagination.to));
  };

  const sortedEquipmentList = paginateEquipment.sort((a, b) => {
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
        onChange={(e) => requestSearch(e)}
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
            {sortedEquipmentList.map((equipment) => (
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
        </Box>
      </Paper>
    </div>
  );
}
