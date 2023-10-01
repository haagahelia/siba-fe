import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DeleteSubEquip from "./DeleteSubEquip";
import EditSubEquipContainer from "./EditSubEquipContainer";

export default function SubjectEquipmentList({
  equipListBySubId,
  getEquipmentsBySubId,
}) {
  return (
    <div>
      {equipListBySubId.length &&
        equipListBySubId.map((value) => {
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
                  <EditSubEquipContainer
                    subId={value.subjectId}
                    equipId={value.equipmentId}
                    prio={value.priority}
                    obli={value.obligatory}
                    name={value.name}
                    getEquipmentsBySubId={getEquipmentsBySubId}
                  />
                  <DeleteSubEquip
                    singleEquipBySubId={value}
                    getEquipmentsBySubId={getEquipmentsBySubId}
                    subId={value.subjectId}
                  />
                </Grid>
                <Grid
                  container
                  variant="sibaGridSingleItemDisplay"
                  column={4}
                  direction="column"
                >
                  <Grid item xs={6}>
                    <ListItemText>
                      <Typography variant="subtitle1">
                        Equipment name:&nbsp; {value.name}
                      </Typography>
                    </ListItemText>
                  </Grid>
                  <Grid item xs={6}>
                    <ListItemText>
                      <Typography variant="subtitle1">
                        Equipment information:&nbsp; {value.description}
                      </Typography>
                    </ListItemText>
                  </Grid>
                  <Grid item xs={6}>
                    <ListItemText>
                      <Typography variant="subtitle1">
                        Equipment priority value:&nbsp; {value.priority}
                      </Typography>
                    </ListItemText>
                  </Grid>
                  <Grid item xs={6}>
                    <ListItemText>
                      <Typography variant="subtitle1">
                        Equipment mandatority :&nbsp;{" "}
                        {value.obligatory === 1
                          ? "Yes"
                          : value.obligatory === 0
                          ? "No"
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
