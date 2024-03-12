import { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";

export default function SpaceTypePagination({
  pagination,
  setPagination,
  allSpaceTypesList,
  setPaginateSpaceTypes,
  pageSize,
}) {
  const count = Math.ceil(allSpaceTypesList.length / pageSize);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      const slicedSpaceTypes = allSpaceTypesList.slice(
        pagination.from,
        pagination.to,
      );
      setPaginateSpaceTypes(slicedSpaceTypes);
    }
  }, [pagination, allSpaceTypesList]);

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
