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
import SingleSpaceDialog from "./SingleSpaceDialog";

export default function SpaceList({
  shownSpace,
  getAllSpaces,
  paginateSpaces,
}) {
  const [open, setOpen] = useState(false);
  const [singleSpace, setSingleSpace] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("SpaceName");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedSpaces = paginateSpaces.sort((a, b) => {
    switch (orderBy) {
      case "name":
        return order === "asc"
          ? a.name.localeCompare(b.name, "fi-FI")
          : b.name.localeCompare(a.name, "fi-FI");
      case "area":
        return order === "asc" ? a.area - b.area : b.area - a.area;
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
      <SingleSpaceDialog
        open={open}
        setOpen={setOpen}
        singleSpace={singleSpace}
        setSingleSpace={setSingleSpace}
        getAllSpaces={getAllSpaces}
      />
      <Paper>
        <TableContainer>
          <Box>
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
                    active={orderBy === "area"}
                    direction={order}
                    onClick={() => handleRequestSort("area")}
                  >
                    Area
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedSpaces.map((value) => (
                <TableRow key={value.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setSingleSpace(value);
                        setOpen(true);
                      }}
                      aria-label="Open Info"
                    >
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.area}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Box>
        </TableContainer>
      </Paper>
    </div>
  );
}
