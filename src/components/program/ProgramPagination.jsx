import { useEffect } from "react";

import Pagination from "@mui/material/Pagination";

const pageSize = 15;

export default function ProgramPagination({
  pagination,
  setPagination,
  allProgramsList,
  setPaginatePrograms,
}) {
  const count = Math.ceil(allProgramsList.length / pageSize);

  useEffect(() => {
    if (!pagination.from) return;
    const slicedPrograms = allProgramsList.slice(
      pagination.from,
      pagination.to,
    );
    setPaginatePrograms(slicedPrograms);
  }, [pagination, allProgramsList, setPaginatePrograms]);

  const handleChange = (e, p) => {
    const from = (p - 1) * pageSize;
    const to = (p - 1) * pageSize + pageSize;
    setPagination({ from, to });
    window.scrollTo({ top: 0, behavior: "smooth" });
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