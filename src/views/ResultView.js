import {useState } from "react"
import testData from "../testData";
import Grid2 from '@mui/material/Unstable_Grid2';
import ProgressBar from "@ramonak/react-progress-bar";


export default function() {

    return (
        <>
        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} spacing={2} border={2} style={{padding:2, margin: 'auto', width: '80%', marginTop: 20 }}>
            
            {
                testData.map(prog => {
                    const progress = prog.allocatedHours / prog.requiredHours * 100 ;
                    const color = progress > 100 ? "red" : progress < 80 ? "yellow" : "green" ;


                    return (
                    <>
                       
                        <Grid2 xs={3}>
                        {prog.name}
                        </Grid2>
                        <Grid2 xs={3}>
                         <ProgressBar
                            labelColor={"black"}
                            bgColor={color}
                         completed={progress}/>
                        </Grid2>
                        </>
                    )
                })
            }

        </Grid2>
    </>
    )
}


