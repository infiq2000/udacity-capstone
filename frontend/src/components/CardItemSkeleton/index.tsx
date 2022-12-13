import { Grid, Skeleton } from "@mui/material";

interface CardItemSkeletonProps {
  responsive?: {
    xs?: number;
    sm?: number;
    smmd?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}
const CardItemSkeleton = ({
  responsive = { xs: 12, sm: 6, smmd: 6, md: 4, lg: 4, xl: 3 },
}: CardItemSkeletonProps) => {
  return (
    <Grid
      item
      xs={responsive.xs}
      sm={responsive.sm}
      smmd={responsive.smmd}
      md={responsive.md}
      lg={responsive.lg}
      xl={responsive.xl}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height="200px"
        sx={{ mb: 2 }}
      />
      <Skeleton variant="rectangular" width="100%" height="32px" />
    </Grid>
  );
};
export default CardItemSkeleton;
