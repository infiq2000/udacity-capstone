import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ButtonBoxShadow = styled(Button)({
  padding: "6px 30px",
  backgroundColor: "var(--main-footer-bg-color)",
  boxShadow: "2px 2px 20px var(--main-box-shadow-color)",
  borderRadius: "9999px",
  fontWeight: "900",
  fontFamily: "inherit",
  fontSize: "24px",
  color: "var(--main-content-text-color)",
  transition: "transform 0.5s",
  "&:hover": {
    filter: "brightness(1.1)",
    background: "var(--main-popper-bg-color)",
    boxShadow: "4px 4px 40px var(--main-box-shadow-color)",
    transform: "scale(1.05)",
  },
});
export default ButtonBoxShadow;
