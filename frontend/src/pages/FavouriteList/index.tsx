import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Container, FormControl, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonTransparent from "../../components/ButtonTransparent";
import CardItem from "../../components/CardItem";
import CardItemSkeleton from "../../components/CardItemSkeleton";
import CustomSelect from "../../components/CustomSelect";
import CustomTypography from "../../components/CustomTypography";
import Empty from "../../components/Empty";
import GroupButton from "../../components/GroupButton";
import PaginationProduct from "../../components/PaginationProduct";
import PaginationProductSkeleton from "../../components/PaginationProductSkeleton";
import SearchInput from "../../components/SearchInput";
import { RootState } from "../../config/store";
import { API_URL, headers } from "../../constants";
import { darkModeState } from "../../slice/darkModeSlice";
import PassageImage from "../../assets/images/passage.png";
import TestImage from "../../assets/images/test.png";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const FavouriteList = () => {
  const isDarkMode = useSelector<RootState>(
    (state) => state.darkMode?.isDarkMode
  ) as darkModeState;
  const PER_PAGE = 12;
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const [listType, setListType] = useState(
    location.pathname.includes("/favourite-list/reading-tests")
      ? "Tests"
      : "Passages"
  );
  const [searchText, setSearchText] = useState("");
  const [searchSupport, setSearchSupport] = useState("");
  const [order, setOrder] = useState("ASC");
  const updateStr =
    listType === "Tests"
      ? "add-favourite-reading-test"
      : "add-favourite-passage";
  const apiURL =
    listType === "Tests"
      ? `${API_URL}/user-favourite/all-favourite-reading-tests?page=${page}&limit=${PER_PAGE}&search=${searchSupport}&sort=${order}`
      : `${API_URL}/user-favourite/all-favourite-passages?page=${page}&limit=${PER_PAGE}&search=${searchSupport}&sort=${order}`;
  const [{ data, loading, error }, refetch] = useAxios({
    url: apiURL,
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  const passages = data?.data?.rows;
  const count = Math.ceil(data?.data?.count / PER_PAGE) || 0;
  const handleChangePage = (e: any, p: any) => {
    setPage(p);
  };
  useEffect(() => {
    refetch();
  }, [listType]);
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
    <Box component="div" mt={3.75} pb={3.75}>
      <Container maxWidth="lg">
        <Box
          display={{ xs: "inline-block", sm: "flex" }}
          justifyContent="space-between"
          component="div"
          alignItems="center"
          fontSize={{ xs: 18, sm: 24 }}
          mb={3}
          fontWeight={900}
        >
          <Box component="div" display="flex" gap={2} alignItems="center">
            <ButtonTransparent
              size="small"
              startIcon={<ArrowBackIosNewIcon />}
              onClick={() => {}}
            >
              Back
            </ButtonTransparent>
            <Box
              component="p"
              sx={{ color: "var(--main-content-text-color)" }}
              fontSize={{ xs: 18, sm: 24 }}
              fontWeight={900}
            >
              Favourite List
            </Box>
          </Box>
          <Box component="div" mt={{ xs: 4, sm: 0 }}></Box>
        </Box>
        <Grid container mt={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            mb={4}
            display="flex"
            justifyContent="center"
          >
            <GroupButton
              buttonList={[
                {
                  title: "Tests",
                  isActive: listType === "Tests",
                  onClick: () => {
                    setListType("Tests");
                    setPage(1);
                    navigate(`/favourite-list/reading-tests`);
                  },
                },
                {
                  title: "Passages",
                  isActive: listType === "Passages",
                  onClick: () => {
                    setListType("Passages");
                    setPage(1);
                    navigate(`/favourite-list/reading-passages`);
                  },
                },
                // {
                //   title: "Collections",
                //   isActive: listType === "Collections",
                //   onClick: () => {
                //     setListType("Collections");
                //     setPage(1);
                //   },
                // },
              ]}
            />
          </Grid>
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
            <Grid container justifyContent="stretch" spacing={2.5} mt={2}>
              {Array.from(Array(PER_PAGE).keys()).map((e, index) => {
                return <CardItemSkeleton key={index} />;
              })}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} my={1}>
                <PaginationProductSkeleton />
              </Grid>
            </Grid>
          ) : passages?.length === 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
              <Empty title="Your favourite list is empty!" />
            </Grid>
          ) : (
            <Grid container justifyContent="stretch" spacing={2.5} mt={2}>
              {passages?.map((item: any) => (
                <CardItem
                  key={item.id}
                  item={{ ...item, isYourFavourite: true }}
                  image={listType === "Tests" ? TestImage : PassageImage}
                  updateFavouriteURL={`${API_URL}/user-favourite/${updateStr}`}
                  updateFavouriteData={
                    listType === "Tests"
                      ? { readingTestId: item?.id }
                      : { passageId: item?.id }
                  }
                  readURL={
                    listType === "Tests"
                      ? "/reading-tests"
                      : "/reading-passages"
                  }
                />
              ))}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} my={1}>
                <Grid container>
                  <PaginationProduct
                    page={page}
                    count={count}
                    onChange={handleChangePage}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};
export default FavouriteList;
