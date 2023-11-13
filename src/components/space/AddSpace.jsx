import { useEffect, useState } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import AddSpaceDialogConfirmation from "./AddSpaceDialogConfirmation";
import ImportSpaceContainer from "./ImportSpaceContainer";
import SpaceTemplate from "./SpaceTemplate";

export default function AddSpace({ getAllSpaces }) {
  // State for checking if Add Equipment card is expanded
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const [open, setOpen] = useState(false);
  const [space, setSpace] = useState({
    name: "",
    area: "0",
    personLimit: "0",
    buildingId: "400",
    buildingName: "Musiikkitalo",
    availableFrom: "",
    availableTo: "",
    classesFrom: "",
    classesTo: "",
    inUse: "",
    spaceTypeId: "0",
  });

  const openDialogBox = () => {
    setOpen(true);
  };

  /*
    Here we get space types and buildings for select list.
    These functions will possibly be moved to their own component later.
  */

  const [spaceTypeSelectList, setSpaceTypeSelectList] = useState([
    { id: 5004, name: "Musicalist room" },
  ]);

  const [buildingSelectList, setBuildingSelectList] = useState([
    { id: 401, name: "Musiikkitalo" },
  ]);

  const getSpaceTypesForSelect = async function () {
    Logger.debug(
      "getSpaceTypesForSelect: fetching all Space Types for select from server.",
    );
    const { httpStatus, data } = await dao.fetchSpacetypeForSelect();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug(
        "getSpaceTypesForSelect: successfully fetched Space Types for select.",
      );
      setSpaceTypeSelectList(data);
    }
  };

  const getBuildingsForSelect = async function () {
    Logger.debug(
      "getBuildingForSelect: fetching all Buildings for select from server.",
    );
    const { httpStatus, data } = await dao.fetchAllBuildings();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug(
        "getBuildingsForSelect: successfully fetched buildings for select.",
      );
      setBuildingSelectList(data);
    }
  };

  useEffect(() => {
    getSpaceTypesForSelect();
    getBuildingsForSelect();
  }, []);

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <CardHeader
            title="Add Space"
            onClick={() => setIsCardExpanded(!isCardExpanded)}
            action={
              <IconButton
                onClick={() => setIsCardExpanded(!isCardExpanded)}
                aria-expanded={isCardExpanded}
                aria-label="expand/collapse"
                color="primary"
              >
                {isCardExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            }
          />
          {isCardExpanded && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Name"
                  value={space.name}
                  onChange={(event) =>
                    setSpace({ ...space, name: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Area"
                  type="number"
                  value={space.area}
                  onChange={(event) =>
                    setSpace({ ...space, area: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Info"
                  value={space.info}
                  onChange={(event) =>
                    setSpace({ ...space, info: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Person limit"
                  type="number"
                  value={space.personLimit}
                  onChange={(event) =>
                    setSpace({ ...space, personLimit: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Building</InputLabel>
                  <Select
                    name="buildingId"
                    value={space.buildingId}
                    onChange={(event) => {
                      setSpace((prevSpace) => ({
                        ...prevSpace,
                        buildingId: event.target.value,
                        buildingName: buildingSelectList.find(
                          (building) => building.id === event.target.value
                        ).name,
                      }));
                    }}
                  >
                    {buildingSelectList.map((building) => (
                      <MenuItem key={building.id} value={building.id}>
                        {building.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Available From"
                  type="time"
                  value={space.availableFrom}
                  onChange={(event) =>
                    setSpace({ ...space, availableFrom: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Available To"
                  type="time"
                  value={space.availableTo}
                  onChange={(event) =>
                    setSpace({ ...space, availableTo: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Classes From"
                  type="time"
                  value={space.classesFrom}
                  onChange={(event) =>
                    setSpace({ ...space, classesFrom: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Classes To"
                  type="time"
                  value={space.classesTo}
                  onChange={(event) =>
                    setSpace({ ...space, classesTo: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Is in use</InputLabel>
                  <Select
                    name="inUse"
                    value={space.inUse}
                    onChange={(event) =>
                      setSpace({
                        ...space,
                        inUse: event.target.value,
                      })
                    }
                  >
                    <MenuItem value="1">Yes</MenuItem>
                    <MenuItem value="0">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Space type</InputLabel>
                  <Select
                    name="spaceTypeId"
                    value={space.spaceTypeId}
                    onChange={(event) =>
                      setSpace({ ...space, spaceTypeId: event.target.value })
                    }
                  >
                    {spaceTypeSelectList.map((spaceType) => (
                      <MenuItem key={spaceType.id} value={spaceType.id}>
                        {spaceType.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={openDialogBox} variant="contained">
                  Add Space
                </Button>
                <ImportSpaceContainer
                  getAllSpaces={getAllSpaces}
                  buildingSelectList={buildingSelectList}
                  spaceTypeSelectList={spaceTypeSelectList}
                />
                <SpaceTemplate />
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
      <AddSpaceDialogConfirmation
        open={open}
        setOpen={setOpen}
        space={space}
        getAllSpaces={getAllSpaces}
        setSpace={setSpace}
      />
    </>
  );
}
