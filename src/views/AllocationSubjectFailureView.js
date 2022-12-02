import { Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import dao from "../ajax/dao";

export function GetMissingEquipment(idData) {

    let subjId = idData.subjectId;
    let roomId = idData.roomId;
    let item = idData.item;

    const [missingEquipment, setMissingEquipment] = useState("No");

    // lagittaa älyttömästi useEffectissä...
    const getMissingEquipment = async function () {

        const data = await dao.getMissingEquipmentForRoom(subjId, roomId);
        if (data === 500) {
            console.log("Hupsista keikkaa!");
            return;
        } else {
            console.log(data);
            let itemString = "Test";
            while (data) {
                itemString = itemString + ", " + data.name;
            }
            console.log(itemString);
            setMissingEquipment(itemString);
        }
    };

    console.log("IDs!")
    console.log(subjId + " " + roomId + " " + item);

    return (
        <Tooltip disableFocusListener title="Lagmachine">
            {item === 0
                ? <TableCell><CloseIcon color="error"></CloseIcon></TableCell>
                : <TableCell><CheckIcon color="success"></CheckIcon></TableCell>
            }
        </Tooltip>
    );
}

export default function AllocationSubjectFailureView() {

    const [unAllocableSubjects, setUnAllocableSubjects] = useState([]);
    const [unAllocSubjectRooms, setUnAllocSubjectRooms] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [currSubjId, setCurrSubjId] = useState();

    const getUnAlloc = async function (id) {
        const data = await dao.getUnAllocableSubjects(id);
        if (data === 500) {
            console.log("Hupsista keikkaa!");
            return;
        } else {
            setUnAllocableSubjects(data);
        }
    };

    const getUnAllocRooms = async function (id) {
        console.log(id);
        const data = await dao.getSubjectRooms(id);
        if (data === 500) {
            console.log("Hupsista keikkaa!");
            return;
        } else {
            setUnAllocSubjectRooms(data);
            setCurrSubjId(id);
        }
    };

    const handleClickOpen = (id) => () => {
        setOpen(true);
        getUnAllocRooms(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    useEffect(() => {
        getUnAlloc(10004);
        console.log(unAllocableSubjects);
    }, []);


    return (
        <div>
            <Typography style={{ color: "#F6E9E9", margin: 20 }}>Opetukset joita ei voitu allokoida</Typography>

            <div style={{ width: "70%", backgroundColor: '#ff1744', margin: "auto" }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nimi</TableCell>
                                <TableCell>Ryhmänkoko</TableCell>
                                <TableCell>Tilavaatimus</TableCell>
                                <TableCell>Tilatyyppi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {unAllocableSubjects.map((row) => (
                                <TableRow
                                    key={row.name}
                                    onClick={handleClickOpen(row.subjectId)}
                                >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.groupSize}</TableCell>
                                    <TableCell>{row.area}</TableCell>
                                    <TableCell>{row.spaceType}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="body"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth="70%"
            >
                <DialogTitle id="scroll-dialog-title">Sopimattomat tilat</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tilatyyppi</TableCell>
                                    <TableCell>Tilakoko</TableCell>
                                    <TableCell>Tavarat</TableCell>
                                    <TableCell>Tilakoko</TableCell>
                                    <TableCell>Hlömäärä</TableCell>
                                    <TableCell>Tilatyyppi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {unAllocSubjectRooms.map((row) => (
                                    <TableRow
                                        key={row.id}
                                    >
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.area}</TableCell>

                                        <GetMissingEquipment subjectId={currSubjId} roomId={row.id} item={row.missingItems}></GetMissingEquipment>

                                        {row.areaOk === 0
                                            ? <TableCell><CloseIcon color="error"></CloseIcon></TableCell>
                                            : <TableCell><CheckIcon color="success"></CheckIcon></TableCell>
                                        }
                                        {row.personLimitOk === 0
                                            ? <TableCell><CloseIcon color="error"></CloseIcon></TableCell>
                                            : <TableCell><CheckIcon color="success"></CheckIcon></TableCell>
                                        }
                                        {row.spaceTypeOk === 0
                                            ? <TableCell><CloseIcon color="error"></CloseIcon></TableCell>
                                            : <TableCell><CheckIcon color="success"></CheckIcon></TableCell>
                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ backgroundColor: '#ff6d00', cursor: "pointer" }}>Poistu</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}