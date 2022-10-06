import Grid2 from "@mui/material/Unstable_Grid2";

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
                  <Grid2 xs={6}>{prog.name}</Grid2>
                    <Grid2
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
                    {prog.rooms.map((room) => {
                        return(
                            <>
                              <Grid2 xs={6}>{room.name}</Grid2>
                              <Grid2 xs={6}>{room.allocatedHours}</Grid2>
                              </>
                        )
                    })}
                    </Grid2>
                </>
              );
            })}
          </Grid2>
        </>
      );
}