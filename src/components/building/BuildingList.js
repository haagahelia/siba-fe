import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import SingleBuildingDialog from "./SingleBuildingDialog";

export default function BuildingListItems(props) {
  const { getAllBuildings, allBuildingsList } = props;

  const [open, setOpen] = useState(false);

  const [singleBuilding, setSingleBuilding] = useState(null);

  // STYLE
  const Box = styled(Paper)(({ theme }) => ({
    overflow: "auto",
  }));

  return (
    <React.Fragment>
      <SingleBuildingDialog
        open={open}
        setOpen={setOpen}
        singleBuilding={singleBuilding}
        setSingleBuilding={setSingleBuilding}
        getAllBuildings={getAllBuildings}
      />
      <Box>
        <nav>
          {allBuildingsList.map((value) => {
            return (
              <List key={value.id}>
                <ListItem
                  disablePadding
                  onClick={() => {
                    setSingleBuilding(value);

                    setOpen(true);
                  }}
                  //onMouseEnter={() => sethoverColor("#CFD6D5  ")}
                  //onMouseLeave={() => sethoverColor("#FFFFFF ")}
                >
                  <Grid item md={3} xs={7} padding={2}>
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
                  <Grid item md={2} xs={3} padding={2}>
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
                <Divider />
              </List>
            );
          })}
        </nav>
      </Box>
    </React.Fragment>
  );
}
