import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function SpaceEquipmentList({
  equipListBySpaceId,
  getEquipmentsBySpaceId,
}) {
  return (
    <div>
      {equipListBySpaceId.length &&
        equipListBySpaceId.map((value) => {
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
                />
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
                </Grid>
              </ListItem>
            </List>
          );
        })}
    </div>
  );
}
