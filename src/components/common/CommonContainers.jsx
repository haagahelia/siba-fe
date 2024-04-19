import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const CommonContainer = ({ children }) => {
  return <Container maxWidth="xl">{children}</Container>;
};

const CommonContentContainer = ({ children }) => {
  return (
    <Grid container rowSpacing={2}>
      <Card variant="outlined">
        <CardContent>{children}</CardContent>
      </Card>
    </Grid>
  );
};

export { CommonContainer, CommonContentContainer };
