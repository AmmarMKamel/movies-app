import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Router from "./Routes";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { currentTheme } from "./store/slices/theme";

import { lightTheme, darkTheme } from "./theme";

const App = () => {
  const theme = useSelector(currentTheme);

  useEffect(() => {
    document.body.style.backgroundColor =
    theme === 'light' ? lightTheme.palette.background.default : darkTheme.palette.background.default;
  }, [theme]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
