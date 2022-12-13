import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Paper } from "@mui/material";
import { searchStyles } from "./styles";

interface SearchInputProps {
  value: string;
  onChange: (e: any) => void;
  placeholder: string;
}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <Paper sx={[searchStyles]}>
      <InputBase
        value={value}
        sx={{
          color: "var(--main-content-text-color)",
          fontFamily: "inherit",
          width: "100%",
        }}
        onChange={onChange}
        placeholder={placeholder}
      />
      <SearchIcon
        sx={{ color: "var(--main-content-text-color)", fontSize: "22px" }}
      />
    </Paper>
  );
};

export default SearchInput;
