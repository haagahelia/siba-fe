import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import Logger from "../logger/logger";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AlertBox from "../components/common/AlertBox";
import AddSpace from "../components/space/AddSpace";
import SpaceFiltering from "../components/space/SpaceFiltering";
import SpaceListContainer from "../components/space/SpaceListContainer";
import SpacePagination from "../components/space/SpacePagination";

const pageSize = 15;

export default function SpaceView() {
  Logger.logPrefix = "SpaceView";
  Logger.debug("SpaceView component instantiated.");

  const appContext = useContext(AppContext);

  const [paginateSpaces, setPaginateSpaces] = useState([]);
  const [allSpacesList, setAllSpacesList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [isCardExpanded, setIsCardExpanded] = useState(true);

  Logger.debug("Initial state set.");

  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });

  const getAllSpaces = async function () {
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
      setPaginateSpaces(data.slice(0, 15));
    }
  };

  useEffect(() => {
    Logger.debug("Running effect to fetch all spaces.");
    getAllSpaces();
  }, []);

  useEffect(() => {
    Logger.debug("Running effect to update paginated spaces.");
    setPaginateSpaces(allSpacesList.slice(0, 15));
  }, [allSpacesList]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Container maxWidth="xl">
        {appContext.roles.admin ? (
          <AddSpace getAllSpaces={getAllSpaces} allSpacesList={allSpacesList} />
        ) : (
          <Typography variant="subtitle1" mt={3}>
            "Not showing add space to your role"
          </Typography>
        )}
        <Grid container rowSpacing={1}>
          <Card variant="outlined">
            <CardHeader
              title="Spaces"
              onClick={() => setIsCardExpanded(!isCardExpanded)}
            />
            <CardContent>
              {isCardExpanded && (
                <>
                  <SpaceFiltering
                    allSpacesList={allSpacesList}
                    setAllSpacesList={setAllSpacesList}
                    paginateSpaces={paginateSpaces}
                    setPaginateSpaces={setPaginateSpaces}
                    pagination={pagination}
                  />
                  <SpaceListContainer
                    getAllSpaces={getAllSpaces}
                    allSpacesList={allSpacesList}
                    paginateSpaces={paginateSpaces}
                    open={open}
                    setOpen={setOpen}
                  />
                  <SpacePagination
                    pagination={pagination}
                    setPagination={setPagination}
                    allSpacesList={allSpacesList}
                    paginateSpaces={paginateSpaces}
                    setPaginateSpaces={setPaginateSpaces}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
