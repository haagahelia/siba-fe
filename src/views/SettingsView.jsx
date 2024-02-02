// The Settings Page
import { useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import { useRoleLoggedIn } from "../hooks/useRoleLoggedIn";
import Logger from "../logger/logger";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AlertBox from "../components/common/AlertBox";
import AddSettingContainer from "../components/settings/AddSettingContainer";
import SettingsListContainer from "../components/settings/SettingsListContainer";

export default function SettingsView() {
  Logger.logPrefix = "SettingsView";

  const { roles } = useRoleLoggedIn();

  // State for checking if Settings card is expanded
  const [isCardExpanded, setIsCardExpanded] = useState(true);

  const [paginateSettings, setPaginateSettings] = useState([]);
  const [settings, setSettings] = useState([]);
  const [dataModifiedCounter, setDataModifiedCounter] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getAllSettings = async function () {
    Logger.debug("Fetching all settings");
    const { httpStatus, data } = await dao.fetchSettings();
    if (httpStatus !== 200) {
      Logger.error(`Error fetching settings, http status code: ${httpStatus}`);
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
    const newValue = dataModifiedCounter + 1;
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

  useEffect(() => {
    document.title = "Settings";
  }, []);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Container maxWidth="100%">
        {roles.admin === "1" && (
          <AddSettingContainer getAllSettings={getAllSettings} />
        )}
        <Grid container rowSpacing={0.5}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader
                title="Settings"
                onClick={() => setIsCardExpanded(!isCardExpanded)}
                variant="pageHeader"
              />
              {isCardExpanded && (
                <SettingsListContainer
                  getAllSettings={getAllSettings}
                  incrementDataModifiedCounter={incrementDataModifiedCounter}
                  allSettings={settings}
                  paginateSettings={paginateSettings}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
