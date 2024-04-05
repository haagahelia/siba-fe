import styled from "@mui/material/styles/styled";
import { useState } from "react";

import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SettingsDetails from "./SettingsDetails";
export default function SettingsList({
  paginateSettings,
  getAllSettings,
  incrementDataModifiedCounter,
}) {
  const [singleSetting, setSingleSetting] = useState(null);
  const [open, setOpen] = useState(false);

  // STYLE
  const Box = styled(Paper)(({ theme }) => ({
    overflow: "auto",
  }));
  return (
    <div>
      <SettingsDetails
        open={open}
        setOpen={setOpen}
        singleSetting={singleSetting}
        setSingleSetting={setSingleSetting}
        getAllSettings={getAllSettings}
        incrementDataModifiedCounter={incrementDataModifiedCounter}
      />
      <Box>
        <nav>
          {paginateSettings.map((value) => {
            return (
              <List key={value.id}>
                <ListItem
                  disablePadding
                  onClick={() => {
                    setSingleSetting(value);
                  }}
                >
                  <Grid item md={3} xs={2}>
                    <IconButton
                      onClick={() => {
                        setSingleSetting(value);
                        setOpen(true);
                      }}
                      aria-label="Open Info"
                    >
                      <BuildCircleIcon />
                    </IconButton>
                  </Grid>
                  <Grid item md={3} xs={2}>
                    <Typography variant="caption">ID:</Typography>
                    <ListItemText
                      primary={value.id}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={4} xs={2}>
                    <Typography variant="caption">Variable:</Typography>
                    <ListItemText
                      primary={value.variable}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={10} xs={7}>
                    <Typography variant="caption">Description:</Typography>
                    <ListItemText
                      primary={value.description}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={5} xs={7}>
                    <Typography variant="caption">textValue:</Typography>
                    <ListItemText
                      primary={value.textValue}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={10} xs={7}>
                    <Typography variant="caption">numberValue:</Typography>
                    <ListItemText
                      primary={value.numberValue}
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
