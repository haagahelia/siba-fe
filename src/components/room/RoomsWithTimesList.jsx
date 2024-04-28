import useTheme from "@mui/material/styles/useTheme";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import ProgressBar from "@ramonak/react-progress-bar";
import { AppContext } from "../../AppContext";
import CollapsedRowB from "../result/CollapsedRowB";

export default function RoomsWithTimesList({ rooms }) {
  const theme = useTheme();

  const spaceUnderUsage = useContext(AppContext).settings.spaceUnderUsage;
  const spaceOverUsage = useContext(AppContext).settings.spaceOverUsage;

  return (
    <Grid
      container
      rowSpacing={3}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      spacing={2}
      variant="resultContainer"
    >
      {rooms.map((room) => {
        const progress = (room.allocatedHours / room.requiredHours) * 100;

        const progressColor =
          progress > 100
            ? theme.palette.progressBarRed.main
            : progress > spaceOverUsage
              ? theme.palette.progressBarYellow.main
              : progress < spaceUnderUsage
                ? theme.palette.progressBarYellow.main
                : theme.palette.progressBarGreen.main;

        const progressBarTextColor =
          progress === 0
            ? theme.palette.progressBarTextZero.main
            : theme.palette.progressBarTextNonZero.main;

        return (
          <Fragment key={room.id}>
            <Grid item xs={6}>
              <Link style={theme.components.Links} to={`/space/${room.id}`}>
                {`${room.name}`}
              </Link>
            </Grid>
            <Grid item xs={6} key={`${room.id}-b`}>
              <ProgressBar
                labelAlignment="left"
                baseBgColor={theme.palette.progressBarBackground.main}
                labelColor={progressBarTextColor}
                bgColor={progressColor}
                padding="3px"
                completed={Math.round(progress)}
              />
              <CollapsedRowB id={room.id} />
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
}
