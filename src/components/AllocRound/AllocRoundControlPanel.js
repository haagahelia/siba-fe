import React from "react";
//import { useTheme } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Grid2 from "@mui/material/Unstable_Grid2";
//import Typography from "@mui/material/Typography";
import { useState } from "react";

//import resultProgramStore from "../data/ResultProgramStore";
import allocationPost from "../../data/ResultAllocationStore";

const AllocRoundControlPanel = () => {
  const [isClicked, setIsClicked] = useState(false);
  //const theme = useTheme();

  return (
    <Typography>
      <Button
        type="submit"
        variant="contained"
        style={{ color: "white" }}
        onClick={() => {
          allocationPost.startAlloc();
          if (!isClicked) setIsClicked(true);
        }}
        disabled={isClicked}
      >
        Start Allocation
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="red"
        style={{ color: "white" }}
        onClick={() => {
          allocationPost.resetAlloc();
          if (isClicked) setIsClicked(false);
        }}
      >
        Reset Allocation
      </Button>
      <Link to="/alloc-fail/10004">
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          style={{ color: "#F6E9E9" }}
        >
          Show failed allocation
        </Button>
      </Link>
    </Typography>
  );
};

export default AllocRoundControlPanel;
