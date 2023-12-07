import { useEffect } from "react";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteProgram from "./DeleteProgram";
import EditProgram from "./EditProgram";

export default function SingleProgramDialog({
    open,
    setOpen,
    singleProgram,
    setSingleProgram,
    getAllPrograms,
}) {
    Logger.logPrefix = "SingleProgramDialog";

    const { roles } = useRoleLoggedIn();

    useEffect(() => {
        if (open && singleProgram) {
            Logger.debug(
                `Rendering SingleProgramDialog for program: ${JSON.stringify(
                    singleProgram,
                )}`,
            );
        }
    }, [open, singleProgram]);

    return (
        <Dialog
            open={open}
            onClose={() => {
                setOpen(false);
                getAllPrograms();
            }}
        >
            <DialogTitle id="dialog-title">{`Program Info: ${singleProgram?.name}`}</DialogTitle>
            {roles.admin === "1" && (
                <DialogActions>
                    <DeleteProgram
                        singleProgram={singleProgram}
                        getAllPrograms={getAllPrograms}
                        setOpen={setOpen}
                    />
                    <EditProgram
                        singleProgram={singleProgram}
                        setSingleProgram={setSingleProgram}
                        getAllPrograms={getAllPrograms}
                        open={open}
                        setOpen={setOpen}
                    />
                </DialogActions>
            )}
            <DialogContent>
                <Grid
                    container
                    variant="sibaGridSingleItemDisplay"
                    column={14}
                >
                    <DialogContent variant="sibaDialogContent2">
                        <Grid item xs={12} sm={6}>
                            <Typography variant="singleDialogSubtitle">
                                id:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="singleDialogSubtitle">
                                {singleProgram?.id}
                            </Typography>
                        </Grid>
                    </DialogContent>
                    <DialogContent variant="sibaDialogContent2">
                        <Grid item xs={12} sm={6}>
                            <Typography variant="singleDialogSubtitle">
                                Name:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="singleDialogSubtitle">
                                {singleProgram?.name}
                            </Typography>
                        </Grid>
                    </DialogContent>
                    <DialogContent variant="sibaDialogContent2">
                        <Grid item xs={12} sm={6}>
                            <Typography variant="singleDialogSubtitle">
                                Department id:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="singleDialogSubtitle">
                                {singleProgram?.departmentId}
                            </Typography>
                        </Grid>
                    </DialogContent>
                    <DialogContent variant="sibaDialogContent2">
                        <Grid item xs={12} sm={6}>
                            <Typography variant="singleDialogSubtitle">
                                Department Name:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="singleDialogSubtitle">
                                {singleProgram?.departmentName}
                            </Typography>
                        </Grid>
                    </DialogContent>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
