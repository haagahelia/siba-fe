import { CardHeader } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";
import {
  CommonContainer,
  CommonContentContainer,
} from "../components/common/CommonContainers";
import AddSpaceTypeContainer from "../components/spaceType/AddSpaceTypeContainer";
import SpaceTypeListContainer from "../components/spaceType/SpaceTypeListContainer";
import SpaceTypePagination from "../components/spaceType/SpaceTypeListPagination";
import { useRoleLoggedIn } from "../hooks/useRoleLoggedIn";
import Logger from "../logger/logger";

export default function SpaceTypeView() {
  const { roles } = useRoleLoggedIn();
  const pageSize = useContext(AppContext).settings.itemsPerPage;

  const [paginateSpaceTypes, setPaginateSpaceTypes] = useState([]);
  const [allSpaceTypesList, setAllSpaceTypesList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });

  const getAllSpaceTypes = async () => {
    const { httpStatus, data } = await dao.fetchAllSpaceTypes();
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug(`Fetched ${data.length} space types.`);
      setAllSpaceTypesList(data);
    }
  };

  useEffect(() => {
    Logger.debug("Space types component instantiated.");
    getAllSpaceTypes();
  }, []);

  useEffect(() => {
    setPaginateSpaceTypes(allSpaceTypesList.slice(0, pageSize));
  }, [allSpaceTypesList]);

  useEffect(() => {
    document.title = "Space Types";
  }, []);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <CommonContainer>
        {roles.admin === "1" && (
          <AddSpaceTypeContainer getAllSpaceTypes={getAllSpaceTypes} />
        )}
        <CommonContentContainer>
          <CardHeader title="Space Types" variant="pageHeader" />
          <SpaceTypeListContainer
            getAllSpaceTypes={getAllSpaceTypes}
            allSpaceTypesList={allSpaceTypesList}
            paginateSpaceTypes={paginateSpaceTypes}
          />
          <SpaceTypePagination
            pagination={pagination}
            setPagination={setPagination}
            allSpaceTypesList={allSpaceTypesList}
            paginateSpaceTypes={paginateSpaceTypes}
            setPaginateSpaceTypes={setPaginateSpaceTypes}
            pageSize={pageSize}
          />
        </CommonContentContainer>
      </CommonContainer>
    </div>
  );
}
