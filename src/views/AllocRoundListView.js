import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllocRoundListContainer from "../components/AllocRound/AllocRoundListContainer";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";

export default function AllocRoundView() {
  const [paginateAllocRounds, setpaginateAllocRounds] = useState([]);
  const [allAllocRoundsList, setallAllocRoundsList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getAllAllocRounds = async function () {
    const { success, data } = await dao.fetchAllAllocRounds();
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message:
          "Oops! Something went wrong on the server. No allocation found",
      });
      setAlertOpen(true);
      return;
    } else {
      setallAllocRoundsList(data);
      setpaginateAllocRounds(allAllocRoundsList.slice(0, 15));
    }
  };

  useEffect(() => {
    getAllAllocRounds();
  }, []);
  useEffect(() => {
    setpaginateAllocRounds(allAllocRoundsList.slice(0, 15));
  }, [allAllocRoundsList]);

  const navigate = useNavigate();

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Button onClick={() => navigate("addAllocRound")}>
        {" "}
        Create new AllocRound
      </Button>
      <Container maxWidth="100%">
        <Grid
          container
          rowSpacing={0.5}
          justifyContent="space-evenly"
          alignItems="flex-start"
          marginTop="20px"
        >
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Allocation history" />

              <AllocRoundListContainer
                getAllAllocRounds={getAllAllocRounds}
                allAllocRoundsList={allAllocRoundsList}
                paginateAllocRounds={paginateAllocRounds}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
