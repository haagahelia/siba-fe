import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dao from "../ajax/dao";

export default function AllocationSubjectFailureView() {
  const [unAllocableSubjects, setUnAllocableSubjects] = useState([]);

  const getUnAlloc = async function (id) {
    const data = await dao.getUnAllocableSubjects(id);
    if (data === 500) {
      console.log("Hupsista keikkaa!");
      return;
    } else {
      setUnAllocableSubjects(data);
    }
  };

  useEffect(() => {
    getUnAlloc(10004);
    console.log(unAllocableSubjects);
  }, []);

  return (
    <div>
      <Typography style={{ color: "#F6E9E9", margin: 20 }}>
        Opetukset joita ei voinut allokoida
      </Typography>

      <div style={{ width: "70%", backgroundColor: "#ff1744", margin: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Group size</TableCell>
                <TableCell>Area</TableCell>
                <TableCell>Space type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unAllocableSubjects.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.groupSize}</TableCell>
                  <TableCell>{row.area}</TableCell>
                  <TableCell>{row.spaceType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
