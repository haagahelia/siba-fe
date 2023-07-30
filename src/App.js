import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Nav from "./routers/Nav";
import { CssBaseline } from "@mui/material";
import { Button } from "@mui/material";
import { useThemeSwitcher } from "./customhooks/useThemeSwitcher";

function App() {
  const { theme, toggleTheme } = useThemeSwitcher();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav />
        <Button variant="themeToggle" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </ThemeProvider>
    </div>
  );
}

export default App;
