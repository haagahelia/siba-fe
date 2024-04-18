// The Spaces Page
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import { useRoleLoggedIn } from "../hooks/useRoleLoggedIn";
import Logger from "../logger/logger";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AlertBox from "../components/common/AlertBox";
import AddSpace from "../components/space/AddSpace";
import SpaceListContainer from "../components/space/SpaceListContainer";

export default function SpaceView() {
  Logger.logPrefix = "SpaceView";
  Logger.debug("SpaceView component instantiated.");

  const { roles } = useRoleLoggedIn();
  let { spaceIdToShow } = useParams();
  const pageSize = useContext(AppContext).settings.itemsPerPage;

  const [spaceIdToShowState, setSpaceIdToShowState] = useState(spaceIdToShow);
  const [shownSpace, setShownSpace] = useState(null);
  const [paginateSpaces, setPaginateSpaces] = useState([]);
  const [allSpacesList, setAllSpacesList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  Logger.debug("Initial state set.");

  const setShownSpace2 = (state) => {
    setShownSpace(state);
  };

  const getAllSpaces = async () => {
    Logger.debug("getAllSpaces: fetching all spaces from server.");
    const { httpStatus, data } = await dao.fetchAllSpaces();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug(`getAllSpaces: successfully fetched ${data.length} spaces.`);
      setAllSpacesList(data);
      setPaginateSpaces(data.slice(0, pageSize));
    }
  };

  useEffect(() => {
    Logger.debug("Running effect to fetch all spaces.");
    getAllSpaces();
  }, []);

  useEffect(() => {
    Logger.debug("Running effect to update paginated spaces.");
    setPaginateSpaces(allSpacesList.slice(0, pageSize));
  }, [allSpacesList]);

  useEffect(() => {
    document.title = "Spaces";
  }, []);

  useEffect(() => {
    const getShownSpaceById = async (spaceIdToShowState) => {
      Logger.debug(
        `spaceId: ${spaceIdToShowState} Starting or not? Based on that id.`,
      );
      if (spaceIdToShowState) {
        Logger.debug("getShownSpaceById: starts");
        const { httpStatus, data } =
          await dao.fetchSpaceById(spaceIdToShowState);
        if (httpStatus !== 200) {
          ajaxRequestErrorHandler(
            httpStatus,
            getFunctionName(2),
            setAlertOptions,
            setAlertOpen,
          );
        } else {
          Logger.debug(
            `getShownSpaceById: successfully fetched ${data[0].id}:${data[0].name} space.`,
          );
          setShownSpace(data[0]);
          setSpaceIdToShowState(0);
          spaceIdToShow = 0;
          setOpen(true);
        }
      } else {
        Logger.debug("No space to show directly");
      }
    };

    Logger.debug("Running effect to fetch possible directly shown subejct.");
    getShownSpaceById(spaceIdToShowState);
  }, [spaceIdToShowState, spaceIdToShow]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Container maxWidth="xl">
        {roles.admin === "1" && (
          <AddSpace getAllSpaces={getAllSpaces} allSpacesList={allSpacesList} />
        )}
        <Grid container rowSpacing={2}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Spaces" variant="pageHeader" />
              <SpaceListContainer
                shownSpace={shownSpace}
                setShownSpace={setShownSpace}
                getAllSpaces={getAllSpaces}
                allSpacesList={allSpacesList}
                paginateSpaces={paginateSpaces}
                setPaginateSpaces={setPaginateSpaces}
                open={open}
                setOpen={setOpen}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
