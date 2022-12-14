import { Box, Grid, FormControl, MenuItem } from "@mui/material";
import useAxios from "axios-hooks";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import CardItem from "../../components/CardItem";
import CardItemSkeleton from "../../components/CardItemSkeleton";
import CustomTypography from "../../components/CustomTypography";
import Empty from "../../components/Empty";
import ModalAddPassageToCollection from "../../components/ModalAddPassageToCollection";
import PaginationProduct from "../../components/PaginationProduct";
import PaginationProductSkeleton from "../../components/PaginationProductSkeleton";
import SearchInput from "../../components/SearchInput";
import { API_URL, headers } from "../../constants";
import { imageProcessToBase64String } from "../../utils";
import PassageImage from "../../assets/images/passage.png";
import { RootState } from "../../config/store";
import { useSelector } from "react-redux";
import { darkModeState } from "../../slice/darkModeSlice";
import CustomSelect from "../../components/CustomSelect";
const PersonalCollectionDetail = () => {
  const isDarkMode = useSelector<RootState>(
    (state) => state.darkMode?.isDarkMode
  ) as darkModeState;
  const params = useParams();
  const id = params?.id;
  const PER_PAGE_MODAL = 2;
  const [searchTextModal, setSearchTextModal] = useState("");
  const [searchSupportModal, setSearchSupportModal] = useState("");
  const [orderModal, setOrderModal] = useState("ASC");
  const [pagePassageModal, setPagePassageModal] = useState(1);
  const [
    {
      data: dataPassageModal,
      loading: loadingPassageModal,
      error: errorPassageModal,
    },
    refetch,
  ] = useAxios({
    url: `${API_URL}/passage?page=${pagePassageModal}&limit=${PER_PAGE_MODAL}&search=${searchSupportModal}&sort=${orderModal}&collectionId=${id}`,
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  const [searchText, setSearchText] = useState("");
  const [selectedIdList, setSelectedIdList] = useState<number[]>([]);
  const handleCheckSelected = (e: any) => {
    const { value, checked } = e?.target;
    if (checked) {
      if (!selectedIdList?.includes(value))
        setSelectedIdList([...selectedIdList, parseInt(value)]);
    } else {
      setSelectedIdList(
        selectedIdList?.filter((e: number) => e !== parseInt(value))
      );
    }
  };
  const renderPassageModal = () => {
    const countPassageModal =
      Math.ceil(dataPassageModal?.data?.count / PER_PAGE_MODAL) || 0;
    const passagesModal = dataPassageModal?.data?.rows || [];
    const handleChangePagePassageModal = (e: any, p: any) => {
      setPagePassageModal(p);
    };
    if (errorPassageModal)
      return (
        <Box
          component="div"
          display="flex"
          justifyContent="center"
          my={4}
          px={4}
        >
          <Empty title="can not access to server!" />
        </Box>
      );
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box display="flex" justifyContent="center">
          <Grid container maxWidth="lg" spacing={4}>
            {loadingPassageModal ? (
              Array.from(Array(PER_PAGE_MODAL).keys()).map((e, index) => {
                return (
                  <CardItemSkeleton
                    key={index}
                    responsive={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}
                  />
                );
              })
            ) : passagesModal.length === 0 ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
                <Empty title="No passages found!" />
              </Grid>
            ) : (
              passagesModal.map((passage: any, index: any) => (
                <CardItem
                  item={{
                    id: passage.id,
                    name: passage.name,
                    isYourFavourite: passage.isYourFavourite,
                  }}
                  readURL={"/reading-passages"}
                  image={PassageImage}
                  updateFavouriteURL={`${API_URL}/user-favourite/add-favourite-passage`}
                  updateFavouriteData={{ passageId: passage?.id }}
                  responsive={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}
                  key={index}
                  isCheckBoxExist={true}
                  checkSelected={(e: any) => handleCheckSelected(e)}
                  selectedIdList={selectedIdList}
                />
              ))
            )}
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              display="flex"
              justifyContent="center"
            >
              {loadingPassageModal ? (
                <PaginationProductSkeleton />
              ) : passagesModal?.length === 0 ? (
                <></>
              ) : (
                <PaginationProduct
                  page={pagePassageModal}
                  count={countPassageModal}
                  onChange={handleChangePagePassageModal}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    );
  };
  const PER_PAGE_PASSAGE = 12;
  const [pagePassage, setPagePassage] = useState(1);
  const [searchSupport, setSearchSupport] = useState("");
  const [order, setOrder] = useState("ASC");
  const [
    {
      data: dataCollection,
      loading: loadingCollection,
      error: errorCollection,
    },
    refetchPassageModal,
  ] = useAxios({
    url: `${API_URL}/collection/get-collection?page=${pagePassage}&limit=${PER_PAGE_PASSAGE}&search=${searchSupport}&sort=${order}&id=${id}`,
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  const collection = dataCollection?.data?.collection;
  const owner = dataCollection?.data?.owner;
  const passagesOfCollection = dataCollection?.data?.passages?.rows || [];
  const countPassageOfCollection =
    Math.ceil(dataCollection?.data?.passages?.count / PER_PAGE_PASSAGE) || 0;
  const coverBase64String = imageProcessToBase64String(collection?.coverImage);
  const avatarBase64String = imageProcessToBase64String(owner?.avatar);
  const [isShowModalAddPassage, setIsShowModalAddPassage] = useState(false);

  const [{}, executeAddPassage] = useAxios(
    {
      method: "POST",
      url: `${API_URL}/collection/add-passages`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: { listPassageIds: selectedIdList, collectionId: id },
    },
    { manual: true }
  );
  const handleClickAdd = () => {
    executeAddPassage()
      .then((result) => result.data)
      .then((data) => {
        setSearchTextModal("");
        setSearchSupportModal("");
        setOrderModal("ASC");
        setSelectedIdList([]);
        setIsShowModalAddPassage(false);
        refetch();
      })
      .catch((err) => console.log(err));
  };
  const handleAddPassage = () => {
    refetchPassageModal();
    setIsShowModalAddPassage(true);
  };
  const handleChangePagePassage = (e: any, p: any) => {
    setPagePassage(p);
  };
  useEffect(() => {
    const handleSearchSupport = setTimeout(() => {
      setSearchSupport(searchText);
    }, 500);
    return () => clearTimeout(handleSearchSupport);
  }, [searchText]);
  useEffect(() => {
    const handleSearchSupport = setTimeout(() => {
      setSearchSupportModal(searchTextModal);
    }, 500);
    return () => clearTimeout(handleSearchSupport);
  }, [searchTextModal]);
  if (errorCollection)
    return (
      <Box component="div" display="flex" justifyContent="center" my={4} px={4}>
        <Empty title="can not access to server!" />
      </Box>
    );

  return (
    <>
      <Grid container mb={10}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} minHeight="100vh">
          <Box
            component="div"
            height={{ xs: "40vw", sm: "30vw", md: "20vw" }}
            borderBottom="2px solid var(--main-header-divider)"
          >
            <Box
              component="img"
              src={`data:image/jpeg;base64,${coverBase64String}`}
              alt="photo"
              height="100%"
              sx={{ objectFit: "cover" }}
            />
          </Box>
          <Grid container>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <Box
                component="div"
                height={{ xs: "35vw", sm: "25vw", md: "15vw" }}
                borderRadius="50%"
                display="flex"
                justifyContent={{ xs: "center", sm: "center", md: "right" }}
              >
                <Box
                  component="img"
                  src={`data:image/jpeg;base64,${avatarBase64String}`}
                  alt="photo"
                  height={{ xs: "35vw", sm: "25vw", md: "15vw" }}
                  width={{ xs: "35vw", sm: "25vw", md: "15vw" }}
                  style={{
                    objectFit: "fill",
                    borderRadius: "50%",
                    position: "relative",
                    top: "-50%",
                  }}
                  sx={{
                    background: "var(--main-bg-color)",
                    padding: "2px",
                  }}
                  display="flex"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} p={1}>
              <Box
                component="div"
                position={{ xs: "relative", md: "unset" }}
                top="-14vw"
              >
                <Box component="div" display="flex" justifyContent="left">
                  <CustomTypography
                    sx={{ color: "var(--main-title-color)" }}
                    padding={1}
                    paddingRight={{ md: 9 }}
                    textAlign="justify"
                    fontSize="20px !important"
                    fontWeight="700 !important"
                    textTransform="uppercase"
                  >
                    {collection?.name}
                  </CustomTypography>
                </Box>
                <Box component="div" display="flex" justifyContent="left">
                  <CustomTypography
                    sx={{
                      color: "var(--main-content-text-color)",
                    }}
                    padding={1}
                    paddingRight={{ md: 9 }}
                    textAlign="justify"
                    fontSize="14px !important"
                  >
                    <span style={{ fontStyle: "italic" }}>
                      Collection's description: {collection?.description}
                    </span>
                  </CustomTypography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              px={{ xs: 2, md: 10 }}
              position={{ xs: "relative", md: "unset", lg: "relative" }}
              top={{ xs: "-13vw", lg: "-6vw" }}
            >
              <Box display="flex" justifyContent="center" mt={4}>
                <Grid container maxWidth="lg" spacing={4}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                        >
                          <CustomTypography
                            color="var(--main-content-text-color)"
                            mr={2}
                          >
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
                                  backgroundColor: isDarkMode
                                    ? "#374359"
                                    : "#ffffff",
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
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Box
                        component="div"
                        display="flex"
                        justifyContent="flex-end"
                        mt={{ xs: 2, sm: 0 }}
                      >
                        <ButtonPrimary onClick={handleAddPassage}>
                          Add Passage
                        </ButtonPrimary>
                      </Box>
                    </Grid>
                  </Grid>
                  {loadingCollection ? (
                    Array.from(Array(PER_PAGE_PASSAGE).keys()).map(
                      (e, index) => {
                        return <CardItemSkeleton key={index} />;
                      }
                    )
                  ) : passagesOfCollection.length === 0 ? (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
                      <Empty title="Collection is empty!" />
                    </Grid>
                  ) : (
                    passagesOfCollection.map((passage: any, index: any) => (
                      <CardItem
                        item={{
                          id: passage.id,
                          name: passage.name,
                          isYourFavourite: passage.isYourFavourite,
                        }}
                        readURL={"/reading-passages"}
                        image={PassageImage}
                        updateFavouriteURL={`${API_URL}/user-favourite/add-favourite-passage`}
                        updateFavouriteData={{ passageId: passage?.id }}
                        key={index}
                      />
                    ))
                  )}
                </Grid>
              </Box>
              <Box display="flex" justifyContent="center" mt={4}>
                {loadingCollection ? (
                  <PaginationProductSkeleton />
                ) : passagesOfCollection.length === 0 ? (
                  <></>
                ) : (
                  <PaginationProduct
                    page={pagePassage}
                    count={countPassageOfCollection}
                    onChange={handleChangePagePassage}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ModalAddPassageToCollection
        title="Add Passage"
        isShow={isShowModalAddPassage}
        setShow={() => {
          setSelectedIdList([]);
          setPagePassageModal(1);
          setIsShowModalAddPassage(false);
        }}
        renderContent={renderPassageModal}
        onClickAdd={handleClickAdd}
        isShowButtonAdd={selectedIdList.length > 0}
        searchText={searchTextModal}
        setSearchText={(e: any) => setSearchTextModal(e.target.value)}
        order={orderModal}
        setOrder={setOrderModal}
      />
    </>
  );
};
export default PersonalCollectionDetail;
