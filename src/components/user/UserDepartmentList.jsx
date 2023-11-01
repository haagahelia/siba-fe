import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DeleteUserPlanner from "./DeleteUserPlanner";

export default function UserDepartmentList({
  departmentListByUserId,
  getDeparmentsByUserId,
  getAllUsers,
}) {
  return (
    <div>
      {departmentListByUserId.length &&
        departmentListByUserId.map((value) => {
          return (
            <List key={value.id}>
              <ListItem>
                <Grid
                  item
                  xs={3}
                  sx={{
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <DeleteUserPlanner
                    singleDepartmentByUserId={value}
                    getDeparmentsByUserId={getDeparmentsByUserId}
                    userId={value.userId}
                    getAllUsers={getAllUsers}
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
                        Department:&nbsp; {value.name}
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
