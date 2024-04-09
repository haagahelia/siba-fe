import { useEffect, useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

export default function ProgramFiltering({
  allProgramsList,
  setPaginatePrograms,
  pagination,
}) {
  const [searched, setSearched] = useState("");

  const requestSearch = (e) => {
    const searchText = e.target.value;
    setSearched(searchText);
    const filteredPrograms = allProgramsList.filter((program) =>
      program.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setPaginatePrograms(filteredPrograms);
  };

  useEffect(() => {
    if (searched === "") {
      setPaginatePrograms(
        allProgramsList.slice(pagination.from, pagination.to),
      );
    }
  }, [searched, setPaginatePrograms, allProgramsList, pagination]);

  const cancelSearch = () => {
    setSearched("");
    setPaginatePrograms(allProgramsList.slice(pagination.from, pagination.to));
  };

  return (
    <TextField
      name="searched"
      placeholder="Search programs"
      type="text"
      variant="outlined"
      fullWidth
      //size="medium"
      value={searched}
      onChange={(e) => requestSearch(e)}
      InputProps={{
        endAdornment: (
          //<InputAdornment position="end">
          <IconButton
            onClick={cancelSearch}
            sx={{ visibility: searched ? "visible" : "hidden" }}
            variant="clearFilterButton"
          >
            <ClearIcon />
          </IconButton>
          //</InputAdornment>
        ),
      }}
    />
  );
}
