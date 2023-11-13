import { useEffect } from "react";

import Pagination from "@mui/material/Pagination";

const pageSize = 15;

export default function DepartmentPagination({
  pagination,
  setPagination,
  allDepartmentsList,
  setPaginateDepartments,
}) {
  const count = Math.ceil(allDepartmentsList.length / pageSize);

  useEffect(() => {
    if (!pagination.from) return;
    const slicedDepartments = allDepartmentsList.slice(
      pagination.from,
      pagination.to
    );
    setPaginateDepartments(slicedDepartments);
  }, [pagination, allDepartmentsList, setPaginateDepartments]);

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
