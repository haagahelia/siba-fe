import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import "./App.css";
import { AllocRoundProvider } from "./AppContext.jsx";
import { useThemeSwitcher } from "./hooks/useThemeSwitcher";
import Nav from "./routers/Nav";
import { ThemeIcon } from "./styles/themeIcons";

export default function App() {
  const { theme, toggleTheme } = useThemeSwitcher();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AllocRoundProvider>
          <Nav />
        </AllocRoundProvider>
        <Button variant="themeToggle" onClick={toggleTheme}>
          <ThemeIcon theme={theme} />
        </Button>
      </ThemeProvider>
    </div>
  );
}
