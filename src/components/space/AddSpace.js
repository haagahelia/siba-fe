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

export default function AddSpace({ getAllSpaces }) {
  // State for checking if Add Equipment card is expanded
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const [open, setOpen] = useState(false);
  const [space, setSpace] = useState({
    name: "",
    area: "0",
    personLimit: "0",
    buildingId: "400",
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

  const handleInUseChange = () => {
    const value = event.target.value === "yes";
    setSpace({ ...space, inUse: value });
  };

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
            <>
              <Grid>
                <TextField
                  value={space.name}
                  onChange={(event) =>
                    setSpace({ ...space, name: event.target.value })
                  }
                  label="Name"
                />
              </Grid>
              <Grid>
                <TextField
                  value={space.area}
                  type="number"
                  onChange={(event) =>
                    setSpace({ ...space, area: event.target.value })
                  }
                  label="Area"
                />
              </Grid>
              <Grid>
                <TextField
                  value={space.info}
                  onChange={(event) =>
                    setSpace({
                      ...space,
                      info: event.target.value,
                    })
                  }
                  label="Info"
                />
              </Grid>
              <Grid>
                <TextField
                  value={space.personLimit}
                  type="number"
                  onChange={(event) =>
                    setSpace({
                      ...space,
                      personLimit: event.target.value,
                    })
                  }
                  label="Person limit"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <FormControl
                  sx={{ maxWidth: 220, maxHeight: 58, minWidth: 120 }}
                >
                  <InputLabel>Building</InputLabel>
                  <Select
                    name="buildingId"
                    onChange={(event) =>
                      setSpace({
                        ...space,
                        buildingId: event.target.value,
                      })
                    }
                    value={space.buildingId}
                  >
                    {buildingSelectList.map((building) => (
                      <MenuItem key={building.id} value={building.id}>
                        {building.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid>
                <TextField
                  value={space.availableFrom}
                  type="time"
                  onChange={(event) =>
                    setSpace({
                      ...space,
                      availableFrom: event.target.value,
                    })
                  }
                  label="Available From"
                />
              </Grid>
              <Grid>
                <TextField
                  value={space.availableTo}
                  type="time"
                  onChange={(event) =>
                    setSpace({
                      ...space,
                      availableTo: event.target.value,
                    })
                  }
                  label="Available To"
                />
              </Grid>
              <Grid>
                <TextField
                  value={space.classesFrom}
                  type="time"
                  onChange={(event) =>
                    setSpace({
                      ...space,
                      classesFrom: event.target.value,
                    })
                  }
                  label="Classes From"
                />
              </Grid>
              <Grid>
                <TextField
                  value={space.classesTo}
                  type="time"
                  onChange={(event) =>
                    setSpace({
                      ...space,
                      classesTo: event.target.value,
                    })
                  }
                  label="Classes To"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <FormControl
                  sx={{ maxWidth: 220, maxHeight: 58, minWidth: 120 }}
                >
                  <InputLabel>Is in use</InputLabel>
                  <Select
                    name="inUse"
                    onChange={(event) =>
                      setSpace({
                        ...space,
                        inUse: event.target.value,
                      })
                    }
                    value={space.inUse}
                  >
                    <MenuItem value="1">Yes</MenuItem>
                    <MenuItem value="0">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <FormControl
                  sx={{ maxWidth: 220, maxHeight: 58, minWidth: 120 }}
                >
                  <InputLabel>Space type</InputLabel>
                  <Select
                    name="spaceTypeId"
                    onChange={(event) =>
                      setSpace({
                        ...space,
                        spaceTypeId: event.target.value,
                      })
                    }
                    value={space.spaceTypeId}
                  >
                    {spaceTypeSelectList.map((spaceType) => (
                      <MenuItem key={spaceType.id} value={spaceType.id}>
                        {spaceType.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Button onClick={() => openDialogBox()} variant="contained">
                Add Space
              </Button>
            </>
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
