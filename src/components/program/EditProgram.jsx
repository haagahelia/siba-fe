import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddEditProgram";
import Logger from "../../logger/logger";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import useTheme from "@mui/material/styles/useTheme";

export default function EditProgram({
    singleProgram,
    getAllPrograms,
    setOpen,
}) {
    const [editOpen, setEditOpen] = useState(false);
    const [program, setProgram] = useState({
        id: singleProgram?.id,
        name: singleProgram?.name,
        departmentId: singleProgram?.departmentId,
    });

    const theme = useTheme();

    const submitEdits = async () => {
        Logger.debug(
            `Submitting edits for program: ${JSON.stringify(singleProgram)}`,
          );
        const validation = validate(program);
        if (Object.values(validation).length !== 0) {
            alert(Object.values(validation));
        } else {
            const result = await dao.editProgram(program);
            if (!result) {
                alert("Something went wrong");
            } else {
                alert(`Program ${program.name} updated`);
                setEditOpen(false);
                setOpen(false);
                getAllPrograms();
            }
        }
    };

    return (
        <div>
            <Button
                variant="contained"
                style={theme.components.MuiButton.editbutton}
                onClick={() => {
                    setEditOpen(true);
                }}
            >
                Edit
            </Button>
            <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                <DialogTitle>Edit Program</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container variant="sibaGridEdit" spacing={3} column={7}>
                            <Grid item xs={12}>
                                <TextField
                                    name="Program"
                                    label="Program"
                                    defaultValue={singleProgram?.name}
                                    onChange={(e) =>
                                        setProgram({ ...program, name: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="departmentId"
                                    label="departmentId"
                                    defaultValue={singleProgram?.departmentId}
                                    onChange={(e) =>
                                        setProgram({
                                            ...program,
                                            departmentId: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button onClick={submitEdits} variant="contained">
                            Submit
                        </Button>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}