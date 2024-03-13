import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Grid2 from "@mui/material/Unstable_Grid2";
import RoomList from "../room/RoomList";

export default function CollapsedRow({ prog1 }) {
  const theme = useTheme();

  const [expand, setExpand] = useState(false);

  return (
    <Grid2 container>
      {expand ? (
        <KeyboardArrowUpIcon
          className="infoIcon arrowUpDownIcon"
          onClick={() => setExpand(!expand)}
        >
          {" "}
        </KeyboardArrowUpIcon>
      ) : (
        <KeyboardArrowDownIcon
          className="infoIcon arrowUpDownIcon"
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
