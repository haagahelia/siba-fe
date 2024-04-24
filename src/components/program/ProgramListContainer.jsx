import { useState } from "react";
import ProgramList from "./ProgramList";
import SingleProgramDialog from "./SingleProgramDialog";

export default function ProgramListContainer({
  getAllPrograms,
  allProgramsList,
  paginatePrograms,
  setPaginatePrograms,
  pagination,
  setPagination,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <SingleProgramDialog
        open={open}
        setOpen={setOpen}
        getAllPrograms={getAllPrograms}
      />

      <ProgramList
        getAllPrograms={getAllPrograms}
        allProgramsList={allProgramsList}
        paginatePrograms={paginatePrograms}
        setPaginatePrograms={setPaginatePrograms}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
