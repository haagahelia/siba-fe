import { Clear } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          >
            <Clear sx={{ color: "#ffffff " }} />
          </IconButton>
        ),
      }}
    />
  );
}
