import { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Clear } from "@mui/icons-material";

export default function SpaceFiltering({
  allSpacesList,
  setPaginateSpaces,
  pagination,
}) {
  const [searched, setSearched] = useState("");

  const requestSearch = (e) => {
    const searchText = e.target.value;
    setSearched(searchText);
    const filteredSpaces = allSpacesList.filter((space) =>
      space.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setPaginateSpaces(filteredSpaces);
  };

  useEffect(() => {
    if (searched === "") {
      setPaginateSpaces(allSpacesList.slice(pagination.from, pagination.to));
    }
  }, [searched, setPaginateSpaces, allSpacesList, pagination]);

  const cancelSearch = () => {
    setSearched("");
    setPaginateSpaces(allSpacesList.slice(pagination.from, pagination.to));
  };

  return (
    <TextField
      name="searched"
      placeholder="Search spaces"
      type="text"
      variant="outlined"
      fullWidth
      size="medium"
      value={searched}
      onChange={(e) => requestSearch(e)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={cancelSearch}
              sx={{ visibility: searched ? "visible" : "hidden" }}
            >
              <Clear sx={{ color: "#ffffff" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
