import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ButtonPrimary = styled(Button)({
  color: "var(--main-content-text-color)",
  cursor: "pointer",
  background: "var(--main-popper-bg-color)",
  borderRadius: "9999px",
  padding: "6px 20px",
  fontWeight: 700,
  fontSize: '16px',
  letterSpacing: "0.05em",
  transition: "all 0.3s ease, filter 0.2s ease",
  fontFamily: "inherit",
  boxShadow: "0px 5px 2px var(--main-box-shadow-color)",
  border: "none !important",
  "&:active": {
    background: "var(--main-footer-bg-color) !important",
  },
  "&:disabled": {
    color: "var(--main-content-text-color)",
    opacity: "0.4",
  },
  "&:hover": {
    boxShadow: "0px 2px 2px var(--main-box-shadow-color)",
    transform: "translateY(2px)",
    filter: "brightness(1.2)",
  },
});
export default ButtonPrimary;
