import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DeleteUserPlanner from "./DeleteUserPlanner";
import { DialogContent } from "@mui/material";

export default function UserDepartmentList({
  departmentListByUserId,
  getDeparmentsByUserId,
  getAllUsers,
}) {
  return (
    <div>
      {departmentListByUserId.length ? (
        departmentListByUserId.map((value) => {
          return (
            <div key={value.id}>
              <List>
                <ListItem>
                  <DeleteUserPlanner
                    singleDepartmentByUserId={value}
                    getDeparmentsByUserId={getDeparmentsByUserId}
                    userId={value.userId}
                    getAllUsers={getAllUsers}
                  />
                  <DialogContent>
                    <DialogContent variant="sibaDialogContent3">
                      <Grid item xs={12} sm={6}>
                        <Typography variant="boldTitle">
                          Department:&nbsp;&nbsp;
                        </Typography>
                        <Typography variant="singleDialogSubtitle">
                          {value.name}
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
          <Typography>None</Typography>
        </Grid>
      )}
    </div>
  );
}
