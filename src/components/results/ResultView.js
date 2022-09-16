import {useState } from "react"
import testData from "../../testData"
import Grid2 from '@mui/material/Unstable_Grid2';
import ProgressBar from "@ramonak/react-progress-bar";

export default function() {

    return (
        <>
        <Grid2 container spacing={2} border={2} style={{padding:2, margin: 10}}>
            
            {
                testData.map(prog => {
                    return (
                    <>
                        <Grid2 xs={6}>
                        {prog.name}
                        </Grid2>
                        <Grid2 xs={6}>
                         <ProgressBar 
                         //style TODO:
                         completed={prog.allocatedHours / prog.requiredHours * 100}/>
                        </Grid2>
                        </>
                    )
                })
            }

        </Grid2>
    </>
    )
}