import { useFormik } from "formik";
// The Add Space Component
import { useEffect, useState } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import validate from "../../validation/ValidateAddSpace";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormHelperText } from "@mui/material";
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
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AddSpaceDialogConfirmation from "./AddSpaceDialogConfirmation";
import ImportSpaceContainer from "./ImportSpaceContainer";
import SpaceTemplate from "./SpaceTemplate";

export default function AddSpace({ getAllSpaces }) {
  // State for checking if Add Equipment card is expanded
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const [open, setOpen] = useState(false);
  const [space, setSpace] = useState({
    name: "",
    area: "",
    info: "",
    personLimit: "0",
    buildingId: "401",
    buildingName: "Musiikkitalo",
    availableFrom: "",
    availableTo: "",
    classesFrom: "",
    classesTo: "",
    inUse: "",
    spaceTypeId: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: space,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to add ${values.name}?`,
        content: `By clicking continue, ${values.name} will be added to the building list`,
      });
      setDialogOpen(true);

      return;
    },
  });

  const addSingleSpace = async (spaceData) => {
    spaceData.name = capitalizeFirstLetter(spaceData.name);
    const success = await dao.postNewSpace(space);
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
      setAlertOpen(true);
    } else {
      setSpace({
        name: "",
        area: "0",
        personLimit: "0",
        buildingId: "401",
        availableFrom: "",
        availableTo: "",
        classesFrom: "",
        classesTo: "",
        inUse: "",
        spaceTypeId: "",
      });
      setAlertOptions({
        severity: "success",
        title: "Success!",
        message: `${spaceData.name} added successfully.`,
      });
      setAlertOpen(true);
      getAllSpaces();
    }
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

  const getSpaceTypesForSelect = async () => {
    Logger.debug(
      "getSpaceTypesForSelect: fetching all Space Types for select from server.",
    );
    const { httpStatus, data } = await dao.fetchAllSpaceTypes();
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

  const getBuildingsForSelect = async () => {
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
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={addSingleSpace}
        submitValues={space}
      />
      <Card variant="outlined">
        <CardContent>
          <CardHeader
            title="Add Space"
            onClick={() => setIsCardExpanded(!isCardExpanded)}
            variant="pageHeader"
            action={
              <IconButton
                onClick={() => setIsCardExpanded(!isCardExpanded)}
                aria-expanded={isCardExpanded}
                aria-label="expand/collapse"
              >
                {isCardExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            }
          />
          {isCardExpanded && (
            <Grid container spacing={2}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      name="name"
                      error={
                        formik.touched.name && formik.errors.name ? true : false
                      }
                      label="Name"
                      placeholder="Name..."
                      value={formik.values.name}
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      helperText={
                        formik.touched.name && formik.errors.name
                          ? formik.errors.name
                          : null
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      error={formik.touched.area && Boolean(formik.errors.area)}
                      name="area"
                      label="Area"
                      type="number"
                      placeholder="0"
                      variant="outlined"
                      value={formik.values.area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.area && formik.errors.area}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      error={formik.touched.info && Boolean(formik.errors.info)}
                      name="info"
                      label="Info"
                      placeholder="Some info..."
                      variant="outlined"
                      value={formik.values.info}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.info && formik.errors.info}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      error={
                        formik.touched.personLimit &&
                        Boolean(formik.errors.personLimit)
                      }
                      name="personLimit"
                      label="Person limit"
                      type="number"
                      variant="outlined"
                      value={formik.values.personLimit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.personLimit && formik.errors.personLimit
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Building</InputLabel>
                      <Select
                        name="buildingId"
                        type="number"
                        label="Building"
                        value={formik.values.buildingId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.buildingId &&
                          Boolean(formik.errors.buildingId)
                        }
                      >
                        {buildingSelectList.map((building) => (
                          <MenuItem key={building.id} value={building.id}>
                            {building.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.buildingId &&
                        formik.errors.buildingId && (
                          <FormHelperText error>
                            {formik.errors.buildingId}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Available from"
                      type="time"
                      name="availableFrom"
                      variant="outlined"
                      value={formik.values.availableFrom}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.availableFrom &&
                        Boolean(formik.errors.availableFrom)
                      }
                      helperText={
                        formik.touched.availableFrom &&
                        formik.errors.availableFrom
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Available to"
                      type="time"
                      name="availableTo"
                      variant="outlined"
                      value={formik.values.availableTo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.availableTo &&
                        Boolean(formik.errors.availableTo)
                      }
                      helperText={
                        formik.touched.availableTo && formik.errors.availableTo
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Classes from"
                      type="time"
                      name="classesFrom"
                      variant="outlined"
                      value={formik.values.classesFrom}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.classesFrom &&
                        Boolean(formik.errors.classesFrom)
                      }
                      helperText={
                        formik.touched.classesFrom && formik.errors.classesFrom
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Classes to"
                      type="time"
                      name="classesTo"
                      variant="outlined"
                      value={formik.values.classesTo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.classesTo &&
                        Boolean(formik.errors.classesTo)
                      }
                      helperText={
                        formik.touched.classesTo && formik.errors.classesTo
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>In use?</InputLabel>
                      <Select
                        name="inUse"
                        label="In use?"
                        value={formik.values.inUse}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.inUse && Boolean(formik.errors.inUse)
                        }
                      >
                        <MenuItem value="1">Yes</MenuItem>
                        <MenuItem value="0">No</MenuItem>
                      </Select>
                      {formik.touched.inUse && formik.errors.inUse && (
                        <FormHelperText error>
                          {formik.errors.inUse}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Space type</InputLabel>
                      <Select
                        name="spaceTypeId"
                        label="Space type"
                        type="number"
                        value={formik.values.spaceTypeId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.spaceTypeId &&
                          Boolean(formik.errors.spaceTypeId)
                        }
                      >
                        {spaceTypeSelectList.map((spaceType) => (
                          <MenuItem key={spaceType.id} value={spaceType.id}>
                            {spaceType.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.spaceTypeId &&
                        formik.errors.spaceTypeId && (
                          <FormHelperText error>
                            {formik.errors.spaceTypeId}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} padding={2}>
                    <Button
                      type="submit"
                      variant="addComponentFormButton"
                      onClick={() => {
                        setSpace(formik.values);
                      }}
                    >
                      Add Space
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <ImportSpaceContainer
                getAllSpaces={getAllSpaces}
                buildingSelectList={buildingSelectList}
                spaceTypeSelectList={spaceTypeSelectList}
              />
              <SpaceTemplate />
            </Grid>
          )}
        </CardContent>
      </Card>
    </>
  );
}
