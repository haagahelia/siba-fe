import * as React from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import ProgressBar from "@ramonak/react-progress-bar";
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import Result from './Result';
import testData from '../testData';

export default function ProgramResult(props) {

    const programs = props.data;
    const [open, setOpen] = React.useState(false);
    const [subjectId, setSubjectId] = React.useState(0);
    const handleOpen = (id) => {
        setSubjectId(id);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);


    return (
        <>
        <Modal
        open={open}
        onClose={handleClose}

        >
           <Result data={testData.subjects[subjectId]}/>
            </Modal>
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            spacing={2}
            border={2}
            style={{
              padding: 2,
              margin: "auto",
              width: "80%",
              marginTop: 20,
              backgroundColor: "#919189",
              padding: 10,
              borderRadius: 20,
            }}
          >
            {programs.map((prog) => {
              const progress = (prog.allocatedHours / prog.requiredHours) * 100;
              const color =
                progress > 100 ? "red" : progress < 80 ? "yellow" : "green";
    
              return (
                <>   
                <Grid2 xs={3}>
                    <Box onClick={() => handleOpen(prog.id)}>
                    {prog.name}
                    </Box>
                </Grid2>
                  <Grid2 xs={3}>
                    <ProgressBar
                      // Jouduin kommentoimaan pois muutoin appi ei toiminut
                      // style= {styles.section}
                      baseBgColor={"black"}
                      labelColor={"black"}
                      bgColor={color}
                      padding={"3px"}
                      completed={progress}
                    />
                  </Grid2>
                
                </>
              );
            })}
          </Grid2>
        </>
      );
}