import ClearIcon from "@mui/icons-material/Clear";
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
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import React, { useState } from "react";
import Logger from "../../logger/logger";
import SingleBuildingDialog from "./SingleBuildingDialog";

export default function BuildingList({ getAllBuildings, paginateBuildings }) {
  Logger.logPrefix = "BuildingList";
  const [open, setOpen] = useState(false);
  const [singleBuilding, setSingleBuilding] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Name");
  const [searchQuery, setSearchQuery] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const sortedBuildingsList = paginateBuildings.sort((a, b) => {
    switch (orderBy) {
      case "Name":
        return order === "asc"
          ? a.name.localeCompare(b.name, "fi-FI")
          : b.name.localeCompare(a.name, "fi-FI");
      default:
        return 0;
    }
  });

  const filteredBuildingsList = sortedBuildingsList.filter(
    (building) =>
      building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // STYLE
  const Box = styled(Table)(({ theme }) => ({
    overflow: "auto",
  }));

  return (
    <div>
      <SingleBuildingDialog
        open={open}
        setOpen={setOpen}
        singleBuilding={singleBuilding}
        setSingleBuilding={setSingleBuilding}
        getAllBuildings={getAllBuildings}
      />
      <TextField
        label="Search buildings"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={clearSearch}
              sx={{ visibility: searchQuery ? "visible" : "hidden" }}
              variant="clearFilterButton"
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
        style={{ marginBottom: 16, width: "100%" }}
      />
      <Paper>
        <TableContainer>
          <Box>
            <TableHead>
              <TableRow>
                <TableCell />
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
              {filteredBuildingsList.map((value) => (
                <TableRow key={value.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setSingleBuilding(value);
                        setOpen(true);
                      }}
                      aria-label="Open Info"
                    >
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Box>
        </TableContainer>
      </Paper>
    </div>
  );
}
