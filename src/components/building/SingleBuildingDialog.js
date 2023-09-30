import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
} from "@mui/material";
import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";
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
