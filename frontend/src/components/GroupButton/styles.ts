import { Box } from "@mui/material";
import { styled } from "@mui/system";
export const StyledButton = styled(Box)({
  color: "var(--main-content-text-color)",
  padding: "6px 10px",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: "16px",
  fontWeight: "700",
  transition: "color 0.5s",
  ":hover": {},
  "&:active": {},
});
export const active = {
  borderBottom: "3px solid",
  borderColor: "var(--main-chosen-color)",
  color: "var(--main-chosen-color)",
};
