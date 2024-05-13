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
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import SingleSpaceDialog from "./SingleSpaceDialog";

export default function SpaceList({
  shownSpace,
  getAllSpaces,
  allSpacesList,
  paginateSpaces,
  setPaginateSpaces,
}) {
  const pageSize = useContext(AppContext).settings.itemsPerPage;

  const [open, setOpen] = useState(false);
  const [singleSpace, setSingleSpace] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("SpaceName");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });
  const [searchToBeHandled, setSearchToBeHandled] = useState(false);

  useEffect(() => {
    const sortAndPaginateSpaces = () => {
      let sorted = allSpacesList.slice().sort((a, b) => {
        switch (orderBy) {
          case "name":
            return order === "asc"
              ? a.name.localeCompare(b.name, "fi-FI")
              : b.name.localeCompare(a.name, "fi-FI");
          case "area":
            return order === "asc" ? a.area - b.area : b.area - a.area;
          default:
            return 0;
        }
      });

      // Apply search filter to both name and departmentName
      if (searchQuery !== "") {
        sorted = sorted.filter((space) =>
          space.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      // Apply pagination
      const paginated = sorted.slice(pagination.from, pagination.to);
      setPaginateSpaces(paginated);
    };

    sortAndPaginateSpaces();
  }, [allSpacesList, orderBy, order, searchQuery, pagination]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchQuery(searchText);
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
    setSearchQuery("");
    setCurrentPage(1);
  };

  // STYLE
  const Box = styled(Table)(({ theme }) => ({
    overflow: "auto",
    borderCollapse: "collapse",
  }));
  return (
    <div>
      <TextField
        type="text"
        label="Search spaces"
        value={searchQuery}
        onChange={handleSearch}
        variant="outlined"
        className="search"
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={cancelSearch}
              sx={{ visibility: searchQuery ? "visible" : "hidden" }}
              variant="clearFilterButton"
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
      <SingleSpaceDialog
        open={open}
        setOpen={setOpen}
        singleSpace={singleSpace}
        setSingleSpace={setSingleSpace}
        getAllSpaces={getAllSpaces}
      />
      <Paper>
        <TableContainer>
          <Box>
            <TableHead>
              <TableRow>
                <TableCell />
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
                    active={orderBy === "area"}
                    direction={order}
                    onClick={() => handleRequestSort("area")}
                  >
                    Area
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginateSpaces.map((value) => (
                <TableRow key={value.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setSingleSpace(value);
                        setOpen(true);
                      }}
                      aria-label="Open Info"
                    >
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {value.name} ({value.spaceTypeAcronym})
                  </TableCell>
                  <TableCell>{value.area}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Box>
        </TableContainer>
      </Paper>
      <div>
        <Pagination
          count={Math.ceil(allSpacesList.length / pageSize)}
          onChange={handleChangePage}
          page={currentPage}
          variant="outlined"
        />
      </div>
    </div>
  );
}
