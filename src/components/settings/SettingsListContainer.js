import React from "react";
import Grid from "@mui/material/Grid";
import SettingsList from "./SettingsList";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";

export default function SettingsListContainer(props) {
  const { getAllSettings, incrementDataModifiedCounter, paginateSettings } =
    props;
  return (
    <div>
      <Grid container rowSpacing={0.5}>
        <Card variant="outlined">
          <CardContent>
            <SettingsList
              getAllSettings={getAllSettings}
              //allSettings={allSettings}
              incrementDataModifiedCounter={incrementDataModifiedCounter}
              paginateSettings={paginateSettings}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
