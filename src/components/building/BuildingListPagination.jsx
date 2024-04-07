import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";

export default function BuildingPagination({
  pagination,
  setPagination,
  allBuildingsList,
  setPaginateBuildings,
  pageSize,
}) {
  const count = Math.ceil(allBuildingsList.length / pageSize);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      const slicedBuildings = allBuildingsList.slice(
        pagination.from,
        pagination.to,
      );
      setPaginateBuildings(slicedBuildings);
    }
  }, [pagination]);

  const handlePageChange = (e, p) => {
    const from = (p - 1) * pageSize;
    const to = (p - 1) * pageSize + pageSize;
    setPagination({ from, to });
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (searchQuery !== "") {
      setCurrentPage(1);
    }
  };

  return (
    <Pagination count={count} onChange={handlePageChange} variant="outlined" />
  );
}
