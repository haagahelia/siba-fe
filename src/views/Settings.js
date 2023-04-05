import React, { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import SettingsListContainer from "../components/settings/SettingsListContainer";
import AddSettingContainer from "../components/settings/AddSettingContainer";
import { CardHeader, Card, Container, Grid } from "@mui/material";
import AlertBox from "../components/common/AlertBox";
import dao from "../ajax/dao";

export default function Settings() {
  const [paginateSettings, setPaginateSettings] = useState([]);
  const [settings, setSettings] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getAllSettings = async function () {
    const { success, data } = await dao.fetchSettings();
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Oops! Something went wrong on the server. No settings found",
      });
      setAlertOpen(true);
      return;
    } else {
      setSettings(data);
      setPaginateSettings(settings.slice(0, 15));
    }
  };

  useEffect(() => {
    getAllSettings();
  }, []);
  useEffect(() => {
    setPaginateSettings(settings.slice(0, 15));
  }, [settings]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Container maxWidth="100%">
        <AddSettingContainer getAllSettings={getAllSettings} />
        <Grid
          container
          rowSpacing={0.5}
          justifyContent="space-evenly"
          alignItems="flex-start"
          marginTop="20px"
        >
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Settings" />

              <SettingsListContainer
                getAllSettings={getAllSettings}
                settings={settings}
                paginateSettings={paginateSettings}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
