import { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Clear } from "@mui/icons-material";

export default function SubjectFiltering({
  allSubjectsList,
  setPaginateSubjects,
  pagination,
}) {
  const [searched, setSearched] = useState("");

  const requestSearch = (e) => {
    const searchText = e.target.value;
    setSearched(searchText);
    const filteredSubjects = allSubjectsList.filter((subject) =>
      subject.subjectName.toLowerCase().includes(searchText.toLowerCase()),
    );
    setPaginateSubjects(filteredSubjects);
  };

  useEffect(() => {
    if (searched === "") {
      setPaginateSubjects(
        allSubjectsList.slice(pagination.from, pagination.to),
      );
    }
  }, [searched, setPaginateSubjects, allSubjectsList, pagination]);

  const cancelSearch = () => {
    setSearched("");
    setPaginateSubjects(allSubjectsList.slice(pagination.from, pagination.to));
  };

  return (
    <TextField
      name="searched"
      placeholder="Search lessons"
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
