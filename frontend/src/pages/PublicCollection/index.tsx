import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Stack,
} from "@mui/material";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardItemSkeleton from "../../components/CardItemSkeleton";
import CollectionItem from "../../components/CollectionItem";
import CustomSelect from "../../components/CustomSelect";
import CustomTypography from "../../components/CustomTypography";
import Empty from "../../components/Empty";
import PaginationProduct from "../../components/PaginationProduct";
import PaginationProductSkeleton from "../../components/PaginationProductSkeleton";
import SearchInput from "../../components/SearchInput";
import { RootState } from "../../config/store";
import { API_URL, formDataHeaders } from "../../constants";
import { darkModeState } from "../../slice/darkModeSlice";
import { LoginState } from "../../slice/loginSlice";
const PublicCollection = () => {
  const isDarkMode = useSelector<RootState>(
    (state) => state.darkMode?.isDarkMode
  ) as darkModeState;
  const userData = useSelector<RootState>((state) => state.login) as LoginState;

  const [searchText, setSearchText] = useState<string>("");
  const [supportSearch, setSupportSearch] = useState("");
  const [order, setOrder] = useState("ASC");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const handleChangePage = (e: any, p: any) => {
    setPage(p);
  };
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `${API_URL}/collection/get-public-collections?page=${page}&limit=${PER_PAGE}&search=${supportSearch}&sort=${order}&userId=${userData?.userData.id}`,
      headers: {
        ...formDataHeaders,
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
    { useCache: false }
  );
  useEffect(() => {
    refetch();
  }, []);

  const collections = data?.data?.collections.rows || [];
  const count = Math.ceil(data?.data?.collections?.count / PER_PAGE) || 0;

  useEffect(() => {
    const handleSearchSupport = setTimeout(() => {
      setSupportSearch(searchText);
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
      <Container maxWidth="xl">
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
            Community Collection
          </Box>
          <Box
            component="div"
            width="100%"
            height="2px"
            className="right-line header-line"
          ></Box>
        </Stack>
        <Box
          component="div"
          display={{ xs: "block", sm: "flex" }}
          justifyContent="space-between"
        >
          <SearchInput
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Search"
          />
          <FormControl variant="standard">
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={{ xs: 3, sm: 0 }}
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
        </Box>
        <Grid container spacing={2} mt={2}>
          {loading ? (
            Array.from(Array(PER_PAGE).keys()).map((e, index) => {
              return (
                <CardItemSkeleton
                  responsive={{ xs: 12, sm: 12, smmd: 6, md: 6, lg: 4, xl: 4 }}
                  key={index}
                />
              );
            })
          ) : collections.length === 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} my={1}>
              <Empty title="No collection found!" />
            </Grid>
          ) : (
            collections.map((collection: any, index: any) => {
              return (
                <CollectionItem
                  onDeleteCollection={() => refetch()}
                  key={collection?.id}
                  collection={collection}
                  owner={{
                    avatar: collection?.avatar,
                    firstName: collection?.firstName,
                    lastName: collection?.lastName,
                  }}
                  isPublic={true}
                  yourAttitude={collection?.yourAttitude}
                />
              );
            })
          )}
        </Grid>
        <Box display="flex" justifyContent="center" mt={4} p={2}>
          {loading ? (
            <PaginationProductSkeleton />
          ) : collections.length !== 0 ? (
            <PaginationProduct
              page={page}
              count={count}
              onChange={handleChangePage}
            />
          ) : (
            <Box></Box>
          )}
        </Box>
      </Container>
    </>
  );
};
export default PublicCollection;
