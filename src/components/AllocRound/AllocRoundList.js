import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import Logger from "../../logger/logger";
import AllocRoundDetails from "./AllocRoundDetails";

export default function AllocRoundListItems({
  paginateAllocRounds,
  getAllocRounds,
  // setAllocRoundId,
  // getAllAllocRounds,
  incrementDataModifiedCounter,
}) {
  const appContext = useContext(AppContext);

  const [singleAllocRound, setSingleAllocRound] = useState(null);
  const [open, setOpen] = useState(false);

  // STYLE
  const Box = styled(Paper)(({ theme }) => ({
    overflow: "auto",
  }));

  return (
    <div>
      <AllocRoundDetails
        open={open}
        setOpen={setOpen}
        singleAllocRound={singleAllocRound}
        setSingleAllocRound={setSingleAllocRound}
        // setAllocRoundId={setAllocRoundId}
        getAllocRounds={getAllocRounds}
        incrementDataModifiedCounter={incrementDataModifiedCounter}
      />
      <Box>
        <nav>
          {paginateAllocRounds.map((value) => {
            return (
              <List key={value.id}>
                <ListItem
                  disablePadding
                  onClick={() => {
                    setSingleAllocRound(value);
                    // setAllocRoundId(value.id);
                    setOpen(true);
                    Logger.debug(`Allocation round chosen: ${value.name}`);
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
                      primary={
                        value.id === appContext.allocRoundId
                          ? `${value.id} ✅`
                          : value.id
                      }
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
                  <Grid item md={3} xs={3}>
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
