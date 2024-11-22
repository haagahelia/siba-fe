import useTheme from "@mui/material/styles/useTheme";
import { useContext, useEffect, useState } from "react";
import { AllocRoundContext } from "../../AppContext";
import resultRoomsStore from "../../data/ResultRoomsStore";
import Logger from "../../logger/logger";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chart from "chart.js/auto";
import AllocRoundControlPanel from "../allocRound/AllocRoundControlPanel";
import RoomsWithTimesList from "../room/RoomsWithTimesList";

export default function RoomResult() {
  Logger.logPrefix = "RoomResult";
  Logger.debug("RoomResult component instantiated.");

  const { allocRoundContext } = useContext(AllocRoundContext);
  const theme = useTheme();

  const [rooms, setRooms] = useState([]);
  const [resetCounter, setResetCounter] = useState(0);
  const [showBarChart, setShowBarChart] = useState(false);

  const roomStore = resultRoomsStore;

  useEffect(() => {
    getRoomsData();
  }, [resetCounter]);

  const getRoomsData = async () => {
    Logger.debug("getRoomsData: fetching room data from server.");
    await roomStore.fetchRooms(allocRoundContext?.allocRoundId);
    Logger.debug(
      `getRoomsData: successfully fetched ${roomStore.rooms.length} rooms.`,
    );
    setRooms(roomStore.rooms);
  };

  const incrementResetCounter = () => {
    Logger.debug("Incrementing reset counter.");
    setResetCounter(resetCounter + 1);
  };

  useEffect(() => {
    document.title = "Room Results";
  }, []);

  const toggleBarChart = () => {
    setShowBarChart(!showBarChart);
  };

  useEffect(() => {
    if (showBarChart) {
      renderBarChart();
    }
  }, [showBarChart]);

  const renderBarChart = () => {
    const labels = rooms.map((room) => room.name);
    const data = rooms.map((room) => room.allocatedHours);

    const generateRandomColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.5)`;
    };

    const colors = data.map(() => generateRandomColor());

    const tick = document.getElementById("barChart").getContext("2d");
    new Chart(tick, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Allocated Hours",
            data: data,
            backgroundColor: colors,
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          mode: "index",
          intersect: false,
          backgroundColor: theme.palette.background.paper,
          titleFontSize: 16,
          bodyFontSize: 14,
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Allocated Hours",
              font: {
                size: 14,
              },
            },
          },
          x: {
            title: {
              display: true,
              text: "Rooms",
              font: {
                size: 14,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: theme.palette.text.primary,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });
  };

  return (
    <div style={theme.components.RoomResultsContainer}>
      <AllocRoundControlPanel
        incrementResetCounter={incrementResetCounter}
        toggleBarChart={toggleBarChart}
        showBarChart={showBarChart}
      />
      <Typography className="mt6" variant="pageHeader">
        Spaces (Huoneet)
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignSelf: "flex-end",
          gap: 2,
        }}
      ></Box>
      {/* bargraph container */}
      {showBarChart && (
        <div style={{ width: "1000px", height: "600px", margin: "30px auto" }}>
          <canvas id="barChart" />
        </div>
      )}
      <RoomsWithTimesList rooms={rooms} />
    </div>
  );
}
