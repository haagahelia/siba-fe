import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import SingleEquipmentDialog from "./SingleEquipmentDialog";
import EquipmentList from "./EquipmentList";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";

export default function EquipmentListContainer(props) {
  const { getAllEquipments, equipmentList } = props;

  const [open, setOpen] = useState(false);

  return (
    <div>
      <SingleEquipmentDialog
        open={open}
        setOpen={setOpen}
        getAllEquipments={getAllEquipments}
      />
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
