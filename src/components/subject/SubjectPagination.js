import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";

const pageSize = 15;

export default function SubjectPagination({
  allSubjectsList,
  paginateSubjects,
  setPaginateSubjects,
}) {
  const count = Math.ceil(allSubjectsList.length / pageSize);
  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      const slicedSubjects = allSubjectsList.slice(
        pagination.from,
        pagination.to,
      );
      setPaginateSubjects(slicedSubjects);
      console.log(paginateSubjects);
    }
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
