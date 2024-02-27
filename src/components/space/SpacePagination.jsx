import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";

export default function SpacePagination({
  pagination,
  setPagination,
  allSpacesList,
  setPaginateSpaces,
  pageSize,
}) {
  const count = Math.ceil(allSpacesList.length / pageSize);

  useEffect(() => {
    if (!pagination.from) return;
    const slicedSpaces = allSpacesList.slice(pagination.from, pagination.to);
    setPaginateSpaces(slicedSpaces);
  }, [pagination, allSpacesList, setPaginateSpaces]);

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
