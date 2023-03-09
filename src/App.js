import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Nav from "./routers/Nav";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Nav />
      </ThemeProvider>
    </div>
  );
}

export default App;
