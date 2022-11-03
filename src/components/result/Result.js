import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, Typography, Box } from "@mui/material";
export default function Result(props) {
  const testData = props.data;

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
        {testData.map((prog) => {
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
                {CollapsedRow(prog)}
              </Grid2>
            </>
          );
        })}
      </Grid2>
    </>
  );

  function CollapsedRow(prog1) {
    const [expand, setExpand] = React.useState(false);

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
            onClick={() => setExpand(!expand)}
          >
            {" "}
          </KeyboardArrowDownIcon>
        )}

        <Collapse in={expand} style={{ width: "100%" }}>
          <Grid2 container>
            <Grid2 xs={8}>
              <Typography style={{ color: "#F6E9E9", fontSize: 18 }}>
                Aineryhmät
              </Typography>
            </Grid2>
          </Grid2>
          {prog1.programs.map((roomprog) => {
            return (
              <Grid2 container>
                <Grid2 xs={8}>
                  {" "}
                  <Typography
                    style={{
                      textAlign: "center",
                      marginTop: 1,
                      color: "#F6E9E9",
                    }}
                  >
                    {roomprog.name}
                  </Typography>
                </Grid2>
                <Grid2 xs={4}>
                  <Typography
                    style={{
                      textAlign: "center",
                      marginTop: 10,
                      color: "#F6E9E9",
                    }}
                  />
                </Grid2>
              </Grid2>
            );
          })}
        </Collapse>
      </Grid2>
    );
  }
}
