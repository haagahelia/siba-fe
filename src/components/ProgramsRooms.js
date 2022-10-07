import { Box, Button, Collapse, Grid, Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";

export default function ProgramsRooms(props) {


 

 



    const testData = props.data;
    return (
        <>
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            spacing={2}

            style={{

              margin: "auto",
              marginTop: 20,
              backgroundColor: "#919189",
              padding: 10,
              borderRadius: 20,
            }}
          >
            {testData.map((prog) => {
              return (
                <>

                  <Grid2 xs={5}
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        spacing={2}
                                                
                        style={{

                            margin: "auto",
                            marginTop: 20,
                            backgroundColor: "grey",
                            padding: 10,
                            borderRadius: 20,
                        }}
                  >
                  

                  {/* Using another function to loop all rooms with collapsibles */}
                   {CollapsedRow(prog)}
                  
                  </Grid2>
                </>
              );
            })}
          </Grid2>
        </>
      );



      function CollapsedRow (prog1){
         const [expand, setExpand] = React.useState(false);
      
          return(
        
            <Grid2 container>
              
              <div>{prog1.name}</div>  <Button sx={{height: 15}} onClick={()=> setExpand(!expand)}> Avaa </Button> 

                    <Collapse in={expand}>
                      {prog1.rooms.map((room) => {
                          return(
                            
                              <Grid2 container>
                                <Grid2 xs={8}>{room.name}</Grid2>
                                <Grid2 xs={4}>{room.allocatedHours}</Grid2>
                              </Grid2>
                            
                          )
                      })}
                    </Collapse>
            </Grid2>
          );
        }


}

