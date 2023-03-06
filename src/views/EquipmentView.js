import React, { useState, useEffect } from "react";
import dao from "../ajax/dao";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Card, Container } from "@mui/material";
import SingleEquipmentDialog from "../components/equipment/SingleEquipmentDialog";

export default function EquipmentView() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [singleEquipment, setSingleEquipment] = useState(null);
  const [open, setOpen] = useState(false);

  const getAllEquipment = async function () {
    const { success, data } = await dao.fetchEquipmentData();
    if (!success) {
      alert("nope");
    } else {
      setEquipmentList(data);
    }
  };

  useEffect(() => {
    getAllEquipment();
  }, []);

  return (
    <div>
      <SingleEquipmentDialog
        open={open}
        setOpen={setOpen}
        singleEquipment={singleEquipment}
        setSingleEquipment={setSingleEquipment}
        getAllEquipment={getAllEquipment}
      />
      <Container maxWidth="100%">
        <Grid
          container
          rowSpacing={0.5}
          justifyContent="space-evenly"
          alignItems="flex-start"
          marginTop="20px"
        >
          <Card variant="outlined">
            <CardContent>
              <CardHeader title="Equipment" />
              {equipmentList.map((value) => {
                return (
                  <List key={value.id}>
                    <ListItem
                      onClick={() => {
                        setSingleEquipment(value);
                        setOpen(true);
                      }}
                    >
                      <Grid item md={3} xs={1} padding={2}>
                        <Typography
                          variant="caption"
                          style={{ fontWeight: "bold" }}
                        >
                          ID
                        </Typography>
                        <ListItemText primary={value.id} />
                      </Grid>
                      <Grid item md={3} xs={7} padding={2}>
                        <Typography
                          variant="caption"
                          style={{ fontWeight: "bold" }}
                        >
                          Name
                        </Typography>
                        <ListItemText primary={value.name} />
                      </Grid>
                      <Grid item md={3} xs={2} padding={2}>
                        <Typography
                          variant="caption"
                          style={{ fontWeight: "bold" }}
                        >
                          Priority
                        </Typography>
                        <ListItemText primary={value.equipmentPriority} />
                      </Grid>
                      <Grid item md={3} xs={4} padding={2}>
                        <Typography
                          variant="caption"
                          style={{ fontWeight: "bold" }}
                        >
                          Description
                        </Typography>
                        <ListItemText primary={value.description} />
                      </Grid>
                    </ListItem>
                  </List>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}
