import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ColorModeContext } from "../theme/ThemeContext";
import { useContext } from "react";

const DashboardHeader = () => {
  const theme = useTheme(); // to access current mode (light/dark)
  const colorMode = useContext(ColorModeContext); // to access toggle function

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        mb: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.secondary,
        }}
      >
        Blog Dashboard
      </Typography>

      <IconButton onClick={colorMode.toggleColorMode} sx={{ ml: "auto" }}>
        {theme.palette.mode === "dark" ? (
          <Brightness7 sx={{ color: theme.palette.text.secondary }} />
        ) : (
          <Brightness4 sx={{ color: theme.palette.text.secondary }} />
        )}
      </IconButton>
    </Box>
  );
};

export default DashboardHeader;
