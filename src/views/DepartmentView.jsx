import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
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

  const sortedDepartmentList = departmentList.sort((a, b) => {
    if (orderBy === "id") {
      return order === "asc" ? a.id - b.id : b.id - a.id;
    } else if (orderBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (orderBy === "description") {
      return order === "asc"
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description);
    }
  });

  const Box = styled(Table)(({ theme }) => ({
    overflow: "auto",
    borderCollapse: "collapse",
  }));

  useEffect(() => {
    Logger.debug("Running effect to fetch all departments.");
    getAllDepartments();
  }, []);

  return (
    <Box sx={{ marginLeft: 8 }}>
      <DepartmentDialog
        open={open}
        setOpen={setOpen}
        singleDepartment={singleDepartment}
        setSingleDepartment={setSingleDepartment}
        getAllDepartments={getAllDepartments}
      />
      <Container maxWidth="100%">
        <Grid container rowSpacing={0.5}>
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
                      <TableCell>Info</TableCell>
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
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === "description"}
                          direction={orderBy === "description" ? order : "asc"}
                          onClick={() => handleRequestSort("description")}
                        >
                          Description
                        </TableSortLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedDepartmentList.map((value) => (
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
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </Box>
  );
}
