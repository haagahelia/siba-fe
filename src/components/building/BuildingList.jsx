import InfoIcon from "@mui/icons-material/Info";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import styled from "@mui/material/styles/styled";
import React, { useState } from "react";
import Logger from "../../logger/logger";
import SingleBuildingDialog from "./SingleBuildingDialog";

export default function BuildingList({ getAllBuildings, allBuildingsList }) {
  Logger.logPrefix = "BuildingList";
  const [open, setOpen] = useState(false);
  const [singleBuilding, setSingleBuilding] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Name");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedBuildingsList = allBuildingsList.sort((a, b) => {
    switch (orderBy) {
      case "Name":
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // STYLE
  const Box = styled(TableContainer)(({ theme }) => ({
    overflow: "auto",
  }));

  // useEffect(() => {
  //   Logger.debug("Buildings component instantiated.");
  //   getAllBuildings();
  // }, []);

  return (
    <div>
      <Container>
        <SingleBuildingDialog
          open={open}
          setOpen={setOpen}
          singleBuilding={singleBuilding}
          setSingleBuilding={setSingleBuilding}
          getAllBuildings={getAllBuildings}
        />
        <Box>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "Name"}
                        direction={order}
                        onClick={() => handleRequestSort("Name")}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedBuildingsList.map((value) => (
                    <TableRow key={value.id}>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setSingleBuilding(value);
                            setOpen(true);
                          }}
                          aria-label="Open Info"
                        >
                          <InfoIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>{value.name}</TableCell>
                      <TableCell>{value.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}
