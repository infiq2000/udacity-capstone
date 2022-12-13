import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ButtonTransparent = styled(Button)({
  borderRadius: "9999px !important",
  padding: "6px 20px",
  fontWeight: "700",
  fontFamily: "inherit",
  color: "var(--main-content-text-color) !important",
  border: "1px solid var(--main-content-text-color) !important",
  "&:hover": {
    filter: "brightness(1.5)",
  },
});
export default ButtonTransparent;
