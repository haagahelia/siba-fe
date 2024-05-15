import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import { Pagination, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import styled from "@mui/material/styles/styled";
import { useEffect, useState } from "react";
import { checkForUserPrograms } from "../../hooks/checkForUserPrograms";
import SingleSubjectDialog from "./SingleSubjectDialog";

export default function SubjectList({
  shownSubject,
  getAllSubjects,
  allSubjectsList,
  paginateSubjects,
  setPaginateSubjects,
  pageSize,
  userPrograms,
}) {
  const [open, setOpen] = useState(false);
  const [singleSubject, setSingleSubject] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("SubjectName");
  const [searched, setSearched] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });
  const [searchToBeHandled, setSearchToBeHandled] = useState(false);

  useEffect(() => {
    const sortAndPaginateSubjects = () => {
      let sorted = allSubjectsList.slice().sort((a, b) => {
        switch (orderBy) {
          case "icon":
            return order === "asc"
              ? checkForUserPrograms(a, userPrograms) ===
                checkForUserPrograms(b, userPrograms)
                ? 0
                : checkForUserPrograms(a, userPrograms)
                  ? -1
                  : 1
              : checkForUserPrograms(a, userPrograms) ===
                  checkForUserPrograms(b, userPrograms)
                ? 0
                : checkForUserPrograms(a, userPrograms)
                  ? 1
                  : -1;
          case "name":
            return order === "asc"
              ? a.name.localeCompare(b.name, "fi-FI")
              : b.name.localeCompare(a.name, "fi-FI");
          case "groupSize":
            return order === "asc"
              ? a.groupSize - b.groupSize
              : b.groupSize - a.groupSize;
          case "groupCount":
            return order === "asc"
              ? a.groupCount - b.groupCount
              : b.groupCount - a.groupCount;
          case "sessionLength":
            return order === "asc"
              ? a.sessionLength - b.sessionLength
              : b.sessionLength - a.sessionLength;
          case "sessionCount":
            return order === "asc"
              ? a.sessionCount - b.sessionCount
              : b.sessionCount - a.sessionCount;
          case "programName":
            return order === "asc"
              ? a.programName.localeCompare(b.programName, "fi-FI")
              : b.programName.localeCompare(a.programName, "fi-FI");
          case "spaceTypeName":
            return order === "asc"
              ? a.spaceTypeName.localeCompare(b.spaceTypeName, "fi-FI")
              : b.spaceTypeName.localeCompare(a.spaceTypeName, "fi-FI");
          case "isNoisy":
            return order === "asc"
              ? a.isNoisy - b.isNoisy
              : b.isNoisy - a.isNoisy;
          default:
            return 0;
        }
      });
      // sort booleans (is noisy) values
      const compareBooleans = (a, b) => (a === b ? 0 : a ? 1 : -1);
      // Apply search filter to both name and departmentName
      if (searched !== "") {
        sorted = sorted.filter((subject) =>
          subject.name.toLowerCase().includes(searched.toLowerCase()),
        );
      }

      // Apply pagination
      const paginated = sorted.slice(pagination.from, pagination.to);
      setPaginateSubjects(paginated);
    };

    sortAndPaginateSubjects();
  }, [allSubjectsList, orderBy, order, searched, pagination]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearched(searchText);
    setPagination({ from: 0, to: pageSize });
    setSearchToBeHandled(true);
    setCurrentPage(1);
  };

  const handleChangePage = (e, p) => {
    const from = (p - 1) * pageSize;
    const to = (p - 1) * pageSize + pageSize;
    setPagination({ from, to });

    if (searchToBeHandled) {
      setSearchToBeHandled(false);
      setCurrentPage(p);
    } else {
      setCurrentPage(p);
    }
  };

  const cancelSearch = () => {
    setSearched("");
    setCurrentPage(1);
  };

  // STYLE
  const Box = styled(Table)(({ theme }) => ({
    overflow: "auto",
    borderCollapse: "collapse",
  }));
  // is noisy boolean showing stringy values
  const booleanToYesNo = (value) => (value ? "Yes" : "No");

  return (
    <div>
      <TextField
        type="text"
        label="Search subjects"
        value={searched}
        onChange={handleSearch}
        variant="outlined"
        className="search"
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={cancelSearch}
              sx={{ visibility: searched ? "visible" : "hidden" }}
              variant="clearFilterButton"
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
      <SingleSubjectDialog
        open={open}
        setOpen={setOpen}
        getAllSubjects={getAllSubjects}
        singleSubject={singleSubject}
        setSingleSubject={setSingleSubject}
        userPrograms={userPrograms}
      />
      <Paper>
        <TableContainer>
          <Box>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "programId"}
                    direction={order}
                    onClick={() => handleRequestSort("icon")}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={order}
                    onClick={() => handleRequestSort("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "groupSize"}
                    direction={order}
                    onClick={() => handleRequestSort("groupSize")}
                  >
                    Group size
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "groupCount"}
                    direction={order}
                    onClick={() => handleRequestSort("groupCount")}
                  >
                    Group count
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "sessionLength"}
                    direction={order}
                    onClick={() => handleRequestSort("sessionLength")}
                  >
                    Lesson length
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "sessionCount"}
                    direction={order}
                    onClick={() => handleRequestSort("sessionCount")}
                  >
                    Session count
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "programName"}
                    direction={order}
                    onClick={() => handleRequestSort("programName")}
                  >
                    Program
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "spaceTypeName"}
                    direction={order}
                    onClick={() => handleRequestSort("spaceTypeName")}
                  >
                    Space type
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "isNoisy"}
                    direction={order}
                    onClick={() => handleRequestSort("isNoisy")}
                  >
                    isNoisy
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginateSubjects.map((value) => (
                <TableRow key={value.id}>
                  <TableCell>
                    {checkForUserPrograms(value, userPrograms) ? (
                      <IconButton
                        onClick={() => {
                          setSingleSubject(value);
                          setOpen(true);
                        }}
                        aria-label="Open Info"
                      >
                        <BuildCircleIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => {
                          setSingleSubject(value);
                          setOpen(true);
                        }}
                        aria-label="Open Info"
                      >
                        <InfoIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.groupSize}</TableCell>
                  <TableCell>{value.groupCount}</TableCell>
                  <TableCell>{value.sessionLength}</TableCell>
                  <TableCell>{value.sessionCount}</TableCell>
                  <TableCell>{value.programName}</TableCell>
                  <TableCell>{value.spaceTypeName}</TableCell>
                  <TableCell>{booleanToYesNo(value.isNoisy)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Box>
        </TableContainer>
      </Paper>
      <div>
        <Pagination
          count={Math.ceil(allSubjectsList.length / pageSize)}
          onChange={handleChangePage}
          page={currentPage}
          variant="outlined"
        />
      </div>
    </div>
  );
}
