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

export default function SubjectEquipmentList(props) {
  const { subjectList, data } = props;
  const [equipmentNamesList, setEquipmentNamesList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  let value = data?.id;
  const equipmentNames = async function (id) {
    id = value;
    const data = await dao.getEquipmentBySubjectId(id);
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
    equipmentNames();
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
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ margin: "5px" }}
                  >
                    Muokkaa
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ margin: "5px" }}
                    onClick={() => {
                      console.log("equipment id", value.equipmentId);
                      console.log("Subject id", value.id);
                    }}
                  >
                    Poista
                  </Button>
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
