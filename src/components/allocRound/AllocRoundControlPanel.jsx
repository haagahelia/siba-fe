import useTheme from "@mui/material/styles/useTheme";
import { useContext, useState } from "react";
import { AllocRoundContext } from "../../AppContext";
import allocationPost from "../../data/ResultAllocationStore";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function AllocRoundControlPanel({ incrementResetCounter }) {
  const { allocRoundContext } = useContext(AllocRoundContext);
  // console.log("appContext 123: " + appContext);

  const theme = useTheme();

  const [isClicked, setIsClicked] = useState(true);

  const setDelayedClickedToggle = () => {
    setTimeout(() => {
      if (!isClicked) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
      incrementResetCounter();
    }, 3000);
  };

  return (
    <Typography component="p" variant="allocRoundControlPanel">
      Allocation {allocRoundContext.allocRoundId}&nbsp;:&nbsp;
      {allocRoundContext.allocRoundName} &nbsp; - &nbsp;After 'Start' or 'Reset'
      wait for a few seconds
      <br />
      <Button
        type="submit"
        variant="contained"
        style={{ color: theme.palette.primary.contrastText }}
        onClick={() => {
          allocationPost.startAlloc(allocRoundContext.allocRoundId);
          setDelayedClickedToggle();
        }}
        disabled={isClicked}
      >
        Start Allocation
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="red"
        onClick={() => {
          allocationPost.resetAlloc(allocRoundContext.allocRoundId);
          setDelayedClickedToggle();
        }}
        disabled={!isClicked}
      >
        Reset Allocation
      </Button>
      <Link
        to={isClicked ? `/alloc-fail/${allocRoundContext.allocRoundId}` : ""}
        disabled={!isClicked}
      >
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          disabled={!isClicked}
        >
          Show failed allocation
        </Button>
      </Link>
      <Button
        type="submit"
        variant="outlined"
        color="inherit"
        disabled={!isClicked}
      >
        Download full report
      </Button>
      <Button
        type="submit"
        variant="outlined"
        color="inherit"
        disabled={!isClicked}
      >
        Download Planner report
      </Button>
    </Typography>
  );
}
