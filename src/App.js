import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Nav from "./routers/Nav";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Nav />
      </ThemeProvider>
    </div>
  );
}

export default App;
