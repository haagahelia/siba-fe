import React, { useState, useEffect } from "react";
import dao from "../../ajax/dao";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import AlertBox from "../common/AlertBox";
import BuildingListItem from "./BuildingListItem";
import AddBuildingContainer from "./AddBuildingContainer";
import SingleBuildingDialog from "./SingleBuildingDialog";
import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";
import Logger from "../../logger/logger";

export default function BuildingList() {
  Logger.logPrefix = "Buildings";
  const [allBuildingsList, setAllBuildingsList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const { roles } = RoleLoggedIn();

  const [open, setOpen] = useState(false);

  const [singleBuilding, setSingleBuilding] = useState(null);

  const getAllBuildings = async function () {
    const { success, data } = await dao.fetchAllBuildings();
    if (success) {
      Logger.debug(`Fetched ${data.length} buildings.`);
    } else {
      Logger.error("Failed to fetch buildings.");
    }
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Oops! Something went wrong on the server. No building found",
      });
      setAlertOpen(true);
      return;
    } else {
      setAllBuildingsList(data);
    }
  };

  useEffect(() => {
    Logger.debug("Buildings component instantiated.");
    getAllBuildings();
  }, []);

  return (
    <React.Fragment>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Container>
        {(roles.admin === "1" || roles.planner === "1") && (
          <AddBuildingContainer getAllBuildings={getAllBuildings} />
        )}
        <SingleBuildingDialog
          open={open}
          setOpen={setOpen}
          singleBuilding={singleBuilding}
          setSingleBuilding={setSingleBuilding}
          getAllBuildings={getAllBuildings}
        />
        <Grid container rowSpacing={1}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Buildings" />
              {allBuildingsList.map((buildingDetail) => {
                return (
                  <List key={buildingDetail.id}>
                    <ListItem
                      disablePadding
                      onClick={() => {
                        setSingleBuilding(buildingDetail);
                        Logger.debug(
                          `Building selected: ${JSON.stringify(
                            buildingDetail,
                          )}`,
                        );
                        setOpen(true);
                      }}
                      //onMouseEnter={() => sethoverColor("#CFD6D5  ")}
                      //onMouseLeave={() => sethoverColor("#FFFFFF ")}
                    >
                      <BuildingListItem
                        open={open}
                        setOpen={setOpen}
                        singleBuilding={buildingDetail}
                        setSingleBuilding={setSingleBuilding}
                        getAllBuildings={getAllBuildings}
                      />
                    </ListItem>
                  </List>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
