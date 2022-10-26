import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import EditSubject from "./EditSubject";
import PopUpDialog from "./PopDialog";
import dao from "../../ajax/dao";

//const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;
//import {BASEURL} from "../config/consts.js";
//const baseUrl = BASEURL;

export default function SubjectList(props) {
  const { subjectList, refreshSubjects } = props;
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  // Tähän tallennetaan muokattavan subjectin tiedot, null kunnes muokkausnappia painaa
  const [editSubject, setEditSubject] = useState({
    id: null,
    name: null,
    groupSize: null,
    groupCount: null,
    sessionLength: null,
    sessionCount: null,
    area: null,
    programId: null,
    subjectName: null,
  });

  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });
  const [deleteId, setDeleteId] = useState("");

  const deleteSubject = async (value) => {
    let result = await dao.deleteSingleSubject(value);
    if (result === 400) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen - yritä hetken kuluttua uudestaan.",
      });
      setAlertOpen(true);
      return;
    }

    if (result === "error") {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message:
          "Jokin meni pieleen, opetuksen poisto epäonnistui - yritä hetken kuluttua uudestaan.",
      });
      setAlertOpen(true);
      return;
    }

    setAlertOptions({
      severity: "success",
      title: "Onnistui!",
      message: `${value.subjectName} poistettu.`,
    });
    setAlertOpen(true);

    refreshSubjects();
  };

  const submitDelete = (value) => {
    setDialogOptions({
      title: `Haluatko varmasti poistaa ${value.subjectName}?`,
      content:
        `Painamalla jatka poistat ${value.subjectName} listauksesta.`,
    });
    setDialogOpen(true);
    setDeleteId(value.id);
    return;
  };

  const [open, setOpen] = useState(false);
  const [hoverColor, sethoverColor] = useState("#CFD6D5  ");

  const [singelSubject, setSingleSubject] = useState({
    id: null,
    name: null,
    groupSize: null,
    groupCount: null,
    sessionLength: null,
    sessionCount: null,
    area: null,
    programId: null,
    subjectName: null,
  });

  // STYLES
  const Box = styled(Paper)(({ theme }) => ({
    overflow: "auto",
  }));

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        confirmfunction={deleteSubject}
        functionparam={deleteId}
      />
      <EditSubject
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        data={editSubject}
        refreshSubjects={refreshSubjects}
        setEditSubject={setEditSubject}
      />
      <PopUpDialog
        open={open}
        setOpen={setOpen}
        data={singelSubject}
        setSingleSubject={setSingleSubject}
        submitDelete={submitDelete}
        setEditDialogOpen={setEditDialogOpen}
        setEditSubject={setEditSubject}
      />
      <Box>
        <nav>
          {subjectList.map((value) => {
            return (
              <List key={value.id}>
                <ListItem
                  disablePadding
                  button
                  onClick={() => {
                    setSingleSubject(value);

                    setOpen(true);
                  }}
                  onMouseEnter={() => sethoverColor("#CFD6D5  ")}
                  onMouseLeave={() => sethoverColor("#FFFFFF ")}
                >
                  <Grid item md={3} xs={7} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Nimi:
                    </Typography>
                    <ListItemText
                      primary={value.subjectName}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={2} xs={3} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Ryhmän koko:
                    </Typography>
                    <ListItemText
                      primary={value.groupSize}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={2} xs={2} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Ryhmien määrä:
                    </Typography>
                    <ListItemText
                      primary={value.groupCount}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={2} xs={2} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Opetuskerran pituus:
                    </Typography>
                    <ListItemText
                      primary={value.sessionLength}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={3} xs={7} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Pääaine:
                    </Typography>
                    <ListItemText
                      primary={value.name}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                </ListItem>
                <Divider />
              </List>
            );
          })}
        </nav>
      </Box>
    </div>
  );
}
