import React, { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Create context
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  // Load saved mode from localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem("mui-mode");
    if (storedMode) setMode(storedMode);
  }, []);

  // Toggle theme and persist to localStorage
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const nextMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("mui-mode", nextMode);
          return nextMode;
        });
      },
    }),
    []
  );

  // Create theme with Poppins font and custom palette
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2", // adjust as per your brand
          },
          background: {
            default: mode === "light" ? "#f5f7fa" : "#121212",
            paper: mode === "light" ? "#fff" : "#1d1d1d",
          },
        },
        typography: {
          fontFamily: "'Poppins', sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeContextProvider;
