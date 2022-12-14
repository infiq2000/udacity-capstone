import { InputBase } from "@mui/material";
import { styled } from "@mui/system";

const StyledInputBase = styled(InputBase)({
  "& .MuiInputBase-input": {
    background: "transparent !important",
    borderBottom: "1px solid var(--main-content-text-color)",
    color: "var(--main-content-text-color)",
    padding: "6px 6px",
  },
});
export default StyledInputBase;
