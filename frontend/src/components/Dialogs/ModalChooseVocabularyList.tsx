import { Box, Grid, Stack, CircularProgress } from "@mui/material";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import CustomDialog from ".";
import { API_URL, formDataHeaders } from "../../constants";
import CardItemSkeleton from "../CardItemSkeleton";
import CustomTextField from "../CustomTextField";
import CustomTypography from "../CustomTypography";
import Empty from "../Empty";
import PaginationProduct from "../PaginationProduct";
import PaginationProductSkeleton from "../PaginationProductSkeleton";
import SearchInput from "../SearchInput";
import VocabularyListItem from "../VocabListItem";
import DialogConfirm from "./Confirm";
import { ButtonModal } from "./styles";
interface ModalChooseVocabularyListProps {
  onClose: any;
  onSubmit: any;
  vocab: string;
  passageId?: any;
  readingTestId?: any;
}
const ModalChooseVocabularyList = ({
  onClose,
  onSubmit,
  vocab,
  passageId,
  readingTestId,
}: ModalChooseVocabularyListProps) => {
  const [step, setStep] = useState(1);
  const [selectedListId, setSelectedListId] = useState<number>();
  const [searchText, setSearchText] = useState<string>("");
  const [searchSupport, setSearchSupport] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 2;
  const handleChangePage = (e: any, p: any) => {
    setPage(p);
  };
  const [{ data, loading, error }, refetch] = useAxios({
    url: `${API_URL}/vocabulary-list?page=${page}&limit=${PER_PAGE}&search=${searchSupport}&sort=${"ASC"}&passageId=${passageId}&readingTestId=${readingTestId}`,
    headers: {
      ...formDataHeaders,
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  const vocabLists = data?.data?.vocabularyLists?.rows || [];
  const count = Math.ceil(data?.data?.vocabularyLists?.count / PER_PAGE) || 0;
  const [word, setWord] = useState(vocab || "");
  const [errorWord, setErrorWord] = useState("");
  const [type, setType] = useState("");
  const [meaning, setMeaning] = useState("");
  const [errorMeaning, setErrorMeaning] = useState("");
  const [example, setExample] = useState("");
  const [shouldConfirmNavigation, setShouldConfirmNavigation] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const resetModal = () => {
    if (shouldConfirmNavigation) setShouldConfirmNavigation(false);
    setErrorWord("");
    setErrorMeaning("");
    setWord("");
    setType("");
    setMeaning("");
    setExample("");
    setIsCreating(false);
  };

  const handleOnClose = () => {
    if (word || type || meaning || example) {
      setShouldConfirmNavigation(true);
    } else {
      resetModal();
      setStep(1);
    }
  };

  const validateForm = () => {
    if (word.trim().length === 0) {
      setErrorWord("Word is required to create new vocabulary!");
      return false;
    }
    if (meaning.trim().length === 0) {
      setErrorMeaning("Meaning is required to create new vocabulary!");
      return false;
    }
    return true;
  };
  const handleCreateNewVocabulary = () => {
    setIsShowConfirm(false);
    setIsCreating(true);
    onSubmit({ word, meaning, type, example, listId: selectedListId });
  };
  const handleSelectList = (selectedId: any) => {
    setSelectedListId(selectedId);
    setStep(2);
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
      <CustomDialog
        title="Vocabulary"
        onClose={onClose}
        content={
          <>
            {step === 1 && (
              <Box component="div">
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
                <Box component="div" justifyContent="center">
                  <SearchInput
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                    placeholder="Search"
                  />
                </Box>
                <Grid container spacing={2} mt={2}>
                  {loading ? (
                    Array.from(Array(PER_PAGE).keys()).map((e, index) => {
                      return (
                        <CardItemSkeleton
                          responsive={{
                            xs: 12,
                            sm: 12,
                            smmd: 6,
                            md: 6,
                            lg: 6,
                            xl: 6,
                          }}
                          key={index}
                        />
                      );
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
                          isForSelection={true}
                          onSelect={(id: any) => handleSelectList(id)}
                          responsive={{
                            xs: 12,
                            sm: 12,
                            smmd: 6,
                            md: 6,
                            lg: 6,
                            xl: 6,
                          }}
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
              </Box>
            )}
            {step === 2 && (
              <Box component="div">
                <CustomTypography fontWeight="700 !important">
                  Word:
                </CustomTypography>
                <CustomTextField
                  type="input"
                  value={word}
                  variant="filled"
                  fullWidth
                  size="small"
                  inputProps={{ maxLength: 50 }}
                  onChange={(e) => setWord(e.target.value)}
                  autoFocus
                />
                {errorWord && (
                  <Box component="div" height="20px" my={1}>
                    <CustomTypography
                      variant="caption"
                      color="error"
                      fontSize="12px !important"
                    >
                      {errorWord}
                    </CustomTypography>
                  </Box>
                )}
                <CustomTypography my={1} fontWeight="700 !important">
                  Type:
                </CustomTypography>
                <CustomTextField
                  type="input"
                  value={type}
                  variant="filled"
                  fullWidth
                  size="small"
                  inputProps={{ maxLength: 50 }}
                  onChange={(e) => setType(e.target.value)}
                  autoFocus
                />
                <CustomTypography my={1} fontWeight="700 !important">
                  Meaning:
                </CustomTypography>
                <CustomTextField
                  type="input"
                  value={meaning}
                  variant="filled"
                  fullWidth
                  size="small"
                  inputProps={{ maxLength: 250 }}
                  onChange={(e) => setMeaning(e.target.value)}
                  autoFocus
                />
                {errorMeaning && (
                  <Box component="div" height="20px" my={1}>
                    <CustomTypography
                      variant="caption"
                      color="error"
                      fontSize="12px !important"
                    >
                      {errorMeaning}
                    </CustomTypography>
                  </Box>
                )}
                <CustomTypography my={1} fontWeight="700 !important">
                  Example:
                </CustomTypography>
                <CustomTextField
                  type="input"
                  value={example}
                  variant="filled"
                  fullWidth
                  size="small"
                  multiline
                  minRows={5}
                  maxRows={5}
                  inputProps={{ maxLength: 1000 }}
                  onChange={(e) => setExample(e.target.value)}
                />
              </Box>
            )}
          </>
        }
        action={
          <>
            {step === 2 && (
              <Stack direction="row" spacing={2}>
                <ButtonModal
                  disabled={isCreating}
                  variant="contained"
                  onClick={() => handleOnClose()}
                >
                  Cancel
                </ButtonModal>
                <ButtonModal
                  disabled={isCreating}
                  variant="contained"
                  onClick={() => {
                    if (validateForm()) setIsShowConfirm(true);
                  }}
                >
                  {isCreating && (
                    <CircularProgress
                      size={20}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-10px",
                        marginLeft: "-10px",
                        color: "#fff",
                      }}
                    />
                  )}
                  Ok
                </ButtonModal>
              </Stack>
            )}
          </>
        }
      />
      {shouldConfirmNavigation && (
        <DialogConfirm
          onConfirm={() => {
            resetModal();
            onClose();
          }}
          onCancel={() => setShouldConfirmNavigation(false)}
          title="Confirm"
          content={
            <>
              Changes you made may not be saved, are you sure you want to leave?
            </>
          }
          cancelText="No"
          okText="Yes"
        />
      )}
      {isShowConfirm && (
        <DialogConfirm
          onConfirm={handleCreateNewVocabulary}
          onCancel={() => setIsShowConfirm(false)}
          title="Confirm"
          content="Are you sure you want to create this vocabulary!"
          cancelText="No"
          okText="Yes"
        />
      )}
    </>
  );
};
export default ModalChooseVocabularyList;
