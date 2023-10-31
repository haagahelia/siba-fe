import { useEffect, useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

export default function UserFiltering({
  allUsersList,
  setPaginateUsers,
  pagination,
}) {
  const [searched, setSearched] = useState("");

  const requestSearch = (e) => {
    setSearched(e.target.value);
    const filteredUsers = allUsersList.filter(User);
    function User(User) {
      return User.email.toLowerCase().includes(e.target.value.toLowerCase());
    }
    setPaginateUsers(filteredUsers);
  };

  useEffect(() => {
    if (searched === "") {
      setPaginateUsers(allUsersList.slice(pagination.from, pagination.to));
    }
  }, [searched]);

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <TextField
      name="searched"
      placeholder="Search users"
      type="text"
      variant="outlined"
      fullWidth
      size="medium"
      value={searched}
      onChange={(e) => requestSearch(e)}
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
  );
}
