import React, { useState, useEffect } from "react";
import dao from "../ajax/dao";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import { CardHeader, Card, Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";

export default function SpaceTypeView() {
  const [spaceTypeList, setSpaceTypeList] = useState([]);

  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getAllSpaceTypes = async function () {
    const { success, data } = await dao.fetchSpacetypeData();
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Oops! Something went wrong on the server. No equipment found",
      });

      return;
    } else {
      setSpaceTypeList(data);
    }
  };

  useEffect(() => {
    getAllSpaceTypes();
  }, []);

  return (
    <>
      <Container maxWidth="100%">
        <Grid
          container
          rowSpacing={0.5}
          justifyContent="space-evenly"
          alignItems="flex-start"
          marginTop="20px"
        >
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="SpaceType" />
              {spaceTypeList.map((value) => {
                return (
                  <List key={value.id}>
                    <ListItem>
                      <Grid item md={3} xs={3} padding={3}>
                        <Typography
                          variant="caption"
                          style={{ fontWeight: "bold" }}
                        >
                          Id:
                        </Typography>
                        <ListItemText
                          primary={value.id}
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
                          Name:
                        </Typography>
                        <ListItemText
                          primary={value.name}
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
                          Description:
                        </Typography>
                        <ListItemText
                          primary={value.description}
                          primaryTypographyProps={{
                            variant: "body2",
                          }}
                        />
                      </Grid>
                    </ListItem>
                  </List>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </>
  );
}
