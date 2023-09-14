import React, { useState, useEffect } from "react";
import dao from "../../ajax/dao";
import Grid from "@mui/material/Grid";
import { CardHeader, Card, Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import AddEquipment from "./AddEquipment";
import EquipmentListContainer from "./EquipmentListContainer";
import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";
import Logger from "../../logger/logger";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";

export default function Equipments() {
  Logger.logPrefix = "Equipments";
  Logger.debug("Equipments component instantiated.");
  const [equipmentList, setEquipmentList] = useState([]);
  const [/*alertOptions,*/ setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [/* alertOpen ,*/ setAlertOpen] = useState(false);
  const { roles } = RoleLoggedIn();

  const getAllEquipments = async function () {
    Logger.debug("getAllEquipments: fetching all equipments from server.");
    const { httpStatus, data } = await dao.fetchEquipmentData();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      setEquipmentList(data);
      Logger.info(
        `getAllEquipments: successfully fetched ${data.length} subjects.`,
      );
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
