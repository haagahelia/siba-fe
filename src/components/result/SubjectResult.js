import Grid2 from "@mui/material/Unstable_Grid2";
import React, { useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, Typography } from "@mui/material";
import resultRoomsStore from "../../data/ResultRoomsStore";
export default function SubjectResult(props) {

  return (
    <>
      <Grid2
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        spacing={2}
        style={{
          margin: "auto",
          marginTop: 20,
          backgroundColor: "#363333",
          padding: 10,
          borderRadius: 20,
        }}
      >
        {props.data.map((prog) => {
          const progress = (prog.allocatedHours / prog.requiredHours) * 100;
          
          const color =
            progress > 100 ? "#FF1700" : progress < 80 ? "#FFE400" : "#06FF00";

          return (
            <>
              
              <Grid2 xs={3} style={{ color: "rgb(246, 233, 233)" }}>
                {prog.name}
              </Grid2>
              <Grid2 xs={3}> 
                <ProgressBar
                  baseBgColor={"#272121"}
                  labelColor={"black"}
                  bgColor={color}
                  padding={"3px"}
                  completed={Math.round(progress)}
                />
                {CollapsedRow(prog.id)}
              </Grid2>
              
            </>
          );
        })}
      </Grid2>
    </>
  );
 }

 //pitää muokata kun tulee oikeaa dataa, nyt havainnollistamis versio.
 function CollapsedRow(id) {
  const [expand, setExpand] = React.useState(false);
  const [rooms, setRooms] = React.useState([])

  const getRoomsData = async () => {
    console.log(id)
    await resultRoomsStore.fetchSubRooms(id, 10002);
    setRooms(resultRoomsStore.subRooms);
  }

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
            getRoomsData()
            setExpand(!expand)}}
        >
          {" "}
        </KeyboardArrowDownIcon>
      )}

      <Collapse in={expand} style={{width:"100%"}}>
        <Grid2 container>
        </Grid2>
        {rooms && rooms.map((dropdownItem) => {
          return (
            <Grid2 container>
              <Grid2 xs={8}>
                {" "}
                <Typography
                  style={{
                    textAlign: "left",
                    marginTop: 10,
                    color: "#F6E9E9",
                  }}
                >
                   {dropdownItem.name} 
                </Typography>
              </Grid2>
              <Grid2 xs={4}>

              </Grid2>
            </Grid2>
          );
        })
        }
      </Collapse>
    </Grid2>
  );
}