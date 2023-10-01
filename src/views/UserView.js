import { useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import Logger from "../logger/logger";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AlertBox from "../components/common/AlertBox";
import UserFiltering from "../components/user/UserFiltering";
import UserListContainer from "../components/user/UserListContainer";
import UserPagination from "../components/user/UserPagination";

const pageSize = 15;

export default function UserView() {
  Logger.logPrefix = "UserView";
  Logger.debug("UserView component instantiated.");

  const [paginateUsers, setPaginateUsers] = useState([]);
  const [allUsersList, setAllUsersList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });

  Logger.debug("Initial state set.");

  const getAllUsers = async function () {
    Logger.debug("getAllUsers: fetching all Users from server.");
    const { httpStatus, data } = await dao.fetchAllUsers();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2), // View name, 2 = parent of the caller function
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug(`getAllUsers: successfully fetched ${data.length} Users.`);
      setAllUsersList(data);
      setPaginateUsers(data.slice(0, 15));
    }
  };

  useEffect(() => {
    Logger.debug("Running effect to fetch all Users.");
    getAllUsers();
  }, []);

  useEffect(() => {
    Logger.debug("Running effect to update paginated Users.");
    setPaginateUsers(allUsersList.slice(0, 15));
  }, [allUsersList]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Container maxWidth="100%">
        <Grid container rowSpacing={1}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Users" />
              <UserFiltering
                allUsersList={allUsersList}
                setAllUsersList={setAllUsersList}
                paginateUsers={paginateUsers}
                setPaginateUsers={setPaginateUsers}
                pagination={pagination}
              />
              <UserListContainer
                getAllUsers={getAllUsers}
                allUsersList={allUsersList}
                paginateUsers={paginateUsers}
                open={open}
                setOpen={setOpen}
              />
              <UserPagination
                pagination={pagination}
                setPagination={setPagination}
                allUsersList={allUsersList}
                paginateUsers={paginateUsers}
                setPaginateUsers={setPaginateUsers}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
