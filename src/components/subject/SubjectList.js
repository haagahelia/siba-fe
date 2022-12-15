import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { TextField, Typography } from "@mui/material";
import SingleSubjectDialog from "./SingleSubjectDialog";

export default function SubjectList(props) {
  const { allSubjectsList, getAllSubjects } = props;
  const [subjectListState, setSubjectListState] = useState(allSubjectsList);

  useEffect(() => {
    if (!searched) {
      setSubjectListState(allSubjectsList);
    }
  });

  const [open, setOpen] = useState(false);
  const [hoverColor, sethoverColor] = useState("#CFD6D5  ");
  const [singleSubject, setSingleSubject] = useState({
    id: null,
    name: null,
    groupSize: null,
    groupCount: null,
    sessionLength: null,
    sessionCount: null,
    area: null,
    programId: null,
    subjectName: null,
    spaceTypeName: null,
  });

  const [searched, setSearched] = useState("");

  const requestSearch = (e) => {
    e.preventDefault();
    setSearched(e.target.value);
    const filteredSubjects = props.allSubjectsList.filter(subject);
    function subject(subject) {
      return subject.subjectName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    }
    setSubjectListState(filteredSubjects);
  };

  // STYLE
  const Box = styled(Paper)(({ theme }) => ({
    overflow: "auto",
  }));
  return (
    <div>
      <SingleSubjectDialog
        open={open}
        setOpen={setOpen}
        singleSubject={singleSubject}
        setSingleSubject={setSingleSubject}
        getAllSubjects={getAllSubjects}
      />
      <Box>
        <TextField
          name="searched"
          placeholder="Opetusten haku:"
          type="text"
          variant="outlined"
          fullWidth
          size="medium"
          value={searched}
          onChange={(e) => requestSearch(e)}
          autoFocus
        />
        <nav>
          {subjectListState.map((value) => {
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
                      Opetuskerran pituus:
                    </Typography>
                    <ListItemText
                      primary={value.sessionLength}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                  <Grid item md={3} xs={7} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Pääaine:
                    </Typography>
                    <ListItemText
                      primary={value.programName}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                  <Grid item md={3} xs={7} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Huoneen tyyppi:
                    </Typography>
                    <ListItemText
                      primary={value.spaceTypeName}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
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
