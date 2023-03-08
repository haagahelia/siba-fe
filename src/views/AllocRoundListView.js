import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AllocRoundListContainer from "../components/AllocRound/AllocRoundListContainer";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";
import { AppContext } from "../AppContext";

export default function AllocRoundView() {
  const [paginateAllocRounds, setpaginateAllocRounds] = useState([]);
  const [allAllocRoundsList, setallAllocRoundsList] = useState([]);
  const [allocRoundId, setAllocRoundId] = useState("00000");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const appContext = useContext(AppContext);

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
    setAllocRoundId(appContext.allocRoundId); // Initial
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
          rowSpacing={1}
          justifyContent="space-evenly"
          alignItems="flex-start"
          marginTop="20px"
        >
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Allocation rounds (Select to change)" />
              <Typography color="white">
                Current allocation round: {allocRoundId}
              </Typography>
              <AllocRoundListContainer
                getAllAllocRounds={getAllAllocRounds}
                allAllocRoundsList={allAllocRoundsList}
                paginateAllocRounds={paginateAllocRounds}
                setAllocRoundId={setAllocRoundId}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
