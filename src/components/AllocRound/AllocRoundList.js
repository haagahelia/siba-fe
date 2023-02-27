import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function AllocRoundListItems(props) {
  const { paginateAllocRounds } = props;

  // STYLE
  const Box = styled(Paper)(({ theme }) => ({
    overflow: "auto",
  }));
  return (
    <div>
      <Box>
        <nav>
          {paginateAllocRounds.map((value) => {
            return (
              <List key={value.id}>
                <ListItem>
                  <Grid item md={3} xs={2} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      ID:
                    </Typography>
                    <ListItemText
                      primary={value.id}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={3} xs={4} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Name:
                    </Typography>
                    <ListItemText
                      primary={value.name}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={10} xs={7} padding={5}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Description:
                    </Typography>
                    <ListItemText
                      primary={value.description}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={3} xs={3} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Last modified:
                    </Typography>
                    <ListItemText
                      primary={value.lastModified}
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
