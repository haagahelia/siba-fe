import React from "react";
import Grid from "@mui/material/Grid";
import PopUpDialog from "./PopDialog";
import SubjectList from "./SubjectList";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card } from "@mui/material";

//const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;
//import {BASEURL} from "../config/consts.js";
//const baseUrl = BASEURL;

export default function SubjectListContainer(props) {
  const { allSubjectsList, getAllSubjects } = props;
  return (
    <div>
      <PopUpDialog getAllSubjects={getAllSubjects} />
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
              getAllSubjects={getAllSubjects}
              allSubjectsList={allSubjectsList}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
