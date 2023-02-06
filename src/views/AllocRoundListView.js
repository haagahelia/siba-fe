import React, { useState, useEffect } from "react";
import AllocationListContainer from "../components/AllocRound/AllocRoundListItem";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";

export default function AllocationView() {
  const [paginateAllocations, setPaginateAllocations] = useState([]);
  const [allAllocationsList, setAllAllocationsList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getAllAllocations = async function () {
    const { success, data } = await dao.fetchAllAllocations();
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
      setAllAllocationsList(data);
      setPaginateAllocations(allAllocationsList.slice(0, 15));
    }
  };

  useEffect(() => {
    getAllAllocations();
  }, []);
  useEffect(() => {
    setPaginateAllocations(allAllocationsList.slice(0, 15));
  }, [allAllocationsList]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
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

              <AllocationListContainer
                getAllAllocations={getAllAllocations}
                allAllocationsList={allAllocationsList}
                paginateAllocations={paginateAllocations}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
