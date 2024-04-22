import SingleSpaceDialog from "./SingleSpaceDialog";
import SpaceList from "./SpaceList";

export default function SpaceListContainer({
  shownSpace,
  getAllSpaces,
  allSpacesList,
  paginateSpaces,
  setPaginateSpaces,
  open,
  setOpen,
}) {
  return (
    <>
      <SingleSpaceDialog
        getAllSpaces={getAllSpaces}
        singleSpace={shownSpace ? shownSpace : null}
        open={open}
        setOpen={setOpen}
        onClose={() => setOpen(false)}
      />
      <SpaceList
        shownSpace={shownSpace}
        getAllSpaces={getAllSpaces}
        allSpacesList={allSpacesList}
        paginateSpaces={paginateSpaces}
        setPaginateSpaces={setPaginateSpaces}
      />
    </>
  );
}
