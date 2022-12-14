import Box from "@mui/material/Box";
import Empty from "../../components/Empty";
const NotFound = () => {
  return (
    <Box component="div" display="flex" justifyContent="center" my={4} px={4}>
      <Empty title="404 PAGE NOT FOUND" />
    </Box>
  );
};
export default NotFound;
