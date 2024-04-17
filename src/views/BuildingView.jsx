import { CardContent, CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import AddBuildingContainer from "../components/building/AddBuildingContainer";
import BuildingListContainer from "../components/building/BuildingListContainer";
import BuildingPagination from "../components/building/BuildingListPagination";
import AlertBox from "../components/common/AlertBox";
import { useRoleLoggedIn } from "../hooks/useRoleLoggedIn";
import Logger from "../logger/logger";

export default function BuildingView() {
  const { roles } = useRoleLoggedIn();
  const pageSize = useContext(AppContext).settings.itemsPerPage;

  const [paginateBuildings, setPaginateBuildings] = useState([]);
  const [allBuildingsList, setAllBuildingsList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });

  const getAllBuildings = async () => {
    const { httpStatus, data } = await dao.fetchAllBuildings();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug(`Fetched ${data.length} buildings.`);
      setAllBuildingsList(data);
    }
  };

  useEffect(() => {
    Logger.debug("Buildings component instantiated.");
    getAllBuildings();
  }, []);

  useEffect(() => {
    setPaginateBuildings(allBuildingsList.slice(0, pageSize));
  }, [allBuildingsList]);

  useEffect(() => {
    document.title = "Buildings";
  }, []);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Container maxWidth="xl">
        {roles.admin === "1" && (
          <AddBuildingContainer getAllBuildings={getAllBuildings} />
        )}
        <Grid container rowSpacing={1}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Buildings" variant="pageHeader" />
              <BuildingListContainer
                getAllBuildings={getAllBuildings}
                allBuildingsList={allBuildingsList}
                paginateBuildings={paginateBuildings}
              />
              <BuildingPagination
                pagination={pagination}
                setPagination={setPagination}
                allBuildingsList={allBuildingsList}
                paginateBuildings={paginateBuildings}
                setPaginateBuildings={setPaginateBuildings}
                pageSize={pageSize}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
