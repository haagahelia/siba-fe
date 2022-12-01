import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import dao from "../../ajax/dao";
import DeleteSubjectEquipment from "./DeleteSubjectEquipment";

export default function SubjectEquipmentList(props) {
  const { data, refreshSubjects } = props;
  const [equipmentNamesList, setEquipmentNamesList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const equipmentNames = async function (subjectId) {
    const data = await dao.getEquipmentBySubjectId(subjectId);
    if (data === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen palvelimella. Varusteita ei löytynyt",
      });
      setAlertOpen(true);
      return;
    } else {
      setEquipmentNamesList(data);
    }
  };
  useEffect(() => {
    equipmentNames(data?.id);
  }, []);
  return (
    <div>
      {equipmentNamesList.map((value) => {
        return (
          <List key={data?.id}>
            <ListItem>
              <Grid
                container
                column={14}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid
                  item
                  xs={6}
                  sx={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  {/* <Button
                    variant="contained"
                    color="warning"
                    sx={{ margin: "5px" }}
                  >
                    Muokkaa
                  </Button> */}

                  <DeleteSubjectEquipment
                    values={value}
                    equipmentNamesList={equipmentNamesList}
                    refreshSubjects={refreshSubjects}
                  />
                </Grid>

                <Grid item xs={6}>
                  <ListItemText>
                    <Typography variant="subtitle1">
                      Varusteen nimi:&nbsp; {value.name}
                    </Typography>
                  </ListItemText>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText>
                    <Typography variant="subtitle1">
                      Varusteen tiedot:&nbsp; {value.description}
                    </Typography>
                  </ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        );
      })}
    </div>
  );
}
