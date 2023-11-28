import { useState } from "react";

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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl fullWidth>
                  <TextField
                    value={equipment.name}
                    onChange={(event) =>
                      setEquipment({ ...equipment, name: event.target.value })
                    }
                    label="Name"
                    placeholder="Name..."
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl fullWidth>
                  <InputLabel>Is movable</InputLabel>
                  <Select
                    name="isMovable"
                    label="Is Movable"
                    value={equipment.isMovable}
                    onChange={(event) =>
                      setEquipment({
                        ...equipment,
                        isMovable: event.target.value,
                      })
                    }
                  >
                    <MenuItem value="1">Yes</MenuItem>
                    <MenuItem value="0">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl fullWidth>
                  <TextField
                    value={equipment.priority}
                    type="number"
                    onChange={(event) =>
                      setEquipment({
                        ...equipment,
                        priority: event.target.value,
                      })
                    }
                    label="Priority"
                    placeholder="0"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl fullWidth>
                  <TextField
                    value={equipment.description}
                    onChange={(event) =>
                      setEquipment({
                        ...equipment,
                        description: event.target.value,
                      })
                    }
                    label="Description"
                    placeholder="Something about the equipment..."
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={() => openDialogBox()} variant="addComponentFormButton">
                  Add Equipment
                </Button>
              </Grid>
              <Grid item xs={12}>
                <ImportEquipmentContainer getAllEquipments={getAllEquipments} />
                <EquipmentTemplate />
              </Grid>
            </Grid>
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
