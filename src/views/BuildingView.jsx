import { useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import AddBuildingContainer from "../components/building/AddBuildingContainer";
import BuildingListContainer from "../components/building/BuildingListContainer";
import AlertBox from "../components/common/AlertBox";
import { useRoleLoggedIn } from "../hooks/useRoleLoggedIn";
import Logger from "../logger/logger";

export default function BuildingView() {
  const { roles } = useRoleLoggedIn();
  const [allBuildingsList, setAllBuildingsList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getAllBuildings = async function () {
    const { httpStatus, data } = await dao.fetchAllBuildings();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug(`Fetched ${data.length} buildings.`);
      setAllBuildingsList(data);
    }
  };

  useEffect(() => {
    Logger.debug("Buildings component instantiated.");
    getAllBuildings();
  }, []);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      {(roles.admin === "1" || roles.planner === "1") && (
        <AddBuildingContainer getAllBuildings={getAllBuildings} />
      )}
      <BuildingListContainer
        getAllBuildings={getAllBuildings}
        allBuildingsList={allBuildingsList}
      />
    </div>
  );
}
