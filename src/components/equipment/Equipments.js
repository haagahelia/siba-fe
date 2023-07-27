import React, { useState, useEffect } from "react";
import dao from "../../ajax/dao";
import Grid from "@mui/material/Grid";
import { CardHeader, Card, Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import AddEquipment from "./AddEquipment";
import EquipmentListContainer from "./EquipmentListContainer";
import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";
import Logger from "../../logger/logger";

export default function Equipments() {
  Logger.logPrefix = "Equipments";
  Logger.debug("Equipments component instantiated.");
  const [equipmentList, setEquipmentList] = useState([]);
  const [/*alertOptions,*/ setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [/* alertOpen ,*/ setAlertOpen] = useState(false);
  const { roles, setRoles } = RoleLoggedIn();

  const getAllEquipments = async function () {
    const { success, data } = await dao.fetchEquipmentData();
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Oops! Something went wrong on the server. No equipment found",
      });
      setAlertOpen(true);
      Logger.error("Error when fetching equipment data");
      return;
    } else {
      setEquipmentList(data);
      Logger.info(`Successfully fetched equipment data. Count: ${data.length}`);
    }
  };

  useEffect(() => {
    Logger.debug("Calling getAllEquipments in useEffect");
    getAllEquipments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Container maxWidth="100%">
        {(roles.admin === "1" || roles.planner === "1") && (
          <AddEquipment getAllEquipments={getAllEquipments} />
        )}
        <Grid container rowSpacing={0.5}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Equipment" />
              <EquipmentListContainer
                getAllEquipments={getAllEquipments}
                equipmentList={equipmentList}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
