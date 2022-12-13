import { Box } from "@mui/material";
import { ReactComponent as ImageEmpty } from "../../assets/icons/empty.svg";
interface EmptyProps {
  title?: string;
}
const Empty = ({ title = "SOMETHING INTERESTING IS COMMING!" }: EmptyProps) => {
  return (
    <Box
      className="main-border"
      display="block"
      textAlign="center"
      alignItems="center"
      p={{ xs: 2, sm: 4, md: 8 }}
    >
      <ImageEmpty style={{ height: 100 }} />
      <Box
        component="p"
        fontSize={20}
        fontWeight={700}
        style={{
          textTransform: "uppercase",
          color: "var(--main-title-color)",
        }}
        mt={2}
      >
        {title}
      </Box>
    </Box>
  );
};
export default Empty;
