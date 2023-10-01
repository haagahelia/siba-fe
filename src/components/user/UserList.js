import styled from "@mui/material/styles/styled";
import { useState } from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SingleUserDialog from "./SingleUserDialog";

export default function UserListItems({ getAllUsers, paginateUsers }) {
  const [open, setOpen] = useState(false);
  const [singleUser, setSingleUser] = useState(null);

  // STYLE
  const Box = styled(Paper)(({ theme }) => ({
    overflow: "auto",
  }));

  return (
    <div>
      <SingleUserDialog
        open={open}
        setOpen={setOpen}
        singleUser={singleUser}
        setSingleUser={setSingleUser}
        getAllUsers={getAllUsers}
      />
      <Box>
        <nav>
          {paginateUsers.map((value) => {
            return (
              <List key={value.id}>
                <ListItem
                  disablePadding
                  onClick={() => {
                    setSingleUser(value);

                    setOpen(true);
                  }}
                >
                  <Grid item md={3} xs={7}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      id:
                    </Typography>
                    <ListItemText
                      primary={value.id}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={2} xs={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Email:
                    </Typography>
                    <ListItemText
                      primary={value.email}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      isAdmin:
                    </Typography>
                    <ListItemText
                      primary={value.isAdmin}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      isPlanner:
                    </Typography>
                    <ListItemText
                      primary={value.isPlanner}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={3} xs={7}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      isStatist:
                    </Typography>
                    <ListItemText
                      primary={value.isStatist}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={3} xs={7}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Planner for:
                    </Typography>
                    <ListItemText
                      primary={value.plannerdepartment}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                </ListItem>
                <Divider />
              </List>
            );
          })}
        </nav>
      </Box>
    </div>
  );
}
