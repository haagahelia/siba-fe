import React, { useState, useEffect } from "react";
import dao from "../../ajax/dao";
import Grid from "@mui/material/Grid";
import { CardHeader, Card, Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import AddEquipment from "./AddEquipment";
import EquipmentListContainer from "./EquipmentListContainer";

export default function EquipmentResult() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [alertOpen, setAlertOpen] = useState(false);

  const getAllEquipments = async function () {
    const { success, data } = await dao.fetchEquipmentData();
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Oops! Something went wrong on the server. No equipment found",
      });
      setAlertOpen(true);
      return;
    } else {
      setEquipmentList(data);
    }
  };

  useEffect(() => {
    getAllEquipments();
  }, []);

  return (
    <div>
      <Container maxWidth="100%">
        <AddEquipment getAllEquipments={getAllEquipments} />
        <Grid
          container
          rowSpacing={0.5}
          justifyContent="space-evenly"
          alignItems="flex-start"
          marginTop="20px"
        >
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
