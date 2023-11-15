import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import EquipmentList from "./EquipmentList";
import SingleEquipmentDialog from "./SingleEquipmentDialog";

export default function EquipmentListContainer({
  getAllEquipments,
  equipmentList,
  onPageChange,
  page,
  totalCount,
  rowsPerPage,
}) {
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
              onPageChange={onPageChange}
              page={page}
              totalCount={totalCount}
              rowsPerPage={rowsPerPage}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
