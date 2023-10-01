import styled from "@mui/material/styles/styled";
import { useState } from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
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

                    setOpen(true);
                  }}
                >
                  <Grid item md={3} xs={2}>
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
                  <Grid item md={3} xs={4}>
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
                  <Grid item md={10} xs={7}>
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
                  <Grid item md={10} xs={7}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      textValue:
                    </Typography>
                    <ListItemText
                      primary={value.textValue}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={10} xs={7}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      numberValue:
                    </Typography>
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
