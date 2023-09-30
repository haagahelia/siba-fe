import { Button, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { useThemeSwitcher } from "./customhooks/useThemeSwitcher";
import Nav from "./routers/Nav";
import { ThemeIcon } from "./styles/themeIcons";

function App() {
  const { theme, toggleTheme } = useThemeSwitcher();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav />
        <Button variant="themeToggle" onClick={toggleTheme}>
          <ThemeIcon theme={theme} />
        </Button>
      </ThemeProvider>
    </div>
  );
}

export default App;
