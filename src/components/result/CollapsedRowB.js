import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse } from "@mui/material"; // Button???
// import RoomsWithTimeList from "../room/RoomsWithTimesList";
import resultRoomsStore from "../../data/ResultRoomsStore";

//have to edit when the correct data comes, for now an illustrative version.
export default function CollapsedRowB({ id }) {
  const [expand, setExpand] = React.useState(false);
  const [subjects, setSubjects] = React.useState([]);

  const getSubjects = async () => {
    // console.log(id);    // Works
    await resultRoomsStore.fetchRoomSubs(id, 10004);
    setSubjects(resultRoomsStore.roomSubs);
  };

  return (
    <Grid2 container>
      {expand ? (
        <KeyboardArrowUpIcon
          sx={{ color: "white", fontSize: 24 }}
          onClick={() => setExpand(!expand)}
        >
          {" "}
        </KeyboardArrowUpIcon>
      ) : (
        <KeyboardArrowDownIcon
          sx={{ color: "white", fontSize: 24 }}
          onClick={() => {
            getSubjects();
            setExpand(!expand);
          }}
        >
          {" "}
        </KeyboardArrowDownIcon>
      )}

      <Collapse in={expand} style={{ width: "100%" }}>
        <Grid2 container>
          <Grid2 xs={8}>
            <Typography style={{ color: "#F6E9E9", fontSize: 20 }}>
              Opetukset
            </Typography>
          </Grid2>
          <Grid2 xs={4}>
            <Typography style={{ color: "#F6E9E9", fontSize: 20 }}>
              Tunnit
            </Typography>
          </Grid2>
        </Grid2>

        {subjects?.map((subject) => {
          return (
            <Grid2 container key={subject.id}>
              <Grid2 xs={8}>
                {" "}
                <Typography
                  style={{
                    textAlign: "left",
                    marginTop: 10,
                    color: "#F6E9E9",
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
                    color: "#F6E9E9",
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
