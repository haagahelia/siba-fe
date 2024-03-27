import useTheme from "@mui/material/styles/useTheme";

import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

export default function RoomList({ rooms }) {
  const theme = useTheme();

  return (
    <>
      <Grid2 container key="collapse_container_row36">
        <Grid2 xs={8}>
          <Typography style={{ fontSize: 20 }}>Rooms</Typography>
        </Grid2>
        <Grid2 xs={4}>
          <Typography style={{ fontSize: 20 }}>Hours</Typography>
        </Grid2>
      </Grid2>
      {rooms.map((room) => (
        <Grid2 container key={`${room.id}-rooms in RoomList`}>
          <Grid2 xs={8} variant="resultsDropdown">
            {" "}
            <Typography>
            <Link
                style={theme.components.Links}
                to={`/space/${room.id}`}
              >{`${room.name}`}</Link>
            </Typography>
          </Grid2>
          <Grid2 xs={4} variant="resultsDropdown">
            <Typography>
              {room.allocatedHours} h
            </Typography>
          </Grid2>
        </Grid2>
      ))}
    </>
  );
}
