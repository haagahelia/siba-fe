import React, { useState, useEffect } from "react";
import dao from "../ajax/dao";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import AlertBox from "../components/common/AlertBox";
import BuildingListContainer from "../components/building/BuildingListContainer";
import AddBuildingContainer from "../components/building/AddBuildingContainer";

export default function BuildingView() {
  const [allBuildingsList, setAllBuildingsList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getAllBuildings = async function () {
    const { success, data } = await dao.fetchAllBuildings();
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
    getAllBuildings();
  }, []);

  return (
    <React.Fragment>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Container maxWidth="100%">
        <AddBuildingContainer getAllBuildings={getAllBuildings} />
        <Grid
          container
          rowSpacing={1}
          justifyContent="space-evenly"
          alignItems="flex-start"
          marginTop="20px"
        >
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Buildings" />
              {/* <BuildingFiltering
                allBuildingsList={allBuildingsList}
                setAllBuildingsList={setAllBuildingsList}
              /> */}
              <BuildingListContainer
                getAllBuildings={getAllBuildings}
                allBuildingsList={allBuildingsList}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
