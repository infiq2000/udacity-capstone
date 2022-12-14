import { Box, Skeleton, Stack } from "@mui/material";

const PaginationProductSkeleton = () => {
  return (
    <Stack direction="row" justifyContent="center" flexWrap="wrap">
      <Skeleton
        className="skeleton-bgr"
        style={{ margin: "8px", borderRadius: "999px" }}
        variant="rectangular"
        width={40}
        height={40}
      />
      <Box component="div" display="flex" alignItems="center" my={1}>
        <Skeleton
          className="skeleton-bgr"
          style={{ borderRadius: "999px" }}
          variant="rectangular"
          width={150}
          height={40}
        />
      </Box>
      <Skeleton
        className="skeleton-bgr"
        style={{ margin: "8px", borderRadius: "999px" }}
        variant="rectangular"
        width={40}
        height={40}
      />
    </Stack>
  );
};
export default PaginationProductSkeleton;
