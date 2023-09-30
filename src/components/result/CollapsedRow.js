import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, useTheme } from "@mui/material";
// import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import RoomList from "../room/RoomList";

export default function CollapsedRow({ prog1 }) {
  const theme = useTheme();

  const [expand, setExpand] = useState(false);

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
