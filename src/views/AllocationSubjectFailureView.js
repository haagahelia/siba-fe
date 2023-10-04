import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ajaxRequestErrorHandler } from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import Logger from "../logger/logger";
import "../styles/AllocationFailure.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AlertBox from "../components/common/AlertBox";

export function GetMissingEquipment({ subjId, roomId, item }) {
  const [missingEquipment, setMissingEquipment] = useState(
    "No missing equipment",
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

export default function AllocationSubjectFailureView() {
  const { allocId } = useParams();

  const [unAllocableSubjects, setUnAllocableSubjects] = useState([]);
  const [unAllocSubjectRooms, setUnAllocSubjectRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [currSubjId, setCurrSubjId] = useState();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "Whoops!",
    severity: "error",
  });

  const getUnAlloc = async function (id) {
    const { httpStatus, data } = await dao.getUnAllocableSubjects(id);
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        "getUnAlloc",
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug("getUnAlloc: successfully fetched");
      setUnAllocableSubjects(data);
    }
  };

  const getUnAllocRooms = async function (id) {
    const { httpStatus, data } = await dao.getSubjectRooms(id);
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        "getUnAllocRooms",
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug("getUnAllocRooms: successfully fetched");
      setUnAllocSubjectRooms(data);
      setCurrSubjId(id);
    }
  };

  const handleClickOpen = (id) => () => {
    setOpen(true);
    getUnAllocRooms(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    getUnAlloc(allocId);
  }, [allocId]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />

      <Typography sx={{ color: "#F6E9E9", margin: 2 }}>
        Unallocated lessons (Click each to see reasons for failing to allocate)
      </Typography>

      <div style={{ width: "70%", backgroundColor: "#ff1744", margin: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>The name of the lesson</TableCell>
                <TableCell>Number of people</TableCell>
                <TableCell>Space requirement (m&#178;)</TableCell>
                <TableCell>Space type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody id="setcursor">
              {unAllocableSubjects.map((row) => (
                <TableRow
                  key={row.name}
                  onClick={handleClickOpen(row.subjectId)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.groupSize}</TableCell>
                  <TableCell>{row.area}</TableCell>
                  <TableCell>{row.spaceType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog open={open} onClose={handleClose} scroll="body" maxWidth="70%">
        <DialogTitle>Suitability of the space</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Space name</TableCell>
                  <TableCell>Equipment</TableCell>
                  <TableCell>Space size</TableCell>
                  <TableCell>Number of people</TableCell>
                  <TableCell>Space type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unAllocSubjectRooms.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>

                    <GetMissingEquipment
                      subjectId={currSubjId}
                      roomId={row.id}
                      item={row.missingItems}
                    />
                    <Tooltip disableFocusListener title={row.area}>
                      {row.areaOk === 0 ? (
                        <TableCell>
                          <CloseIcon color="error" />
                        </TableCell>
                      ) : (
                        <TableCell>
                          <CheckIcon color="success" />
                        </TableCell>
                      )}
                    </Tooltip>
                    <Tooltip disableFocusListener title={row.personLimit}>
                      {row.personLimitOk === 0 ? (
                        <TableCell>
                          <CloseIcon color="error" />
                        </TableCell>
                      ) : (
                        <TableCell>
                          <CheckIcon color="success" />
                        </TableCell>
                      )}
                    </Tooltip>
                    <Tooltip disableFocusListener title={row.spaceType}>
                      {row.spaceTypeOk === 0 ? (
                        <TableCell>
                          <CloseIcon color="error" />
                        </TableCell>
                      ) : (
                        <TableCell>
                          <CheckIcon color="success" />
                        </TableCell>
                      )}
                    </Tooltip>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "#ff6d00",
              cursor: "pointer"
            }}
          >
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
