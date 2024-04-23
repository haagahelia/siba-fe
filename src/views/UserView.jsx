import CardHeader from "@mui/material/CardHeader";
// The User List Page
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";
import {
  CommonContainer,
  CommonContentContainer,
} from "../components/common/CommonContainers";
import AddUser from "../components/user/AddUser";
import UserFiltering from "../components/user/UserFiltering";
import UserListContainer from "../components/user/UserListContainer";
import UserPagination from "../components/user/UserPagination";
import { useRoleLoggedIn } from "../hooks/useRoleLoggedIn";
import Logger from "../logger/logger";

export default function UserView() {
  Logger.logPrefix = "UserView";
  Logger.debug("UserView component instantiated.");

  const appContext = useContext(AppContext);
  const pageSize = appContext.settings.itemsPerPage;
  const { roles } = useRoleLoggedIn();

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

  const getAllUsers = async () => {
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
      setPaginateUsers(data.slice(0, pageSize));
    }
  };

  useEffect(() => {
    Logger.debug("Running effect to fetch all Users.");
    getAllUsers();
  }, []);

  useEffect(() => {
    Logger.debug("Running effect to update paginated Users.");
    setPaginateUsers(allUsersList.slice(0, pageSize));
  }, [allUsersList]);

  useEffect(() => {
    document.title = "User List";
  }, []);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <CommonContainer>
        {roles.admin === "1" && (
          <AddUser getAllUsers={getAllUsers} allUsersList={allUsersList} />
        )}
        <CommonContentContainer>
          <CardHeader title="Users" variant="pageHeader" />
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
            pageSize={pageSize}
          />
        </CommonContentContainer>
      </CommonContainer>
    </div>
  );
}
