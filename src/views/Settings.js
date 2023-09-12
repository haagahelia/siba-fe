/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import SettingsListContainer from "../components/settings/SettingsListContainer";
import AddSettingContainer from "../components/settings/AddSettingContainer";
import { CardHeader, Card, Container, Grid } from "@mui/material";
import AlertBox from "../components/common/AlertBox";
import dao from "../ajax/dao";
import { RoleLoggedIn } from "../customhooks/RoleLoggedIn";
import Logger from "../logger/logger";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";

export default function Settings() {
  Logger.logPrefix = "Settings";
  const [paginateSettings, setPaginateSettings] = useState([]);
  const [settings, setSettings] = useState([]);
  const [dataModifiedCounter, setDataModifiedCounter] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const { roles } = RoleLoggedIn();

  const getAllSettings = async function () {
    Logger.debug("Fetching all settings");
    const { httpStatus, data } = await dao.fetchSettings();
    if (httpStatus !== 200) {
      Logger.debug("Error fetching settings");
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.info(`Fetched ${data.length} settings.`);
      setSettings(data);
      setPaginateSettings(settings.slice(0, 15));
    }
  };

  const incrementDataModifiedCounter = () => {
    let newValue = dataModifiedCounter + 1;
    setDataModifiedCounter(newValue);
  };

  useEffect(() => {
    getAllSettings();
  }, []);

  useEffect(() => {
    getAllSettings();
  }, [dataModifiedCounter]);

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
        {(roles.admin === "1" || roles.planner === "1") && (
          <AddSettingContainer getAllSettings={getAllSettings} />
        )}
        <Grid container rowSpacing={0.5}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Settings" />

              <SettingsListContainer
                getAllSettings={getAllSettings}
                incrementDataModifiedCounter={incrementDataModifiedCounter}
                allSettings={settings}
                paginateSettings={paginateSettings}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
