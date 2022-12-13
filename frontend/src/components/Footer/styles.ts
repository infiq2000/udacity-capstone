import { Link } from "@mui/material";
import { styled } from "@mui/system";

export const footerTitle = {
  "&.MuiTypography-root": {
    color: "var(--main-content-text-color)",
    fontWeight: "700 !important",
    fontSize: "24px",
    lineHeight: "33px",
    marginBottom: "20px",
    "@media (max-width: 899.95px)": {
      textAlign: "center",
    },
  },
};
export const footerContainer = {
  margin: "0",
  padding: "0",
  "@media (max-width: 599.95px)": {
    minHeight: "260px",
  },
};

export const socialLinkWrapper = {
  justifyContent: { xs: "center", md: "flex-end" },
  gap: "18px",
  "@media (max-width: 440px)": {
    gap: "10px",
  },
  "@media (max-width: 350px)": {
    gap: "5px",
  },
};

export const SocialLink = styled(Link)({
  background: "var(--main-footer-bg-color)",
  border: "none",
  borderRadius: "50%",
  minWidth: 0,
  padding: 8,
  width: "47px !important",
  height: "47px !important",
  boxShadow: "2px 2px 20px var(--main-box-shadow-color)",
  transition: "transform 0.5s",
  "&:hover": {
    background: "transparent",
    transform: "scale(1.05)",
    boxShadow: "4px 4px 40px var(--main-box-shadow-color)",
    "& .MuiSvgIcon-root, & img": {
      filter: "drop-shadow( 0px 0px 4px rgba(255, 255, 255, .7))",
    },
  },
});
