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

export default function SingleBuildingDialog(props) {
  const { open, setOpen, singleBuilding, getAllBuildings, setSingleBuilding } =
    props;

  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => setOpen(false)} width="400px">
        <DialogTitle id="dialog-title">{singleBuilding?.name}</DialogTitle>
        <DialogContent>
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
