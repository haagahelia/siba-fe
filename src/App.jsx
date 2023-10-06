import "./App.css";
import { useThemeSwitcher } from "./hooks/useThemeSwitcher";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Nav from "./routers/Nav";
import { ThemeIcon } from "./styles/themeIcons";

export default function App() {
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
