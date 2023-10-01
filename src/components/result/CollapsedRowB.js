import useTheme from "@mui/material/styles/useTheme";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import resultRoomsStore from "../../data/ResultRoomsStore";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
// import RoomsWithTimeList from "../room/RoomsWithTimesList";

// have to edit when the correct data comes, for now an illustrative version.
export default function CollapsedRowB({ id }) {
  const appContext = useContext(AppContext);
  const theme = useTheme();

  const [expand, setExpand] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const handleExpandClick = () => {
    setExpand((prevExpand) => !prevExpand);
  };

  useEffect(() => {
    const getSubjects = async () => {
      await resultRoomsStore.fetchRoomSubs(id, appContext.allocRoundId);
      setSubjects(resultRoomsStore.roomSubs);
    };

    if (expand) {
      getSubjects();
    }
  }, [expand, id, appContext.allocRoundId]);

  return (
    <Grid2 container>
      {expand ? (
        <KeyboardArrowUpIcon sx={{ fontSize: 24 }} onClick={handleExpandClick}>
          {" "}
        </KeyboardArrowUpIcon>
      ) : (
        <KeyboardArrowDownIcon
          sx={{ color: theme.palette.infoIcon.main, fontSize: 24 }}
          onClick={handleExpandClick}
        >
          {" "}
        </KeyboardArrowDownIcon>
      )}

      <Collapse in={expand} style={{ width: "100%" }}>
        <Grid2 container>
          <Grid2 xs={8}>
            <Typography style={{ fontSize: 20 }}>Opetukset</Typography>
          </Grid2>
          <Grid2 xs={4}>
            <Typography style={{ fontSize: 20 }}>Tunnit</Typography>
          </Grid2>
        </Grid2>

        {subjects?.map((subject) => {
          return (
            <Grid2 container key={subject.id}>
              <Grid2 xs={8}>
                <Typography
                  style={{
                    textAlign: "left",
                    marginTop: 10,
                  }}
                >
                  {subject.name}
                </Typography>
              </Grid2>
              <Grid2 xs={4}>
                <Typography
                  style={{
                    textAlign: "left",
                    marginTop: 10,
                  }}
                >
                  {subject.totalTime}
                </Typography>
              </Grid2>
            </Grid2>
          );
        })}
      </Collapse>
    </Grid2>
  );
}
