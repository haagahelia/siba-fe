import { useEffect } from "react";

import Pagination from "@mui/material/Pagination";

export default function AllocRoundPagination({
  pagination,
  setPagination,
  allAllocRoundsList,
  setPaginateAllocRounds,
  pageSize,
}) {
  const count = Math.ceil(allAllocRoundsList.length / pageSize);

  useEffect(() => {
    if (!pagination.from) return;
    const slicedAllocRounds = allAllocRoundsList.slice(
      pagination.from,
      pagination.to,
    );
    setPaginateAllocRounds(slicedAllocRounds);
  }, [allAllocRoundsList]);

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
