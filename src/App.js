import "./App.css";
import Nav from "./routers/Nav";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/styles/theme";
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
