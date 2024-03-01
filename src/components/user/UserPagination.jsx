import { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";

export default function UserPagination({
  pagination,
  setPagination,
  allUsersList,
  setPaginateUsers,
  pageSize,
}) {
  const count = Math.ceil(allUsersList.length / pageSize);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      const slicedUsers = allUsersList.slice(pagination.from, pagination.to);
      setPaginateUsers(slicedUsers);
    }
  }, [pagination]);

  const handleChange = (e, p) => {
    const from = (p - 1) * pageSize;
    const to = (p - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  return (
    <Pagination count={count} onChange={handleChange} variant="outlined" />
  );
}
