import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import EditSubject from "./EditSubject";
import PopUpDialog from "./PopDialog";
import SubjectList from "./SubjectList";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container } from "@mui/material";

//const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;
//import {BASEURL} from "../config/consts.js";
//const baseUrl = BASEURL;

export default function SubjectList(props) {
  const { subjectList, refreshSubjects, setSubjectList } = props;
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

  return (
    <div>
      <PopUpDialog
        refreshSubjects={refreshSubjects}
        setEditDialogOpen={setEditDialogOpen}
        setEditSubject={setEditSubject}
      />
      <Grid
        container
        rowSpacing={0.5}
        justifyContent="space-evenly"
        alignItems="flex-start"
        marginTop="20px"
      >
        <Card variant="outlined">
          <CardContent>
            <CardHeader title="Opetukset" />
            <SubjectList
              refreshSubjects={refreshSubjects}
              subjectList={subjectList}
              setSubjectList={setSubjectList}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
