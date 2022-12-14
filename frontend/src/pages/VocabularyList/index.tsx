import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Stack,
} from "@mui/material";
import axios from "axios";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonPrimary from "../../components/ButtonPrimary";
import CardItemSkeleton from "../../components/CardItemSkeleton";
import CustomSelect from "../../components/CustomSelect";
import CustomTypography from "../../components/CustomTypography";
import DialogMessage from "../../components/Dialogs/Message";
import ModalCreateOrEditVocabularyList from "../../components/Dialogs/ModalCreateOrEditVocabularyList";
import Empty from "../../components/Empty";
import PaginationProduct from "../../components/PaginationProduct";
import PaginationProductSkeleton from "../../components/PaginationProductSkeleton";
import SearchInput from "../../components/SearchInput";
import VocabularyListItem from "../../components/VocabListItem";
import { RootState } from "../../config/store";
import { API_URL, formDataHeaders } from "../../constants";
import { darkModeState } from "../../slice/darkModeSlice";
const VocabularyList = () => {
  const isDarkMode = useSelector<RootState>(
    (state) => state.darkMode.isDarkMode
  ) as darkModeState;

  const [searchText, setSearchText] = useState<string>("");
  const [searchSupport, setSearchSupport] = useState("");
  const [order, setOrder] = useState("ASC");
  const [isShowModalNewVocabularyList, setIsShowModalNewVocabularyList] =
    useState<boolean>(false);
  const [messageCreateVocabList, setMessageCreateVocabList] = useState("");
  const [isShowDialogMessage, setIsShowDialogMessage] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;
  const handleChangePage = (e: any, p: any) => {
    setPage(p);
  };
  const [{ data, loading, error }, refetch] = useAxios({
    url: `${API_URL}/vocabulary-list?page=${page}&limit=${PER_PAGE}&search=${searchSupport}&sort=${order}`,
    headers: {
      ...formDataHeaders,
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  const vocabLists = data?.data?.vocabularyLists?.rows || [];
  const count = Math.ceil(data?.data?.vocabularyLists?.count / PER_PAGE) || 0;
  const handleSubmit = async (data: any) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/vocabulary-list/create`, data, {
        headers: {
          ...formDataHeaders,
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((result) => result.data)
      .then((data) => {
        if (data?.status === 200) {
          setIsShowModalNewVocabularyList(false);
          setMessageCreateVocabList(
            "You created a vocabulary list successfully!"
          );
          setIsShowDialogMessage(true);
          refetch();
        }
      })
      .catch(() => {});
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
            Vocabulary Lists
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
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            display="flex"
            justifyContent="flex-end"
          >
            <Box component="div" display="flex" justifyContent="flex-end">
              <ButtonPrimary
                onClick={() => setIsShowModalNewVocabularyList(true)}
              >
                New List
              </ButtonPrimary>
            </Box>
          </Grid>
          {loading ? (
            Array.from(Array(PER_PAGE).keys()).map((e, index) => {
              return <CardItemSkeleton key={index} />;
            })
          ) : vocabLists.length === 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} my={1}>
              <Empty title="No vocabulary list found!" />
            </Grid>
          ) : (
            vocabLists.map((vocabList: any, index: any) => {
              return (
                <VocabularyListItem
                  key={index}
                  name={vocabList?.name}
                  description={vocabList?.description}
                  id={vocabList?.id}
                  onDelete={() => refetch()}
                />
              );
            })
          )}
        </Grid>
        <Box display="flex" justifyContent="center" mt={4} p={2}>
          {loading ? (
            <PaginationProductSkeleton />
          ) : vocabLists.length !== 0 ? (
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
      {isShowModalNewVocabularyList && (
        <ModalCreateOrEditVocabularyList
          isOpen={true}
          onSubmit={(data: {}) => handleSubmit(data)}
          confirmMessage="Are you sure you want to create this vocabulary list?"
          title="CREATE LIST"
          onClose={() => setIsShowModalNewVocabularyList(false)}
        />
      )}

      {isShowDialogMessage && (
        <DialogMessage
          title="Notification"
          content={messageCreateVocabList}
          onOk={() => {
            setIsShowDialogMessage(false);
          }}
        />
      )}
    </>
  );
};
export default VocabularyList;
