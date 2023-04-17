import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllocRoundListContainer from "../components/AllocRound/AllocRoundListContainer";
import CardContent from "@mui/material/CardContent";
import {
  CardHeader,
  Card,
  Container /*, Typography*/,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";
import { useTheme } from "@mui/material/styles";

export default function AllocRoundView() {
  const [paginateAllocRounds, setpaginateAllocRounds] = useState([]);
  const [allAllocRoundsList, setallAllocRoundsList] = useState([]);
  //const [allocRoundId, setAllocRoundId] = useState("00000");
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

  const theme = useTheme();

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />

      <Container maxWidth="100%">
        <Grid container rowSpacing={1}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Allocation rounds (Select to change)" />
              <Button
                style={theme.components.MuiButton.greenbutton}
                onClick={() => navigate("addAllocRound")}
              >
                {" "}
                Create new Allocation round
              </Button>
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
