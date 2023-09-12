import React, { useState } from "react"; //useEffect
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import SingleEquipmentDialog from "./SingleEquipmentDialog";
import dao from "../../ajax/dao";
//import { ajaxRequestErrorHandler, getFunctionName } from "../../ajax/ajaxRequestErrorHandler";
import Logger from "../../logger/logger";

export default function EquipmentListItems(props) {
  const { getAllEquipments, equipmentList } = props;

  const [open, setOpen] = useState(false);
  const [singleEquipment, setSingleEquipment] = useState({});

  const getSingleEquipment = async (value) => {
    const { httpStatus, data } = await dao.fetchEquipmentById(value);
    if (httpStatus !== 200) {
      // ajaxRequestErrorHandler(
      //   httpStatus,
      //   getFunctionName(2),
      //   setAlertOptions,
      //   setAlertOpen,
      // );
      Logger.debug(
        `fetchEquipmentById failed with http status code: ${httpStatus}`,
      );
      alert(`Could not fetch equipment. Code: ${httpStatus}`);
    } else if (data[0] === undefined) {
      Logger.debug(
        `fetchEquipmentById data retrieval failed with http status code: ${httpStatus}`,
      );
      alert(`Equipment was not found. Code: ${httpStatus}`);
      getAllEquipments();
    } else {
      console.log(data);
      setSingleEquipment({
        id: data[0].id,
        name: data[0].name,
        priority: data[0].priority,
        description: data[0].description,
      });
    }
  };

  const Box = styled(Paper)(({ theme }) => ({
    overflow: "auto",
  }));

  return (
    <div>
      <SingleEquipmentDialog
        open={open}
        setOpen={setOpen}
        singleEquipment={singleEquipment}
        setSingleEquipment={setSingleEquipment}
        getAllEquipments={getAllEquipments}
      />
      <Box>
        <nav>
          {equipmentList.map((value) => {
            return (
              <List key={value.id}>
                <ListItem
                  onClick={() => {
                    getSingleEquipment(value.id);
                    //setSingleEquipment(value);
                    setOpen(true);
                  }}
                >
                  <Grid item md={3} xs={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Id:
                    </Typography>
                    <ListItemText
                      primary={value.id}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={3} xs={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Name:
                    </Typography>
                    <ListItemText
                      primary={value.name}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={3} xs={7}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Priority:
                    </Typography>
                    <ListItemText
                      primary={value.equipmentPriority}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={1} xs={1}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Description:
                    </Typography>
                    <ListItemText
                      primary={value.description}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                </ListItem>
              </List>
            );
          })}
        </nav>
      </Box>
    </div>
  );
}
