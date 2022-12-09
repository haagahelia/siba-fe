import { useState } from "react";
import { TextField } from "@mui/material";
export default function SubjectFiltering({setFilteredSubject, filteredSubject, searched, setSearched}){

const requestSearch = (e) => {
    setSearched(e.target.value);
    const filteredSubjects = filteredSubject.filter(subject);
    function subject(subject) {
      return subject.subjectName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    }
    setFilteredSubject(filteredSubjects);

    console.log(filteredSubject, searched)
  };

  return(
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
  )
}
