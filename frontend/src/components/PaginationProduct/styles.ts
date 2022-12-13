import { Pagination } from "@mui/material";
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
export const ButtonPagination = styled(IconButton)({
  "&.disabled": {
    opacity: 0.7,
  },
  transition: "filter 0.2s ease",
  "&:hover": {
    filter: "brightness(1.4)",
  },
});
export const CustomPagination = styled(Pagination)({
  "& .MuiButtonBase-root": {
    color: "var(--main-content-text-color)",
  },
  "& .MuiPagination-ul": {
    padding: "5px 2px !important",
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    backgroundColor: "var(--main-popper-bg-color)",
  },
});
