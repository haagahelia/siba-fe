import { useEffect, useState } from "react";
import dao from "../../ajax/dao";
import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";
import Logger from "../../logger/logger";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AlertBox from "../common/AlertBox";
import AddBuildingContainer from "./AddBuildingContainer";
import BuildingListItem from "./BuildingListItem";
import SingleBuildingDialog from "./SingleBuildingDialog";

export default function BuildingList() {
  Logger.logPrefix = "Buildings";

  const { roles } = RoleLoggedIn();

  const [allBuildingsList, setAllBuildingsList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [open, setOpen] = useState(false);
  const [singleBuilding, setSingleBuilding] = useState(null);
  // State for checking if the card is expanded
  const [isCardExpanded, setIsCardExpanded] = useState(true);

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
    <>
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
            <CardHeader
              title="Buildings"
              onClick={() => setIsCardExpanded(!isCardExpanded)}
            />
            <CardContent style={{ display: isCardExpanded ? "block" : "none" }}>
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
    </>
  );
}
