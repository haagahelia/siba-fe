import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import SettingsList from "./SettingsList";

export default function SettingsListContainer({
  getAllSettings,
  incrementDataModifiedCounter,
  paginateSettings,
}) {
  return (
    <div>
      <Grid container rowSpacing={0.5}>
        <Card variant="outlined">
          <CardContent>
            <SettingsList
              getAllSettings={getAllSettings}
              // allSettings={allSettings}
              incrementDataModifiedCounter={incrementDataModifiedCounter}
              paginateSettings={paginateSettings}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
