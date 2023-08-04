import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
//import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, useTheme } from "@mui/material";

import RoomList from "../room/RoomList";

export default function CollapsedRow(props) {
  const prog1 = props.prog1;
  const [expand, setExpand] = React.useState(false);
  const theme = useTheme();

  return (
    <Grid2 container>
      {expand ? (
        <KeyboardArrowUpIcon
          sx={{ fontSize: 24, color: theme.palette.infoIcon.main }}
          onClick={() => setExpand(!expand)}
        >
          {" "}
        </KeyboardArrowUpIcon>
      ) : (
        <KeyboardArrowDownIcon
          sx={{
            fontSize: 24,
            color: theme.palette.infoIcon.main,
          }}
          onClick={() => setExpand(!expand)}
        >
          {" "}
        </KeyboardArrowDownIcon>
      )}

      <Collapse in={expand} style={{ width: "100%" }}>
        <RoomList rooms={prog1.rooms} />
      </Collapse>
    </Grid2>
  );
}
