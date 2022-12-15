import { useEffect, useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { Clear } from "@mui/icons-material";

export default function SubjectFiltering({
  allSubjectsList,
  setallSubjectsList,
  paginateSubjects,
  setPaginateSubjects,
  pagination,
}) {
  const [searched, setSearched] = useState("");

  const requestSearch = (e) => {
    setSearched(e.target.value);
    const filteredSubjects = allSubjectsList.filter(subject);
    function subject(subject) {
      return subject.subjectName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    }
    setPaginateSubjects(filteredSubjects);
  };

  useEffect(() => {
    if (searched === "") {
      setPaginateSubjects(
        allSubjectsList.slice(pagination.from, pagination.to),
      );
    }
  }, [searched]);

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <TextField
      name="searched"
      placeholder="Opetusten haku:"
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
