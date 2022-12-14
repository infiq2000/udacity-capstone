import { Button, Menu, Switch } from "@mui/material";
import { styled } from "@mui/system";

export const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    backgroundColor: "var(--main-popper-bg-color) !important",
    color: "var(--main-content-text-color) !important",
  },
});

export const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: "inherit",
  color: "var(--main-content-text-color)",
  textTransform: "capitalize",
  borderRadius: 59,
  background: "transparent",
  fontSize: 16,
  lineHeight: "18px",
  fontWeight: 700,
  padding: "{ sm: '8px', lg: '6px 20px' }",
  height: 32,
  border: 0,
  "@media (max-width: 1200px)": {
    fontSize: "12px",
  },
  transition: "box-shadow 0.3s ease, filter 0.3s ease",

  "&:hover": {
    border: "none",
    color: "var(--main-chosen-color)",
  },
  "&.active": {
    color: "var(--main-chosen-color)",
    boxShadow: "2px 2px 2px var(--main-box-shadow-color)",
  },
}));

export const DarkLightSwitch = styled(Switch)(({ theme }) => ({
  width: 54,
  height: 24,
  padding: 0,
  "& .MuiSwitch-input": {
    left: "-34px !important",
    width: "84px !important",
  },
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 4,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(30px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "transparent",
        opacity: 1,
        border: "2px solid #eeeeee",
        height: 24,
        "&:before": {
          opacity: 1,
        },
        "&:after": {
          opacity: 0,
        },
      },

      "& .MuiSwitch-thumb": {
        color: "#eeeeee",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16,
    height: 16,
    color: "#152238",
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "transparent",
    opacity: 1,
    border: "2px solid #152238",
    height: 24,
    transition: "all .5s",
    fontSize: 11,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-40%)",
      width: 18,
      height: 18,
    },
    "&:before": {
      content: '"on"',
      fontWeight: "700",
      color: "var(--main-content-text-color)",
      left: 6,
      opacity: 0,
    },
    "&:after": {
      content: '"off"',
      fontWeight: "700",
      color: "var(--main-content-text-color)",
      right: 3,
      opacity: 1,
    },
  },
}));
