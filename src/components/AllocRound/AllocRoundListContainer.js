import React from "react";
import Grid from "@mui/material/Grid";
import AllocRoundList from "./AllocRoundList";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";

export default function AllocRoundListContainer(props) {
  const { getAllAllocRounds, allAllocRoundsList, paginateAllocRounds } = props;
  return (
    <div>
      <Grid
        container
        rowSpacing={1}
        justifyContent="space-evenly"
        alignItems="flex-start"
        marginTop="20px"
      >
        <Card variant="outlined">
          <CardContent>
            <AllocRoundList
              getAllAllocRounds={getAllAllocRounds}
              allAllocRoundsList={allAllocRoundsList}
              paginateAllocRounds={paginateAllocRounds}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
