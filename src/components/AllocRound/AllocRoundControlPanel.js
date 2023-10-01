import useTheme from "@mui/material/styles/useTheme";
import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import allocationPost from "../../data/ResultAllocationStore";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function AllocRoundControlPanel({ incrementResetCounter }) {
  const appContext = useContext(AppContext);
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
    <Typography component="p" style={{ marginTop: 80 }}>
      Current allocation round: {appContext.allocRoundId} &nbsp; After Start and
      Reset wait for few seconds.
      <Button
        type="submit"
        variant="contained"
        style={{ color: theme.palette.primary.contrastText }}
        onClick={() => {
          allocationPost.startAlloc(appContext.allocRoundId);
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
          allocationPost.resetAlloc(appContext.allocRoundId);
          setDelayedClickedToggle();
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
          disabled={!isClicked}
        >
          Show failed allocation
        </Button>
      </Link>
    </Typography>
  );
}
