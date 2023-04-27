import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  ListItem,
  List,
} from "@mui/material";
import DeleteBuilding from "./DeleteBuilding";
import EditBuildingContainer from "./EditBuildingContainer";
import BuildingDisplay from "./BuildingDisplay";
import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";

export default function SingleBuildingDialog(props) {
  const { open, setOpen, singleBuilding, getAllBuildings, setSingleBuilding } =
    props;
  const { roles, setRoles } = RoleLoggedIn();

  return (
    <React.Fragment>
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
                flexDirection={"column"}
              />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
