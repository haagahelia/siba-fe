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
  const { equipmentNamesList, equipmentNames } = props;

  return (
    <div>
      {equipmentNamesList.map((value) => {
        return (
          <List key={value.equipmentId}>
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
                  equipmentNames={equipmentNames}
                />
                <DeleteSubjectEquipment
                  values={value}
                  equipmentNames={equipmentNames}
                  subId={value.subjectId}
                />
              </Grid>
              <Grid
                container
                column={4}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                padding={0.2}
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
                <Grid item xs={6}>
                  <ListItemText>
                    <Typography variant="subtitle1">
                      Varuste pakollisuus :&nbsp;{" "}
                      {value.obligatory === 1
                        ? "Kyllä"
                        : value.obligatory === 0
                        ? "Ei"
                        : null}
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
