import { useEffect } from "react";

import Pagination from "@mui/material/Pagination";

const pageSize = 15;

export default function BuildingPagination({
  pagination,
  setPagination,
  allBuildingsList,
  setPaginateBuildings,
}) {
  const count = Math.ceil(allBuildingsList.length / pageSize);

  useEffect(() => {
    if (!pagination.from) return;
    const slicedBuildings = allBuildingsList.slice(
      pagination.from,
      pagination.to
    );
    setPaginateBuildings(slicedBuildings);
  }, [pagination, allBuildingsList, setPaginateBuildings]);

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
