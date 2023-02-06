import React from "react";
import Grid from "@mui/material/Grid";
import AllocationList from "./AllocRoundList";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";

export default function AllocationListContainer(props) {
  const { getAllAllocations, allAllocationsList, paginateAllocations } = props;
  return (
    <div>
      <Grid
        container
        rowSpacing={0.5}
        justifyContent="space-evenly"
        alignItems="flex-start"
        marginTop="20px"
      >
        <Card variant="outlined">
          <CardContent>
            <AllocationList
              getAllAllocations={getAllAllocations}
              allAllocationsList={allAllocationsList}
              paginateAllocations={paginateAllocations}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
