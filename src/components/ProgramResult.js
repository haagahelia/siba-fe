import * as React from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import ProgressBar from "@ramonak/react-progress-bar";
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import Result from './Result';
import testData from '../testData';
import Typography from '@mui/material/Typography';
  

export default function ProgramResult(props) {

    const programs = props.data;
    const [open, setOpen] = React.useState(false);
    const [programId, setProgramId] = React.useState(0);
    const [programName, setProgramName] = React.useState('');
    const handleOpen = (id,name) => {
        setProgramId(id);
        setOpen(true);
        setProgramName(name);
    }
    const handleClose = () => setOpen(false);


    return (
        <>
        <Modal
        open={open}
        onClose={handleClose}

        >  
            <Box style={{width:'80%', margin:'auto', borderRadius: 20, backgroundColor: "#919189", marginTop:'10%'}}>
            <Typography style={{textAlign:'center', marginTop:'5%', color: 'rgb(246, 233, 233)'}}>{programName} -subjects</Typography>
                <Result data={testData.subjects[programId]}/>
            </Box>
        </Modal>
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            spacing={2}
            style={{
              padding: 2,
              margin: "auto",
              width: "80%",
              marginTop: 20,
              backgroundColor: "rgb(54, 51, 51)",
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
                    <Box style={{color:'rgb(246, 233, 233)'}} onClick={() => handleOpen(prog.id, prog.name)}>
                    
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