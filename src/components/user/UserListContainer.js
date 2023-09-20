import Grid from "@mui/material/Grid";
import UserList from "./UserList";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";

export default function UserListContainer(props) {
  const { getAllUsers, allUsersList, paginateUsers } = props;
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
