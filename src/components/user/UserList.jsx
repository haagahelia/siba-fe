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
import SingleUserDialog from "./SingleUserDialog";

export default function UserList({ getAllUsers, paginateUsers }) {
  const [open, setOpen] = useState(false);
  const [singleUser, setSingleUser] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedUsers = paginateUsers.sort((a, b) => {
    switch (orderBy) {
      case "id":
        return order === "asc" ? a.id - b.id : b.id - a.id;
      case "email":
        return order === "asc"
          ? a.email.localeCompare(b.email, "fi-FI")
          : b.email.localeCompare(a.email, "fi-FI");
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
      <SingleUserDialog
        open={open}
        setOpen={setOpen}
        singleUser={singleUser}
        setSingleUser={setSingleUser}
        getAllUsers={getAllUsers}
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
                      active={orderBy === "id"}
                      direction={order}
                      onClick={() => handleRequestSort("id")}
                    >
                      ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "email"}
                      direction={order}
                      onClick={() => handleRequestSort("email")}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Planner</TableCell>
                  <TableCell>Statist</TableCell>
                  <TableCell>Planner for</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedUsers.map((value) => (
                  <TableRow key={value.id}>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setSingleUser(value);
                          setOpen(true);
                        }}
                        aria-label="Open Info"
                      >
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{value.id}</TableCell>
                    <TableCell>{value.email}</TableCell>
                    <TableCell>{value.isAdmin ? "✅" : "❌"}</TableCell>
                    <TableCell>{value.isPlanner ? "✅" : "❌"}</TableCell>
                    <TableCell>{value.isStatist ? "✅" : "❌"}</TableCell>

                    <TableCell>{value.plannerdepartment}</TableCell>
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
