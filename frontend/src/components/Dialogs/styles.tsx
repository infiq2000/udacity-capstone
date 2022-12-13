import { Dialog, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
export const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    width: "100%",
    borderRadius: "8px",
    background: "var(--main-bg-color)",
  },
  "& .MuiDialogActions-root": {
    padding: "20px 24px",
    "& button": {
      minWidth: "100px",
    },
  },
  "& .dialogTitleRoot": {
    position: "relative",
    padding: "16px 0",
    margin: "0px 20px",
    "& span": {
      color: "var(--main-content-text-color) !important",
    },
    borderBottom: "1px solid var(--main-content-text-color)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 16,
    fontWeight: 700,
  },
  "& .MuiDialogContent-root": {
    color: "var(--main-content-text-color)",
    fontSize: "15px",
    fontWeight: 500,
    minHeight: "80px",
    "& input[type=number]::-webkit-inner-spin-button": {
      appearance: "none",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      appearance: "none",
    },
  },
});

export const DialogWrapper = styled(Box)({
  fontFamily: "inherit",
  position: "relative",

  "& .dialog-inside": {
    height: "100%",
    width: "100%",
    position: "relative",
    backdropFilter: "blur(40px) !important",
  },
});

export const ButtonModal = styled(Button)({
  transition: "all 0.3s ease !important",
  background: "var(--main-popper-bg-color) !important",
  boxShadow: "0px 4px 4px var(--main-box-shadow-color) !important",
  height: "36px",
  borderRadius: "9999px !important",
  color: "var(--main-content-text-color) !important",
  width: 100,
  fontWeight: "bold",
  padding: "6px 16px",
  fontFamily: "inherit !important",
  fontSize: "16px",
  "&:hover": {
    filter: "brightness(1.2)",
    boxShadow: "0px 2px 2px var(--main-box-shadow-color) !important",
    transform: "translateY(1px)",
  },
  "&.Mui-disabled": {
    color: "rgba(0, 0, 0, 0.26) !important",
  },
});
