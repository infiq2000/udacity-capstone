import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

interface CardInstructionProps {
  item?: any;
  responsive?: {
    xs: number;
    sm: number;
    smmd: number;
    md: number;
    lg: number;
    xl: number;
  };
}
const CardInstruction = ({
  item,
  responsive = { xs: 12, sm: 12, smmd: 6, md: 6, lg: 3, xl: 3 },
}: CardInstructionProps) => {
  const handleClickItem = (type: string) => {};
  return (
    <Grid
      item
      xs={responsive.xs}
      sm={responsive.sm}
      smmd={responsive.smmd}
      md={responsive.md}
      lg={responsive.lg}
      xl={responsive.xl}
      onClick={() => {
        handleClickItem(item?.link);
      }}
    >
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        position="relative"
        bottom="-30px"
      >
        {item?.image}
      </Box>
      <Box
        component="div"
        className="border-instruction"
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "var(--main-popper-bg-color)",
          height: "300px",
        }}
      >
        <Box component="div" display="inline-block" mt={6}>
          <Box component="div" px={2} pb={2}>
            <Box
              component="p"
              fontSize="16px"
              fontWeight="700"
              textAlign="center"
              sx={{ color: "var(--main-title-color)" }}
            >
              {item?.title}
            </Box>
            <Box
              component="p"
              fontSize="15px"
              fontWeight="500"
              textAlign="center"
              mt={1}
              sx={{
                wordBreak: "break-word",
                color: "var(--main-content-text-color)",
              }}
            >
              {item?.description}
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default CardInstruction;
