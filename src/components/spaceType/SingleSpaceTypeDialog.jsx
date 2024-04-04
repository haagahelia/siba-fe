import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteSpaceType from "./DeleteSpaceType";
import EditSpaceTypeContainer from "./EditSpaceTypeContainer";
import SpaceTypeDisplay from "./SpaceTypeDisplay";

export default function SingleSpaceTypeDialog({
  open,
  setOpen,
  singleSpaceType,
  getAllSpaceTypes,
  setSingleSpaceType,
}) {
  const { roles } = useRoleLoggedIn();

  return (
    <Dialog open={open} onClose={() => setOpen(false)} width="400px">
      <DialogTitle id="dialog-title">
        Space Type: {singleSpaceType?.name}
      </DialogTitle>
      <IconButton
        edge="end"
        onClick={() => setOpen(false)}
        aria-label="close"
        variant="closeButton"
      >
        <CloseIcon />
      </IconButton>
      {roles.admin === "1" && (
        <DialogActions>
          <DeleteSpaceType
            singleSpaceType={singleSpaceType}
            getAllSpaceTypes={getAllSpaceTypes}
            setOpen={setOpen}
          />
          <EditSpaceTypeContainer
            singleSpaceType={singleSpaceType}
            getAllSpaceTypes={getAllSpaceTypes}
            setSingleSpaceType={setSingleSpaceType}
          />
        </DialogActions>
      )}
      <List>
        <ListItem>
          <SpaceTypeDisplay singleSpaceType={singleSpaceType} />
        </ListItem>
      </List>
    </Dialog>
  );
}
