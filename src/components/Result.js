
import Grid2 from "@mui/material/Unstable_Grid2";
import ProgressBar from "@ramonak/react-progress-bar";

export default function Result(props) {

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
              backgroundColor: "rgb(54, 51, 51)",
              padding: 10,
              borderRadius: 20,
            }}
          >
            {testData.map((prog) => {
              const progress = (prog.allocatedHours / prog.requiredHours) * 100;
              const color =
                progress > 100 ? "red" : progress < 80 ? "yellow" : "green";
    
              return (
                <>
                  <Grid2 xs={3} style={{color:"rgb(246, 233, 233)"}}>{prog.name}</Grid2>
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