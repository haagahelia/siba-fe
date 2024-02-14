import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import dao from "../../ajax/dao";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";
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
  Logger.logPrefix = "SingleBuildingDialog";

  const { roles } = useRoleLoggedIn();

  const [numberOfSpaces, setNumberOfSpaces] = useState(null);

  const fetchNumberOfSpaces = async () => {
    const response = await dao.getNumberOfSpaces(singleBuilding?.id);
    const num = response;
    const value = num["count(*)"];
    return value;
  };

  useEffect(() => {
    if (open && singleBuilding) {
      Logger.debug(
        `Rendering SingleBuildingDialog for building: ${JSON.stringify(
          singleBuilding,
        )}`,
      );
      fetchNumberOfSpaces(singleBuilding.id)
        .then((number) => {
          setNumberOfSpaces(number);
          console.log("Number of spaces:", number);
        })
        .catch((error) =>
          Logger.error("Error fetching the number of spaces:", error),
        );
    }
  }, [open, singleBuilding]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} width="400px">
      <DialogTitle id="dialog-title">
        Building: {singleBuilding?.name}
      </DialogTitle>
      <IconButton
        edge="end"
        color="inherit"
        onClick={() => setOpen(false)}
        aria-label="close"
        style={{ position: "absolute", top: "10px", right: "20px" }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        variant="sibaDialogContent2"
        style={{
          background: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="singleDialogSubtitle">
          {numberOfSpaces !== null
            ? numberOfSpaces === 0
              ? "There are no spaces in this building."
              : numberOfSpaces === 1
                ? "There is 1 space in this building."
                : `There are ${numberOfSpaces} spaces in this building.`
            : "Loading..."}
        </Typography>
      </DialogContent>

      {roles.admin === "1" && numberOfSpaces === 0 && (
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
          <BuildingDisplay singleBuilding={singleBuilding} />
        </ListItem>
      </List>
    </Dialog>
  );
}
