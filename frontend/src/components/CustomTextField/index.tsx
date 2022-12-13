import { styled } from "@mui/system";
import { TextField } from "@mui/material";
const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "var(--main-content-text-color)",
    fontFamily: "inherit",
    fontWeight: "500",
    fontSize: "16px",
  },
  "& .MuiFormLabel-root": {
    color: "var(--main-content-text-color)",
    fontFamily: "inherit",
    fontWeight: "500",
    fontSize: "16px",
    "& :hover": {
      borderBottomColor: "var(--main-content-text-color)",
    },
  },
  "& .MuiInputBase-input": {
    color: "var(--main-content-text-color)",
    fontFamily: "inherit",
    fontWeight: "500",
    fontSize: "16px",
  },
  "& ::before": {
    borderBottomColor: "var(--main-content-text-color) !important",
  },
  "& ::after": {
    borderBottomColor: "var(--main-content-text-color) !important",
  },
  "& .MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled):before": {
    borderBottomColor: "var(--main-content-text-color) ",
    fontFamily: "inherit",
    fontWeight: "500",
    fontSize: "16px",
  },
});

export default CustomTextField;
