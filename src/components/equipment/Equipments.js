import { useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";
import Logger from "../../logger/logger";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddEquipment from "./AddEquipment";
import EquipmentListContainer from "./EquipmentListContainer";

export default function Equipments() {
  Logger.logPrefix = "Equipments";
  Logger.debug("Equipments component instantiated.");

  const { roles } = RoleLoggedIn();

  // State for checking if Equipment card is expanded
  const [isCardExpanded, setIsCardExpanded] = useState(true);

  const [equipmentList, setEquipmentList] = useState([]);
  const [/* alertOptions, */ setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [/* alertOpen, */ setAlertOpen] = useState(false);

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
    <div style={{ marginLeft: "120px" }}>
      <Container maxWidth="100%">
        {(roles.admin === "1" || roles.planner === "1") && (
          <AddEquipment getAllEquipments={getAllEquipments} />
        )}
        <Grid container rowSpacing={0.5}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader
                title="Equipment"
                onClick={() => setIsCardExpanded(!isCardExpanded)}
              />
              {isCardExpanded && (
                <EquipmentListContainer
                  getAllEquipments={getAllEquipments}
                  equipmentList={equipmentList}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
