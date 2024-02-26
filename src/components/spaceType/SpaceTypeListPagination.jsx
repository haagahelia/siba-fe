import { useEffect } from "react";

import Pagination from "@mui/material/Pagination";

const pageSize = 15;

export default function SpaceTypePagination({
  pagination,
  setPagination,
  allSpaceTypesList,
  setPaginateSpaceTypes,
}) {
  const count = Math.ceil(allSpaceTypesList.length / pageSize);

  useEffect(() => {
    if (!pagination.from) return;
    const slicedSpaceTypes = allSpaceTypesList.slice(
      pagination.from,
      pagination.to,
    );
    setPaginateSpaceTypes(slicedSpaceTypes);
  }, [pagination, allSpaceTypesList, setPaginateSpaceTypes]);

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
