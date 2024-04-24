import SingleSubjectDialog from "./SingleSubjectDialog";
import SubjectList from "./SubjectList";

export default function SubjectListContainer({
  shownSubject,
  getAllSubjects,
  allSubjectsList,
  paginateSubjects,
  setPaginateSubjects,
  pageSize,
  open,
  setOpen,
  userPrograms,
}) {
  return (
    <div>
      <SingleSubjectDialog
        open={open}
        setOpen={setOpen}
        getAllSubjects={getAllSubjects}
        singleSubject={shownSubject ? shownSubject : null}
        userPrograms={userPrograms}
      />
      <SubjectList
        shownSubject={shownSubject}
        getAllSubjects={getAllSubjects}
        allSubjectsList={allSubjectsList}
        paginateSubjects={paginateSubjects}
        setPaginateSubjects={setPaginateSubjects}
        pageSize={pageSize}
        userPrograms={userPrograms}
      />
    </div>
  );
}
