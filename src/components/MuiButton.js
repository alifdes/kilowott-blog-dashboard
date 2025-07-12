import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';


const StyledButton = styled(Button)(({ theme, selected }) => ({
  backgroundColor: selected
    ? theme.palette.mode === "light"
      ? "#ffeaea" // soft red-ish background
      : "#2a2a2a"
    : "#b1afaf",
  color: selected ? theme.palette.error.main : "#181717",
  fontWeight: 500,
  borderRadius: 18,
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
    backgroundColor: selected ? "#ffdddd" : "#e0e0e0",
    color: selected ? theme.palette.error.main : "#000000",
    boxShadow: "none",
  },
}));

const MuiButton = ({
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

export default MuiButton;
