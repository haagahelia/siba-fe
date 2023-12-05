import React, { useState } from "react";
import { ajaxRequestErrorHandler } from "../../ajax/ajaxRequestErrorHandler";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import "../../styles/AllocationFailure.css";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import TableCell from "@mui/material/TableCell";

import Tooltip from "@mui/material/Tooltip";

import ClickAwayListener from "@mui/material/ClickAwayListener";

export function GetMissingEquipment({ subjId, roomId, item }) {
    const [missingEquipment, setMissingEquipment] = useState(
      "N/A - Not implemented yet",
    );
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [, setAlertOpen] = useState(false);
    const [, setAlertOptions] = useState({
      message: "Whoops!",
      severity: "error",
    });
  
    const handleTooltipClose = () => {
      setTooltipOpen(false);
    };
  
    const handleTooltipOpen = () => {
      if (item > 0) {
        getMissingEquipment(subjId, roomId);
      }
  
      setTooltipOpen(true);
    };
  
    const getMissingEquipment = async function (subjectId, spaceId) {
      Logger.debug(
        "getMissingEquipment: fetching all missing equipment from server.",
      );
      const { httpStatus, data } = await dao.getMissingEquipmentForRoom(
        subjectId,
        spaceId,
      );
      if (httpStatus !== 200) {
        console.log("Whoops!");
        ajaxRequestErrorHandler(
          httpStatus,
          "getMissingEquipment",
          setAlertOptions,
          setAlertOpen,
        );
      } else {
        Logger.debug("getMissingEquipment: successfully fetched");
        const equipmentNames = data.map((item) => item.name);
        setMissingEquipment(`Missing equipment: ${equipmentNames.join(", ")}`);
      }
    };
  
    return (
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          onClose={handleTooltipClose}
          open={tooltipOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          placement="left"
          title={missingEquipment}
        >
          {item > 0 ? (
            <TableCell>
              <CloseIcon
                id="setcursor"
                onClick={handleTooltipOpen}
                color="error"
              />
            </TableCell>
          ) : (
            <TableCell>
              <CheckIcon
                id="setcursor"
                onClick={handleTooltipOpen}
                color="success"
              />
            </TableCell>
          )}
        </Tooltip>
      </ClickAwayListener>
    );
  }