import React from "react"
import testData from "../data/testData.js";
import Grid2 from '@mui/material/Unstable_Grid2';
import ProgressBar from "@ramonak/react-progress-bar";

const ResultView = () => {
    return (
        <>
            <Grid2
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                spacing={2}
                border={2}
                style={{ padding: 10, margin: 'auto', width: '80%', marginTop: 20, 
                         backgroundColor: "#919189", borderRadius: 20 }}>
                {
                    testData.map(prog => {
                        const progress = prog.allocatedHours / prog.requiredHours * 100;
                        const color = progress > 100 ? "red" : progress < 80 ? "yellow" : "green";

                        return (
                            <React.Fragment key={prog.id}>
                                <Grid2 xs={3}>
                                    {prog.name}
                                </Grid2>
                                <Grid2 xs={3}>
                                    <ProgressBar
                                        baseBgColor={"black"}
                                        labelColor={"black"}
                                        bgColor={color}
                                        padding={"3px"}
                                        completed={progress} />
                                </Grid2>
                            </React.Fragment>
                        )
                    })
                }

            </Grid2>
        </>
    )
};

export default ResultView;

