import { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";

export default function SettingsPagination({
  pagination,
  setPagination,
  allSettingsList,
  paginateSettings,
  setPaginateSettings,
  pageSize,
}) {
  const count = Math.ceil(allSettingsList.length / pageSize);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (!initialRender) {
      // Check if it's not the initial render
      const slicedSettings = allSettingsList.slice(
        pagination.from,
        pagination.to,
      );
      setPaginateSettings(slicedSettings);
    }
  }, [pagination, allSettingsList, paginateSettings, initialRender]);

  const handleChange = (e, p) => {
    const from = (p - 1) * pageSize;
    const to = (p - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  return (
    <Pagination count={count} onChange={handleChange} variant="outlined" />
  );
}
