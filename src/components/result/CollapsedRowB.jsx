import useTheme from "@mui/material/styles/useTheme";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AllocRoundContext } from "../../AppContext";
import resultRoomsStore from "../../data/ResultRoomsStore";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import { margins } from "/src/styles/theme.js";
// import RoomsWithTimesList from "../room/RoomsWithTimesList";

// have to edit when the correct data comes, for now an illustrative version.
export default function CollapsedRowB({ id }) {
  const { allocRoundContext } = useContext(AllocRoundContext);
  const theme = useTheme();

  const [expand, setExpand] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const handleExpandClick = () => {
    setExpand((prevExpand) => !prevExpand);
  };

  useEffect(() => {
    const getSubjects = async () => {
      await resultRoomsStore.fetchRoomSubs(id, allocRoundContext?.allocRoundId);
      const fetchedSubjects = resultRoomsStore.roomSubs;
      // Sort totalTime in descending order
      const sortedSubjects = fetchedSubjects.sort((a, b) => {
        if (b.totalTime !== a.totalTime) {
          return b.totalTime - a.totalTime;
        }
        return a.name.localeCompare(b.name);
      });
      setSubjects(sortedSubjects);
    };

    if (expand) {
      getSubjects();
    }
  }, [expand, id, allocRoundContext?.allocRoundId]);

  return (
    <Grid2 container>
      {expand ? (
        <KeyboardArrowUpIcon
          className="infoIcon arrowUpDownIcon"
          onClick={handleExpandClick}
        >
          {" "}
        </KeyboardArrowUpIcon>
      ) : (
        <KeyboardArrowDownIcon
          className="infoIcon arrowUpDownIcon"
          onClick={handleExpandClick}
        >
          {" "}
        </KeyboardArrowDownIcon>
      )}

      <Collapse in={expand} style={{ width: "100%" }}>
        <Grid2 container>
          <Grid2 xs={8}>
            <Typography style={{ fontSize: 20 }}>Lessons</Typography>
          </Grid2>
          <Grid2 xs={4}>
            <Typography style={{ fontSize: 20 }}>Hours</Typography>
          </Grid2>
        </Grid2>

        {subjects?.map((subject) => {
          return (
            <Grid2 container key={subject.id}>
              <Grid2 xs={8}>
                <Typography
                  style={{
                    textAlign: "left",
                    marginTop: margins.small,
                  }}
                >
                  <Link
                    style={theme.components.Links}
                    to={`/subject/${subject.id}`}
                  >
                    {`${subject.name}`}
                  </Link>
                </Typography>
              </Grid2>
              <Grid2 xs={4}>
                <Typography
                  style={{
                    textAlign: "center",
                    marginTop: margins.small,
                  }}
                >
                  {subject.totalTime} h
                </Typography>
              </Grid2>
            </Grid2>
          );
        })}
      </Collapse>
    </Grid2>
  );
}
