import { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";

export default function AllocRoundPagination({
  pagination,
  setPagination,
  allAllocRoundsList,
  setPaginateAllocRounds,
  pageSize,
}) {
  const count = Math.ceil(allAllocRoundsList.length / pageSize);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      const slicedAllocRounds = allAllocRoundsList.slice(
        pagination.from,
        pagination.to,
      );
      setPaginateAllocRounds(slicedAllocRounds);
    }
  }, [pagination]);

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
