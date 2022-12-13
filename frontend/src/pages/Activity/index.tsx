import {
  Stack,
  Box,
  Grid,
  TableContainer,
  TableHead,
  Table,
  Paper,
  TableCell,
  TableRow,
  TableBody,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/system";
import useAxios from "axios-hooks";
import ButtonTransparent from "../../components/ButtonTransparent";
import Empty from "../../components/Empty";
import PaginationProduct from "../../components/PaginationProduct";
import PaginationProductSkeleton from "../../components/PaginationProductSkeleton";
import { API_URL, headers } from "../../constants";
import { useState } from "react";
const StyledPaper = styled(Paper)({
  background: "transparent !important",
  boxShadow: "1px 1px 3px var(--main-content-text-color) !important",
});
const StyledTableCell = styled(TableCell)({
  color: "var(--main-content-text-color) !important",
  fontSize: "16px",
  fontWeight: "700",
  fontFamily: "inherit !important",
});

const Activity = () => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `${API_URL}/activity?page=${page}&limit=${PER_PAGE}`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
    { useCache: false }
  );
  const activities = data?.data?.activities?.rows || [];
  const count = Math.ceil(data?.data?.activities?.count / PER_PAGE) || 0;
  const handleChangePage = (e: any, p: any) => {
    setPage(p);
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="nowrap"
        m={3}
        alignItems="center"
        gap={2}
      >
        <Box
          component="div"
          width="100%"
          height="2px"
          className="left-line header-line"
        ></Box>
        <Box
          component="span"
          className="text-heading text-heading-animation"
          whiteSpace="nowrap"
        >
          Your Activity
        </Box>
        <Box
          component="div"
          width="100%"
          height="2px"
          className="right-line header-line"
        ></Box>
      </Stack>
      <Box component="div" p={2}>
        <Grid container p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
            <TableContainer component={StyledPaper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      sx={{ color: "var(--main-title-color) !important" }}
                    >
                      Activity ID
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ color: "var(--main-title-color) !important" }}
                    >
                      Passage/Reading Test ID
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ color: "var(--main-title-color) !important" }}
                    >
                      Number Of Questions
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ color: "var(--main-title-color) !important" }}
                    >
                      Number Correct Answers
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ color: "var(--main-title-color) !important" }}
                    >
                      Created At
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ color: "var(--main-title-color) !important" }}
                    >
                      Detail
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    Array.from(Array(PER_PAGE).keys()).map((e, index) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell component="th" scope="row">
                            <Skeleton
                              variant="rounded"
                              width="100%"
                              height={60}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Skeleton
                              variant="rounded"
                              width="100%"
                              height={60}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Skeleton
                              variant="rounded"
                              width="100%"
                              height={60}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Skeleton
                              variant="rounded"
                              width="100%"
                              height={60}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Skeleton
                              variant="rounded"
                              width="100%"
                              height={60}
                            />
                          </StyledTableCell>
                        </TableRow>
                      );
                    })
                  ) : activities?.length === 0 ? (
                    <TableRow>
                      <StyledTableCell colSpan={5} component="th" scope="row">
                        <Box component="div" p={4}>
                          <Empty title="No vocabulary found!" />
                        </Box>
                      </StyledTableCell>
                    </TableRow>
                  ) : (
                    activities.map((activity: any, index: any) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell component="th" scope="row">
                            {activity?.id}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {activity?.readingTestId || activity?.passageId}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {activity?.numOfAnswers}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {activity?.numOfCorrectAnswers}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {activity?.createdAt}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <ButtonTransparent
                              sx={{
                                border: "none !important",
                              }}
                              onClick={() => {}}
                            >
                              View
                            </ButtonTransparent>
                          </StyledTableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={4} p={2}>
        {loading ? (
          <PaginationProductSkeleton />
        ) : activities?.length === 0 ? (
          ""
        ) : (
          <PaginationProduct
            page={page}
            count={count}
            onChange={handleChangePage}
          />
        )}
      </Box>
    </>
  );
};
export default Activity;
