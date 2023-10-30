import InfoIcon from "@mui/icons-material/Info";
import { Pagination } from "@mui/material";
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
import SingleEquipmentDialog from "./SingleEquipmentDialog";

export default function EquipmentList({ getAllEquipments, equipmentList }) {
  const [open, setOpen] = useState(false);
  const [singleEquipment, setSingleEquipment] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Id");

  const [page, setPage] = useState(1);
  const rowsPerPage = 15;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
          ? a.equipmentPriority - b.equipmentPriority
          : b.equipmentPriority - a.equipmentPriority;
      case "Description":
        return order === "asc"
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description);
      default:
        return 0;
    }
  });

  const paginatedData = sortedEquipmentList.slice(startIndex, endIndex);

  const handleRowClick = (equipment) => {
    setSingleEquipment(equipment);
    setOpen(true);
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
              {paginatedData.map((value) => (
                <TableRow key={value.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setSingleEquipment(value);
                        setOpen(true);
                      }}
                      aria-label="Open Info"
                    >
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{value.id}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.equipmentPriority}</TableCell>
                  <TableCell>{value.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <div>
        <Pagination
          count={Math.ceil(sortedEquipmentList.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          variant="outlined"
        />
      </div>
    </div>
  );
}
