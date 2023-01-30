import React from "react";
import Grid from "@mui/material/Grid";
import SingleSubjectDialog from "./SingleSubjectDialog";
import SubjectList from "./SubjectList";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material"; //{ Container, CardHeader}???
//import SubjectPagination from "./SubjectPagination";???

//const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;
//import {BASEURL} from "../config/consts.js";
//const baseUrl = BASEURL;

export default function SubjectListContainer(props) {
  const { getAllSubjects, allSubjectsList, paginateSubjects } = props;
  return (
    <div>
      <SingleSubjectDialog getAllSubjects={getAllSubjects} />
      <Grid
        container
        rowSpacing={0.5}
        justifyContent="space-evenly"
        alignItems="flex-start"
        marginTop="20px"
      >
        <Card variant="outlined">
          <CardContent>
            <SubjectList
              getAllSubjects={getAllSubjects}
              allSubjectsList={allSubjectsList}
              paginateSubjects={paginateSubjects}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
