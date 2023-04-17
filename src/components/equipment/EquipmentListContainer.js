import React from "react";
import Grid from "@mui/material/Grid";
import SingleEquipmentDialog from "./SingleEquipmentDialog";
import EquipmentList from "./EquipmentList";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";

export default function EquipmentListContainer(props) {
  const { getAllEquipments, equipmentList } = props;
  return (
    <div>
      <SingleEquipmentDialog getAllEquipments={getAllEquipments} />
      <Grid container rowSpacing={1}>
        <Card variant="outlined">
          <CardContent>
            <EquipmentList
              getAllEquipments={getAllEquipments}
              equipmentList={equipmentList}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
