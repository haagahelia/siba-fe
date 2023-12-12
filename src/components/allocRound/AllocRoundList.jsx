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
import { useContext, useState } from "react";
import { AllocRoundContext } from "../../AppContext";
import Logger from "../../logger/logger";
import AllocRoundDetails from "./AllocRoundDetails";

export default function AllocRoundList({
  paginateAllocRounds,
  getAllocRounds,
  incrementDataModifiedCounter,
}) {
  const { allocRoundContext } = useContext(AllocRoundContext);

  const [singleAllocRound, setSingleAllocRound] = useState(null);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("ID");
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

  const sortedAllocRounds = paginateAllocRounds.sort((a, b) => {
    switch (orderBy) {
      case "ID":
        return order === "asc" ? a.id - b.id : b.id - a.id;
      case "Name":
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case "Description":
        return order === "asc"
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description);
      case "Created":
        return order === "asc"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date);
      case "LastModified":
        return order === "asc"
          ? a.lastModified.localeCompare(b.lastModified)
          : b.lastModified.localeCompare(a.lastModified);
      default:
        return 0;
    }
  });

  const filteredAllocRounds = sortedAllocRounds.filter(
    (allocRound) =>
      allocRound.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      allocRound.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      allocRound.lastModified.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRowClick = (allocRound) => {
    setSingleAllocRound(allocRound);
    setOpen(true);
    Logger.debug(`Allocation round chosen: ${allocRound.name}`);
  };

  // STYLE
  const Box = styled(Table)(({ theme }) => ({
    overflow: "auto",
  }));

  return (
    <div>
      <AllocRoundDetails
        open={open}
        setOpen={setOpen}
        singleAllocRound={singleAllocRound}
        setSingleAllocRound={setSingleAllocRound}
        getAllocRounds={getAllocRounds}
        incrementDataModifiedCounter={incrementDataModifiedCounter}
      />
      <TextField
        label="Search allocation rounds"
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
      <Box component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <TableSortLabel
                  active={orderBy === "ID"}
                  direction={order}
                  onClick={() => handleRequestSort("ID")}
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
                  active={orderBy === "Description"}
                  direction={order}
                  onClick={() => handleRequestSort("Description")}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Created"}
                  direction={order}
                  onClick={() => handleRequestSort("Created")}
                >
                  Created
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "LastModified"}
                  direction={order}
                  onClick={() => handleRequestSort("LastModified")}
                >
                  Last Modified
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAllocRounds.map((value) => (
              <TableRow key={value.id}>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      handleRowClick(value);
                      setOpen(true);
                    }}
                    aria-label="Open Info"
                  >
                    <InfoIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {value.id === allocRoundContext.allocRoundId
                    ? `${value.id}✅`
                    : value.id}
                </TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>{value.description}</TableCell>
                <TableCell>{value.date}</TableCell>
                <TableCell>{value.lastModified}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
}
