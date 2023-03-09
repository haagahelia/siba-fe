import React from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import allocationPost from "../../data/ResultAllocationStore";
import { AppContext } from "../../AppContext";

const AllocRoundControlPanel = ({ incrementResetCounter }) => {
  const [isClicked, setIsClicked] = useState(true);
  const appContext = useContext(AppContext);
  //console.log("appContext 123: "+appContext);
  //const theme = useTheme();

  const setDelayedClickedToggle = () => {
    setTimeout(() => {
      if (!isClicked) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
    }, 2000);
  };

  return (
    <Typography color="white" component="p">
      Current allocation round: {appContext.allocRoundId} &nbsp; After Start and
      Reset wait for few seconds.
      <Button
        type="submit"
        variant="contained"
        style={{ color: "white" }}
        onClick={() => {
          allocationPost.startAlloc(appContext.allocRoundId);
          setDelayedClickedToggle();
          incrementResetCounter();
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
          allocationPost.resetAlloc(appContext.allocRoundId);
          setDelayedClickedToggle();
          incrementResetCounter();
        }}
        disabled={!isClicked}
      >
        Reset Allocation
      </Button>
      <Link
        to={isClicked ? `/alloc-fail/${appContext.allocRoundId}` : ""}
        disabled={!isClicked}
      >
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          style={{ color: "#F6E9E9" }}
          disabled={!isClicked}
        >
          Show failed allocation
        </Button>
      </Link>
    </Typography>
  );
};

export default AllocRoundControlPanel;
