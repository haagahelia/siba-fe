import React, { useEffect, useState } from "react";
import { ajaxRequestErrorHandler } from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import "../../styles/AllocationFailure.css";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";

export function GetMissingEquipment({ subjId, roomId, missingEquipmentCount }) {
  const [missingEquipment, setMissingEquipment] = useState(
    "No equipment missing",
  );
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "Whoops!",
    severity: "error",
  });

  useEffect(() => {
    const getMissingEquipment = async (subjectId, spaceId) => {
      Logger.debug(
        "getMissingEquipment: fetching all missing equipment from server.",
      );
      const { httpStatus, data } = await dao.getMissingEquipmentForRoom(
        subjectId,
        spaceId,
      );
      if (httpStatus !== 200) {
        Logger.error("getMissingEquipment: failed to fetch missing equipment");
        ajaxRequestErrorHandler(
          httpStatus,
          "getMissingEquipment",
          setAlertOptions,
          setAlertOpen,
        );
      } else {
        Logger.debug("getMissingEquipment: successfully fetched");
        const equipmentNames = data.map((equipmentObj) => equipmentObj.name);
        setMissingEquipment(`Missing equipment: ${equipmentNames.join(", ")}`);
      }
    };

    if (missingEquipmentCount > 0) {
      getMissingEquipment(subjId, roomId);
    }
  }, [missingEquipmentCount, subjId, roomId]);

  /*
    const handleTooltipClose = () => {
      setTooltipOpen(false);
    };
  
    const handleTooltipOpen = () => {
      setTooltipOpen(true);
    };
    */

  return (
    <Tooltip disableFocusListener title={missingEquipment}>
      {missingEquipmentCount > 0 ? (
        <TableCell>
          <CloseIcon className="redIcon" />
        </TableCell>
      ) : (
        <TableCell>
          <CheckIcon className="greenIcon" />
        </TableCell>
      )}
    </Tooltip>
  );
}
