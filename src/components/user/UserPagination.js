import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";

const pageSize = 15;

export default function UserPagination({
  pagination,
  setPagination,
  allUsersList,
  setPaginateUsers,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const handleChange = (e, p) => {
    const from = (p - 1) * pageSize;
    const to = (p - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
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
