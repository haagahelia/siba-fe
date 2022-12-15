import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

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
    />
  );
}
