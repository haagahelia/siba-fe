import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  DialogActions,
} from "@mui/material";
import dao from "../../ajax/dao";
import AlertBox from "../common/AlertBox";

export default function SingleBuildingDialog(props) {
  const { open, setOpen, singleSubject, getAllSubjects, setSingleSubject } =
    props;

  const [equipListBySubId, setEquipListBySubId] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  return <div />;
}
