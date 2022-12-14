import { Box, FormControl, Grid, MenuItem, Stack } from "@mui/material";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TestImage from "../../assets/images/test.png";
import CardItem from "../../components/CardItem";
import CardItemSkeleton from "../../components/CardItemSkeleton";
import CustomSelect from "../../components/CustomSelect";
import CustomTypography from "../../components/CustomTypography";
import Empty from "../../components/Empty";
import PaginationProduct from "../../components/PaginationProduct";
import PaginationProductSkeleton from "../../components/PaginationProductSkeleton";
import SearchInput from "../../components/SearchInput";
import { RootState } from "../../config/store";
import { API_URL, headers } from "../../constants";
import { darkModeState } from "../../slice/darkModeSlice";
const ReadingTests = () => {
  const isDarkMode = useSelector<RootState>(
    (state) => state.darkMode.isDarkMode
  ) as darkModeState;
  const [searchText, setSearchText] = useState("");
  const [searchSupport, setSearchSupport] = useState("");
  const [order, setOrder] = useState("ASC");
  const PER_PAGE = 12;
  const [page, setPage] = useState(1);
  const handleChangePage = (e: any, p: any) => {
    setPage(p);
  };
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `${API_URL}/reading-test?page=${page}&limit=${PER_PAGE}&search=${searchSupport}&sort=${order}`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
    { useCache: false }
  );
  useEffect(() => {
    refetch();
  }, []);
  const count = Math.ceil(data?.data?.count / PER_PAGE) || 0;
  const tests = data?.data?.rows || [];
  const handleSearchChange = (e: any) => {
    setSearchText(e);
  };

  useEffect(() => {
    const handleSearchSupport = setTimeout(() => {
      setSearchSupport(searchText);
    }, 500);
    return () => clearTimeout(handleSearchSupport);
  }, [searchText]);
  if (error)
    return (
      <Box component="div" display="flex" justifyContent="center" my={4} px={4}>
        <Empty title="can not access to server!" />
      </Box>
    );
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
          IELTS READING TESTS
        </Box>
        <Box
          component="div"
          width="100%"
          height="2px"
          className="right-line header-line"
        ></Box>
      </Stack>
      <Box display="flex" justifyContent="center">
        <Grid container maxWidth="lg" spacing={4}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            display="flex"
            justifyContent="space-between"
          >
            <SearchInput
              value={searchText}
              onChange={(e: any) => handleSearchChange(e?.target?.value)}
              placeholder="Search"
            />
            <FormControl variant="standard">
              <Box
                component="div"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CustomTypography color="var(--main-content-text-color)" mr={2}>
                  Sort by name:
                </CustomTypography>
                <CustomSelect
                  id="name-sort"
                  value={order}
                  onChange={(e: any) => {
                    setOrder(e.target.value);
                  }}
                  displayEmpty
                  disableUnderline
                  MenuProps={{
                    sx: {
                      "& .MuiMenu-list": {
                        backgroundColor: isDarkMode ? "#374359" : "#ffffff",
                        color: isDarkMode ? "#eeeeee" : "152238",
                        border: isDarkMode
                          ? "1px solid #eeeeee"
                          : "1px solid #152238",
                        borderRadius: "4px",
                      },
                    },
                  }}
                >
                  <MenuItem value={"ASC"}>A &#8594; Z</MenuItem>
                  <MenuItem value={"DESC"}>Z &#8594; A</MenuItem>
                </CustomSelect>
              </Box>
            </FormControl>
          </Grid>
          {loading ? (
            Array.from(Array(PER_PAGE).keys()).map((e, index) => {
              return <CardItemSkeleton key={index} />;
            })
          ) : tests.length === 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
              <Empty title="No test found!" />
            </Grid>
          ) : (
            tests.map((test: any, index: any) => (
              <CardItem
                item={{
                  id: test.id,
                  name: test.name,
                  isYourFavourite: test.isYourFavourite,
                }}
                image={TestImage}
                updateFavouriteURL={`${API_URL}/user-favourite/add-favourite-reading-test`}
                updateFavouriteData={{ readingTestId: test?.id }}
                readURL={"/reading-tests"}
                key={index}
              />
            ))
          )}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={4} p={2}>
        {loading ? (
          <PaginationProductSkeleton />
        ) : tests.length === 0 ? (
          <></>
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
export default ReadingTests;
