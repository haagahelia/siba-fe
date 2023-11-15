import { useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddEquipmentDialogConfirmation from "./AddEquipmentDialogConfirmation";
import EquipmentTemplate from "./EquipmentTemplate";
import ImportEquipmentContainer from "./ImportEquipmentContainer";

export default function AddEquipment({ getAllEquipments }) {
  // State for checking if Add Equipment card is expanded
  const [isCardExpanded, setIsCardExpanded] = useState(false);

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
            variant="pageHeader"
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
              <ImportEquipmentContainer getAllEquipments={getAllEquipments} />
              <EquipmentTemplate />
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
