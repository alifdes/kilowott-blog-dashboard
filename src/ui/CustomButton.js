import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';


const StyledButton = styled(Button)(({ theme, selected, color }) => {
  let bgColor = "#b1afaf";
  let textColor = "#181717";
  let hoverBg = "#e0e0e0";
  let hoverText = "#000";

  if (color === "error") {
    bgColor = selected
      ? theme.palette.mode === "light"
        ? "#ffeaea"
        : "#2a2a2a"
      : theme.palette.error.light;
    // textColor = theme.palette.error.main;
    hoverBg = "#ffdddd";
    hoverText = theme.palette.error.main;
  }

  if (color === "primary") {
    bgColor = selected
      ? theme.palette.mode === "light"
        ? "#e3f2fd"
        : "#1e1e2f"
      : theme.palette.primary.light;
    // textColor = theme.palette.primary.main;
    hoverBg = "#bbdefb";
    hoverText = theme.palette.primary.main;
  }

  return {
    backgroundColor: bgColor,
    color: textColor,
    fontWeight: 500,
    borderRadius: 13,
    padding: "10px 16px",
    height: "40px",
    minHeight: "40px",
    lineHeight: "40px",
    textTransform: "none",
    width: "auto",
    justifyContent: "flex-start",
    boxShadow: "none",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: hoverBg,
      color: hoverText,
      boxShadow: "none",
    },
  };
});


const CustomButton = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  ...rest
}) => {
  return (
    <StyledButton variant={variant} color={color} size={size} {...rest}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
