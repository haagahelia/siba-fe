import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import dao from "../ajax/dao";
import AllocRoundListContainer from "../components/allocRound/AllocRoundListContainer";
import AllocRoundPagination from "../components/allocRound/AllocRoundPagination";
import AlertBox from "../components/common/AlertBox";
import { useRoleLoggedIn } from "../hooks/useRoleLoggedIn";
import Logger from "../logger/logger";

export default function AllocRoundView() {
  Logger.logPrefix = "AllocRoundView";
  const { roles } = useRoleLoggedIn();
  const navigate = useNavigate();
  const pageSize = useContext(AppContext).settings.itemsPerPage;

  const [paginateAllocRounds, setpaginateAllocRounds] = useState([]);
  const [allAllocRoundsList, setallAllocRoundsList] = useState([]);
  const [dataModifiedCounter, setDataModifiedCounter] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });

  const getAllAllocRounds = async () => {
    Logger.debug("Fetching all allocation rounds");
    const { success, data } = await dao.fetchAllAllocRounds();
    if (!success) {
      Logger.error("Error fetching allocation rounds");
      setAlertOptions({
        severity: "error",
        title: "Error",
        message:
          "Oops! Something went wrong on the server. No allocation found",
      });
      setAlertOpen(true);
      return;
    }
    Logger.debug(`Fetched allocation rounds: ${data.length}`);
    setallAllocRoundsList(data);
    setpaginateAllocRounds(data.slice(0, pageSize));
  };

  const incrementDataModifiedCounter = () => {
    const newValue = dataModifiedCounter + 1;
    setDataModifiedCounter(newValue);
  };

  useEffect(() => {
    //getAllAllocRounds();
    document.title = "Allocations";
  }, []);

  useEffect(() => {
    getAllAllocRounds();
  }, [dataModifiedCounter]);

  useEffect(() => {
    setpaginateAllocRounds(allAllocRoundsList.slice(0, pageSize));
  }, [allAllocRoundsList]);

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
              <CardHeader title="Allocation Rounds" variant="pageHeader" />
              {roles.admin === "1" && (
                <Button
                  variant="componentAddButton"
                  onClick={() =>
                    navigate("addAllocRound", { state: { allAllocRoundsList } })
                  }
                >
                  + Add
                </Button>
              )}
              <AllocRoundListContainer
                getAllAllocRounds={getAllAllocRounds}
                allAllocRoundsList={allAllocRoundsList}
                paginateAllocRounds={paginateAllocRounds}
                incrementDataModifiedCounter={incrementDataModifiedCounter}
              />
              <AllocRoundPagination
                pagination={pagination}
                setPagination={setPagination}
                allAllocRoundsList={allAllocRoundsList}
                paginateAllocRounds={paginateAllocRounds}
                setPaginateAllocRounds={setpaginateAllocRounds}
                pageSize={pageSize}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
