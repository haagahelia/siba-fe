import React from "react";
import SubjectList from "../components/subject/SubjectList";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddSubject from "../components/subject/AddSubject";

const SubjectView = () => {
  const Card = styled(Paper)(({ theme }) => ({
    backgroundColor: "rgba(52, 139, 147, 0.5 )",
    width: "75%",
    overflow: "auto",
  }));
  return (
    <div>
      <Container maxWidth="100%">
        <AddSubject />
        <Grid
          container
          rowSpacing={0.5}
          justifyContent="space-evenly"
          //padding={2} // was 7
          alignItems="flex-start"
          marginTop="20px"
        >
          <Card variant="outlined">
            <CardContent>
              <CardHeader
                title="Subject"
                sx={{ fontSize: 25 }}
                className="card-header"
              />
              <SubjectList />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
};

export default SubjectView;
