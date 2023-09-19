import React, { useState } from "react";
import { CardHeader, Card, CardContent, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AddEquipmentDialogConfirmation from "./AddEquipmentDialogConfirmation";

export default function AddEquipment(props) {
  // State for checking if Add Equipment card is expanded
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const { getAllEquipments } = props;
  const [open, setOpen] = useState(false);
  const [equipment, setEquipment] = useState({
    name: "",
    priority: "",
    description: "",
    isMovable: "",
  });

  const openDialogBox = () => {
    setOpen(true);
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <CardHeader
            title="Add Equipment"
            onClick={() => setIsCardExpanded(!isCardExpanded)}
          />
          {isCardExpanded && (
            <>
              <Grid>
                <TextField
                  value={equipment.name}
                  onChange={(event) =>
                    setEquipment({ ...equipment, name: event.target.value })
                  }
                  label="Name"
                />
              </Grid>
              <Grid>
                <TextField
                  value={equipment.priority}
                  type="number"
                  onChange={(event) =>
                    setEquipment({ ...equipment, priority: event.target.value })
                  }
                  label="Priority"
                />
              </Grid>
              <Grid>
                <TextField
                  value={equipment.description}
                  onChange={(event) =>
                    setEquipment({
                      ...equipment,
                      description: event.target.value,
                    })
                  }
                  label="Description"
                />
              </Grid>
              <Grid>
                <TextField
                  value={equipment.isMovable}
                  type="number"
                  onChange={(event) =>
                    setEquipment({
                      ...equipment,
                      isMovable: event.target.value,
                    })
                  }
                  label="isMovable (VALUE 0 OR 1)"
                />
              </Grid>
              <Button onClick={() => openDialogBox()} variant="contained">
                Add Equipment
              </Button>
            </>
          )}
        </CardContent>
      </Card>
      <AddEquipmentDialogConfirmation
        open={open}
        setOpen={setOpen}
        equipment={equipment}
        getAllEquipments={getAllEquipments}
        setEquipment={setEquipment}
      />
    </>
  );
}
