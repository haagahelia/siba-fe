import InfoIcon from "@mui/icons-material/Info";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import dao from "../ajax/dao";
import AddDepartment from "../components/department/AddDepartment";
import DepartmentDialog from "../components/department/DepartmentDialog";
import { useRoleLoggedIn } from "../hooks/useRoleLoggedIn";
import Logger from "../logger/logger";

export default function DepartmentView() {
  Logger.logPrefix = "DepartmentView";
  Logger.debug("DepartmentView component instantiated.");

  const [departmentList, setDepartmentList] = useState([]);
  const [singleDepartment, setSingleDepartment] = useState();
  const [open, setOpen] = useState(false);
  const [setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [setAlertOpen] = useState(false);

  const { roles } = useRoleLoggedIn();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  const rowsPerPage = 15;
  const [page, setPage] = useState(1);

  const getAllDepartments = async function () {
    Logger.debug(
      "getAllDepartments: fetching all departments from the server.",
    );
    const { success, data } = await dao.fetchDepartmentData();
    if (!success) {
      Logger.error("getAllDepartments: failed to fetch all departments.");
      setAlertOptions({
        severity: "error",
        title: "Error",
        message:
          "Oops! Something went wrong on the server. Department not found",
      });
      setAlertOpen(true);
      return;
    } else {
      Logger.info(
        `getAllDepartments: successfully fetched ${data.length} departments.`,
      );
      setDepartmentList(data);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const Box = styled(Table)(({ theme }) => ({
    overflow: "auto",
    borderCollapse: "collapse",
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = departmentList.slice(startIndex, endIndex);

  useEffect(() => {
    Logger.debug("Running effect to fetch all departments.");
    getAllDepartments();
  }, []);

  return (
    <Container maxWidth="xl">
      <Card variant="outlined">
        <CardContent>
          <CardHeader title="Department" />
          {(roles.admin === "1" || roles.planner === "1") && (
            <AddDepartment getAllDepartments={getAllDepartments} />
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "id"}
                      direction={orderBy === "id" ? order : "asc"}
                      onClick={() => handleRequestSort("id")}
                    >
                      Id
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={() => handleRequestSort("name")}
                    >
                      Name
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
                          setSingleDepartment(value);
                          setOpen(true);
                        }}
                        aria-label="Open Info"
                      >
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{value.id}</TableCell>
                    <TableCell>{value.name}</TableCell>
                    <TableCell>{value.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(departmentList.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            variant="outlined"
          />
        </CardContent>
      </Card>
    </Container>
  );
}
