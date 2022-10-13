import React, { useEffect, useState } from "react";
import Axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import axios from "axios";
import AlertBox from "./AlertBox";
import ConfirmationDialog from "./ConfirmationDialog";
import EditSubject from "./EditSubject";
import PopUpDialog from "./PopDialog";

export default function SubjectList(props) {
  // const [subjectList, setSubjectList] = useState([]);
  const { getAllSubjects, subjectList } = props;
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

  // const getAllSubjects = () => {
  //   Axios.get("http://localhost:3001/api/subject/getAll")
  //     .then((response) => {
  //       setSubjectList(response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response.status === 500) {
  //         setAlertOptions({
  //           severity: "error",
  //           title: "Virhe",
  //           message:
  //             "Oho! Jotain meni pieleen palvelimella. Opetuksia ei löytynyt",
  //         });
  //         setAlertOpen(true);
  //         return;
  //       }
  //     });
  // };

  const deleteSubject = (id) => {
    axios
      .delete(`http://localhost:3001/api/subject/delete/${id}`)
      .then((_) => {
        getAllSubjects();
        setAlertOptions({
          severity: "success",
          title: "Onnistui",
          message: "Opetus poistettu",
        });
        setAlertOpen(true);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setAlertOptions({
            severity: "error",
            title: "Virhe",
            message: "Oho! Opetuksen poisto epäonnistui",
          });
          setAlertOpen(true);
          return;
        }
        setAlertOptions({
          severity: "error",
          title: "Virhe",
          message: "Oho! Opetuksen poisto epäonnistui",
        });
        setAlertOpen(true);
        return;
      });
  };

  const submitDelete = (id) => {
    setDialogOptions({
      title: "Haluatko varmasti jatkaa?",
      content: "Painamalla jatka poistat opetuksen listauksesta",
    });
    setDialogOpen(true);
    setDeleteId(id);
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
  /*
  <Dialog open={open} onClose={() => setOpen(false)} width="400px">
        <DialogTitle id="dialog-title">Dialogin otsikko</DialogTitle>
        <DialogContent>
          <PopUpDialog></PopUpDialog>
        </DialogContent>
      </Dialog>*/ //DIALOGI DIVIN JÄLKEEN, EI ANTANUT KOMMENTOIDA SIINÄ KOHTAA
  return (
    <div>
      
      
  
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      ></AlertBox>
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        confirmfunction={deleteSubject}
        functionparam={deleteId}
      ></ConfirmationDialog>
      <EditSubject
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        data={editSubject}
        getAllSubjects={getAllSubjects}
        setEditSubject={setEditSubject}
      ></EditSubject>
      <PopUpDialog
        open={open}
        setOpen={setOpen}
        data={singelSubject}
        setSingleSubject={setSingleSubject}
        submitDelete={submitDelete}
        setEditDialogOpen={setEditDialogOpen}
        setEditSubject={setEditSubject}
      ></PopUpDialog>
      <Box>
        <nav>
          {subjectList.map((value) => {
            return (
              <List key={value.id}>
                <ListItem disablePadding
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
                    ></ListItemText>
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
                    ></ListItemText>
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
                    ></ListItemText>
                  </Grid>
                  <Grid item md={2} xs={2} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Tuntien pituus:
                    </Typography>
                    <ListItemText
                      primary={value.sessionLength}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                  <Grid item md={2} xs={2} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Tuntien määrä:
                    </Typography>
                    <ListItemText
                      primary={value.sessionCount}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                  <Grid item md={2} xs={2} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Pinta-ala:
                    </Typography>
                    <ListItemText
                      primary={value.area}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                  {/*
                  <Grid item md={2} xs={2} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Program id:
                    </Typography>
                    <ListItemText
                      primary={value.programId}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                 */}
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
                    ></ListItemText>
                  </Grid>
                  {/* <Grid item md={1.5} xs={7} padding={2}>
                    <ListItemText>
                      <Button onClick={() => submitDelete(value.id)}>
                        Poista
                      </Button>
                    </ListItemText>
                  </Grid>
                  <Grid item md={1.5} xs={7} padding={2}>
                    <ListItemText>
                      <Button
                        onClick={() => {
                          // Tallentaa editSubjectiin tiedot joita halutaan muokata
                          setEditSubject(value);
                          setEditDialogOpen(true);
                        }}
                      >
                        Muokkaa
                      </Button>
                    </ListItemText>
                  </Grid> */}
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
