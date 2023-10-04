import { useEffect, useState } from "react";
import dao from "../ajax/dao";
import { RoleLoggedIn } from "../customhooks/RoleLoggedIn";
import Logger from "../logger/logger";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import AddDepartment from "../components/department/AddDepartment";
import DepartmentDialog from "../components/department/DepartmentDialog";

export default function DepartmentView() {
  Logger.logPrefix = "DepartmentView";
  Logger.debug("DepartmentView component instantiated.");

  const [DepartmentList, setDepartmentList] = useState([]);
  const [singleDepartment, setSingleDepartment] = useState();
  const [open, setOpen] = useState(false);
  const [setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [setAlertOpen] = useState(false);

  const { roles } = RoleLoggedIn();

  const getAllDepartments = async function () {
    Logger.debug("getAllDepartments: fetching all departments from server.");
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
              {DepartmentList.map((value) => {
                return (
                  <List key={value.id}>
                    <ListItem
                      onClick={() => {
                        setSingleDepartment(value);
                        setOpen(true);
                      }}
                    >
                      <Grid item md={3} xs={3}>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "bold" }}
                        >
                          Id:
                        </Typography>
                        <ListItemText
                          primary={value.id}
                          primaryTypographyProps={{
                            variant: "body2",
                          }}
                        />
                      </Grid>
                      <Grid item md={3} xs={3}>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "bold" }}
                        >
                          Name:
                        </Typography>
                        <ListItemText
                          primary={value.name}
                          primaryTypographyProps={{
                            variant: "body2",
                          }}
                        />
                      </Grid>
                      <Grid item md={1} xs={1}>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "bold" }}
                        >
                          Description:
                        </Typography>
                        <ListItemText
                          primary={value.description}
                          primaryTypographyProps={{
                            variant: "body2",
                          }}
                        />
                      </Grid>
                    </ListItem>
                  </List>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </Box>
  );
}
