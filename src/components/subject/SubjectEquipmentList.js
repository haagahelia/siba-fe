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
import EditSubjectEquipment from "./EditSubjectEquipment";

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
                item
                xs={3}
                sx={{
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <EditSubjectEquipment
                  data={value}
                  subId={value.subjectId}
                  equipId={value.equipmentId}
                  prio={value.priority}
                  obli={value.obligatory}
                  name={value.name}
                  refreshSubjects={refreshSubjects}
                  setEquipmentNamesList={setEquipmentNamesList}
                />
                <DeleteSubjectEquipment
                  values={value}
                  equipmentNamesList={equipmentNamesList}
                  refreshSubjects={refreshSubjects}
                />
              </Grid>
              <Grid
                container
                column={14}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                padding={0.5}
              >
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
                <Grid item xs={6}>
                  <ListItemText>
                    <Typography variant="subtitle1">
                      Varusteen prioriteetti arvo:&nbsp; {value.priority}
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
