import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProgramList from "./ProgramList";
import SingleProgramDialog from "./SingleProgramDialog";
import { useState } from "react";

export default function ProgramListContainer({
  getAllPrograms,
  allProgramsList,
  paginatePrograms,
}) {

  const [open, setOpen] = useState(false);

  return (
    <div>
      <SingleProgramDialog
      open={open}
      setOpen={setOpen}
      getAllPrograms={getAllPrograms}
      />

      
        <Grid container spacing={2}>
          <Card variant="outlined">
            <CardContent>
              <ProgramList
                getAllPrograms={getAllPrograms}
                allProgramsList={allProgramsList}
                paginatePrograms={paginatePrograms}
              />
            </CardContent>
          </Card>
        </Grid>
      
    </div>
  );
}
