import CardHeader from "@mui/material/CardHeader";
// The Settings Page
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";
import {
  CommonContainer,
  CommonContentContainer,
} from "../components/common/CommonContainers";
import AddSettingContainer from "../components/settings/AddSettingContainer";
import SettingsListContainer from "../components/settings/SettingsListContainer";
import SettingsPagination from "../components/settings/SettingsPagination";
import { useRoleLoggedIn } from "../hooks/useRoleLoggedIn";
import Logger from "../logger/logger";
import { handleSettings } from "../setting/handleSettings";

export default function SettingsView() {
  Logger.logPrefix = "SettingsView";

  const { roles } = useRoleLoggedIn();
  const appContext = useContext(AppContext);
  const pageSize = appContext.settings.itemsPerPage;

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
  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });

  const getAllSettings = async () => {
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
      setPaginateSettings(settings.slice(0, pageSize));
      handleSettings(data, appContext);
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
    setPaginateSettings(settings.slice(0, pageSize));
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
      <CommonContainer>
        {roles.admin === "1" && (
          <AddSettingContainer getAllSettings={getAllSettings} />
        )}
        <CommonContentContainer>
          <CardHeader
            title="Settings"
            onClick={() => setIsCardExpanded(!isCardExpanded)}
            variant="pageHeader"
          />
          {isCardExpanded && (
            <>
              <SettingsListContainer
                getAllSettings={getAllSettings}
                incrementDataModifiedCounter={incrementDataModifiedCounter}
                allSettings={settings}
                paginateSettings={paginateSettings}
              />
              <SettingsPagination
                pagination={pagination}
                setPagination={setPagination}
                allSettingsList={settings}
                paginateSettings={paginateSettings}
                setPaginateSettings={setPaginateSettings}
                pageSize={pageSize}
              />
            </>
          )}
        </CommonContentContainer>
      </CommonContainer>
    </div>
  );
}
