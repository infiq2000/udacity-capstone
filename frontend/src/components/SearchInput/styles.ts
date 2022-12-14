export const searchStyles = {
  width: {
    xs: "100% !important",
    sm: "250px !important",
    md: "350px !important",
  },
  fontFamily: "inherit",
  display: "flex",
  alignItems: "center !important",
  background: "transparent !important",
  border: "none",
  padding: "6px 16px !important",
  boxShadow: "0.1px 0.1px 10px var(--main-box-shadow-color)",
  borderRadius: "9999px !important",

  input: {
    "&::-webkit-input-placeholder": {
      color: "var(--heading-main-color)",
      opacity: "0.8",
      fontSize: "16px !important",
    },
  },
  "&:hover": { boxShadow: "0.1px 0.1px 20px var(--main-box-shadow-color)" },
};
