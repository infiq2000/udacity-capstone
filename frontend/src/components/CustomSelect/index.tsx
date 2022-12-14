import { styled } from "@mui/system";
import { Select } from "@mui/material";
const CustomSelect = styled(Select)({
  fontFamily: "inherit !important",
  fontWeight: "500",
  minWidth: "70px",
  color: "var(--main-content-text-color)",
  ".MuiSvgIcon-root": {
    color: "var(--main-content-text-color)",
  },
  "& .MuiSelect-select.MuiInputBase-input.MuiInput-input:focus": {
    background: "transparent !important",
  },
});
export default CustomSelect;
