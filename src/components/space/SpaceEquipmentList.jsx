import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import DeleteSpaceEquip from "./DeleteSpaceEquip";

export default function SpaceEquipmentList({
  equipListBySpaceId,
  getEquipmentsBySpaceId,
}) {
  return (
    <div>
      {equipListBySpaceId.length ? (
        equipListBySpaceId.map((value) => {
          return (
            <div key={value.equipmentId}>
              <List>
                <ListItem>
                  <DeleteSpaceEquip
                    singleEquipToDelete={value}
                    getEquipmentsBySpaceId={getEquipmentsBySpaceId}
                    subId={value.spaceId}
                  />
                  <DialogContent>
                    <DialogContent variant="sibaDialogContent3">
                      <Grid item xs={12} sm={6}>
                        <Typography variant="boldTitle">
                          Name:&nbsp;&nbsp;
                        </Typography>
                        <Typography variant="singleDialogSubtitle">
                          {value.name}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography variant="boldTitle">
                          Information:&nbsp;&nbsp;
                        </Typography>
                        <Typography variant="singleDialogSubtitle">
                          {value.description}
                        </Typography>
                      </Grid>
                    </DialogContent>
                  </DialogContent>
                </ListItem>
              </List>
            </div>
          );
        })
      ) : (
        <Grid item xs={12} sm={6}>
          <Typography>No equipment added</Typography>
        </Grid>
      )}
    </div>
  );
}
