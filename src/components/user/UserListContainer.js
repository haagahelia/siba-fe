import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import UserList from "./UserList";

export default function UserListContainer({
  getAllUsers,
  allUsersList,
  paginateUsers,
}) {
  return (
    <div>
      <Grid container rowSpacing={1}>
        <Card variant="outlined">
          <CardContent>
            <UserList
              getAllUsers={getAllUsers}
              allUsersList={allUsersList}
              paginateUsers={paginateUsers}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
