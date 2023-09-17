import { Pagination } from "@mui/material";
import { useEffect } from "react";

const pageSize = 15;

export default function SubjectPagination({
  pagination,
  setPagination,
  allSubjectsList,
  setPaginateSubjects,
}) {
  const count = Math.ceil(allSubjectsList.length / pageSize);

  useEffect(() => {
    if (!pagination.from) return;
    const slicedSubjects = allSubjectsList.slice(
      pagination.from,
      pagination.to,
    );
    setPaginateSubjects(slicedSubjects);
  }, [pagination, allSubjectsList, setPaginateSubjects]);

  const handleChange = (e, p) => {
    const from = (p - 1) * pageSize;
    const to = (p - 1) * pageSize + pageSize;
    setPagination({ from, to });
  };

  return (
    <Pagination
      count={count}
      color="primary"
      onChange={handleChange}
      variant="outlined"
    />
  );
}
