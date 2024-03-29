import { useEffect } from "react";

import Pagination from "@mui/material/Pagination";

export default function SubjectPagination({
  pagination,
  setPagination,
  allSubjectsList,
  setPaginateSubjects,
  pageSize,
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Pagination count={count} onChange={handleChange} variant="outlined" />
  );
}
