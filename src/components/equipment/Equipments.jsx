// The Equipment Page
import { useContext, useEffect, useState } from "react";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { AppContext } from "../../AppContext";
import {
  CommonContainer,
  CommonContentContainer,
} from "../common/CommonContainers";
import AddEquipment from "./AddEquipment";
import EquipmentListContainer from "./EquipmentListContainer";

export default function Equipments() {
  Logger.logPrefix = "Equipments";
  Logger.debug("Equipments component instantiated.");

  const { roles } = useRoleLoggedIn();
  const [equipmentList, setEquipmentList] = useState([]);
  const rowsPerPage = useContext(AppContext).settings.itemsPerPage;
  const [paginateEquipment, setPaginateEquipment] = useState([]);

  const [pagination, setPagination] = useState({
    from: 0,
    to: rowsPerPage,
  });

  const totalCount = Math.ceil(equipmentList.length / rowsPerPage);

  const [/* alertOptions, */ setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [/* alertOpen, */ setAlertOpen] = useState(false);

  const getAllEquipments = async () => {
    Logger.debug("getAllEquipments: fetching all equipments from server.");
    const { httpStatus, data } = await dao.fetchEquipmentData();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      setEquipmentList(data);
      Logger.info(
        `getAllEquipments: successfully fetched ${data.length} subjects.`,
      );
    }
  };

  useEffect(() => {
    Logger.debug("Calling getAllEquipments in useEffect");
    getAllEquipments();
  }, []);

  useEffect(() => {
    document.title = "Equipment";
  }, []);

  return (
    <div>
      <CommonContainer>
        {roles.admin === "1" && (
          <AddEquipment getAllEquipments={getAllEquipments} />
        )}
        <CommonContentContainer>
          <CardHeader title="Equipment" variant="pageHeader" />
          <EquipmentListContainer
            getAllEquipments={getAllEquipments}
            equipmentList={equipmentList}
            paginateEquipment={paginateEquipment}
            setPaginateEquipment={setPaginateEquipment}
            pagination={pagination}
            setPagination={setPagination}
            totalCount={totalCount}
            rowsPerPage={rowsPerPage}
          />
        </CommonContentContainer>
      </CommonContainer>
    </div>
  );
}
