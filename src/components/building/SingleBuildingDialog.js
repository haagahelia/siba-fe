import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import BuildingDisplay from "./BuildingDisplay";
import DeleteBuilding from "./DeleteBuilding";
import EditBuildingContainer from "./EditBuildingContainer";

export default function SingleBuildingDialog({
  open,
  setOpen,
  singleBuilding,
  getAllBuildings,
  setSingleBuilding,
}) {
  const { roles } = RoleLoggedIn();

  return (
    <Dialog open={open} onClose={() => setOpen(false)} width="400px">
      <DialogTitle id="dialog-title">{singleBuilding?.name}</DialogTitle>
      <DialogContent>
        {roles.admin === "1" && (
          <DialogActions>
            <DeleteBuilding
              singleBuilding={singleBuilding}
              getAllBuildings={getAllBuildings}
              setOpen={setOpen}
            />
            <EditBuildingContainer
              singleBuilding={singleBuilding}
              getAllBuildings={getAllBuildings}
              setSingleBuilding={setSingleBuilding}
            />
          </DialogActions>
        )}
        <List>
          <ListItem>
            <BuildingDisplay
              singleBuilding={singleBuilding}
              flexDirection="column"
            />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}
