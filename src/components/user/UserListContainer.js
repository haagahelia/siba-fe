import Grid from "@mui/material/Grid";
import Userlist from "./UserList";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";

export default function UserlistListContainer(props) {
  const { getAllUsers, allUsersList, paginateUsers } = props;
  return (
    <div>
      <Grid container rowSpacing={1}>
        <Card variant="outlined">
          <CardContent>
            <Userlist
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
