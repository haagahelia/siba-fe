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
import { styled } from "@mui/material/styles";
import { /* useEffect, */ useState } from "react";
// import SingleSubjectDialog from "./SingleSubjectDialog";

export default function SpaceListItems({
  // getAllSpaces,
  paginateSpaces,
}) {
  // const [open, setOpen] = useState(false);
  // const [singleSpace, setSingleSpace] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("SubjectName");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedSpaces = paginateSpaces.sort((a, b) => {
    switch (orderBy) {
      case "name":
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
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
      {/*
        <SingleSubjectDialog
          open={open}
          setOpen={setOpen}
          singleSubject={singleSubject}
          setSingleSubject={setSingleSubject}
          getAllSubjects={getAllSubjects}
        />
    */}
      <Box>
        <Paper>
          <TableContainer>
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
                          // setSingleSpace(value);
                          // setOpen(true);
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
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
