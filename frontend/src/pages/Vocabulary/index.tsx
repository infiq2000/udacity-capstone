import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  MenuItem,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import axios from "axios";
import useAxios from "axios-hooks";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonTransparent from "../../components/ButtonTransparent";
import CustomSelect from "../../components/CustomSelect";
import CustomTypography from "../../components/CustomTypography";
import DialogMessage from "../../components/Dialogs/Message";
import ModalCreateOrEditVocabulary from "../../components/Dialogs/ModalCreateOrEditVocabulary";
import Empty from "../../components/Empty";
import PaginationProduct from "../../components/PaginationProduct";
import PaginationProductSkeleton from "../../components/PaginationProductSkeleton";
import SearchInput from "../../components/SearchInput";
import { RootState } from "../../config/store";
import { API_URL, formDataHeaders, headers } from "../../constants";
import { darkModeState } from "../../slice/darkModeSlice";
import DialogConfirm from "../../components/Dialogs/Confirm";
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
interface VocabularyProps {
  listInfo?: any;
}
const Vocabulary = ({ listInfo }: VocabularyProps) => {
  const isDarkMode = useSelector<RootState>(
    (state) => state.darkMode.isDarkMode
  ) as darkModeState;
  const params = useParams();
  const titleOfVocabulary = params.title;
  const listId = params.id;
  const [isShowModalAddVocabulary, setIsShowModalAddVocabulary] =
    useState(false);

  const [isShowDialogMessage, setIsShowDialogMessage] = useState(false);
  const [isShowModalEditVocabulary, setIsShowModalEditVocabulary] =
    useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const [searchText, setSearchText] = useState("");
  const [searchSupport, setSearchSupport] = useState("");
  const [order, setOrder] = useState("ASC");
  const [vocabulary, setVocabulary] = useState<any>({});
  const [message, setMessage] = useState("");
  const [isShowConfirmDeleteVocabulary, setIsShowConfirmDeleteVocabulary] =
    useState(false);
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `${API_URL}/vocabulary?page=${page}&limit=${PER_PAGE}&search=${searchSupport}&sort=${order}&id=${
        listInfo?.id ? listInfo?.id : listId
      }`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
    { useCache: false }
  );
  const vocabularies = data?.data?.vocabularies?.rows || [];

  const count = Math.ceil(data?.data?.vocabularies?.count / PER_PAGE) || 0;
  const handleSubmitForm = async (data: any) => {
    await axios
      .post(
        `${API_URL}/vocabulary/create`,
        { ...data, listId: listInfo?.id ? listInfo?.id : listId },
        {
          headers: {
            ...formDataHeaders,
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((result) => result.data)
      .then((data) => {
        if (data?.status === 200) {
          setIsShowModalAddVocabulary(false);
          setMessage("You have added a vocabulary to this list successfully!");
          setIsShowDialogMessage(true);
          refetch();
        }
      })
      .catch(() => {});
  };
  const handleSubmitEdit = async (data: any) => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/vocabulary/update`, data, {
        headers: {
          ...formDataHeaders,
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((result) => result.data)
      .then((data) => {
        if (data?.status === 200) {
          setIsShowModalEditVocabulary(false);
          setMessage("You edit a collection successfully!");
          setIsShowDialogMessage(true);
          refetch();
        }
      })
      .catch(() => {});
  };
  const [{}, execute] = useAxios(
    {
      method: "DELETE",
      url: `${API_URL}/vocabulary/delete`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        id: vocabulary?.id,
      },
    },
    {
      manual: true,
    }
  );

  const handleDeleteVocabulary = () => {
    setIsShowConfirmDeleteVocabulary(false);
    execute()
      .then((result) => result.data)
      .then((data) => {
        if (data?.status === 200) {
          setMessage(data?.message);
          setIsShowDialogMessage(true);
          refetch();
        }
      })
      .catch((error) => {
        setMessage("Can not delete vocabulary at the moment, try again later!");
        setIsShowDialogMessage(true);
        refetch();
      });
  };
  const handleChangePage = (e: any, p: any) => {
    setPage(p);
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
          {titleOfVocabulary ? titleOfVocabulary : listInfo?.name}
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
              onChange={(e: any) => setSearchText(e?.target?.value)}
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
            <Box
              component="div"
              display="flex"
              justifyContent="flex-end"
              mb={2}
            >
              <ButtonPrimary onClick={() => setIsShowModalAddVocabulary(true)}>
                New Vocabulary
              </ButtonPrimary>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
            <TableContainer component={StyledPaper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      sx={{ color: "var(--main-title-color) !important" }}
                    >
                      Word
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ color: "var(--main-title-color) !important" }}
                    >
                      Type
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ color: "var(--main-title-color) !important" }}
                    >
                      Meaning
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ color: "var(--main-title-color) !important" }}
                    >
                      Example
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ color: "var(--main-title-color) !important" }}
                    >
                      Functions
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
                  ) : vocabularies?.length === 0 ? (
                    <TableRow>
                      <StyledTableCell colSpan={5} component="th" scope="row">
                        <Box component="div" p={4}>
                          <Empty title="No vocabulary found!" />
                        </Box>
                      </StyledTableCell>
                    </TableRow>
                  ) : (
                    vocabularies.map((vocabulary: any, index: any) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell component="th" scope="row">
                            {vocabulary?.word}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {vocabulary?.type}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {vocabulary?.meaning}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {vocabulary?.example}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <ButtonTransparent
                              sx={{
                                border: "none !important",
                              }}
                              startIcon={
                                <EditIcon
                                  fontSize="large"
                                  sx={{
                                    color: "var(--main-content-text-color)",
                                  }}
                                />
                              }
                              onClick={() => {
                                setVocabulary(vocabulary);
                                setIsShowModalEditVocabulary(true);
                              }}
                            >
                              Edit
                            </ButtonTransparent>
                            <ButtonTransparent
                              sx={{
                                border: "none !important",
                              }}
                              startIcon={
                                <DeleteIcon
                                  fontSize="large"
                                  sx={{
                                    color: "var(--main-content-text-color)",
                                  }}
                                />
                              }
                              onClick={() => {
                                setVocabulary(vocabulary);
                                setIsShowConfirmDeleteVocabulary(true);
                              }}
                            >
                              Delete
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
        ) : vocabularies?.length === 0 ? (
          ""
        ) : (
          <PaginationProduct
            page={page}
            count={count}
            onChange={handleChangePage}
          />
        )}
      </Box>
      {isShowModalAddVocabulary && (
        <ModalCreateOrEditVocabulary
          isOpen={true}
          title="Create Vocabulary"
          confirmMessage="Are you sure you want to create this vocabulary!"
          onSubmit={(data: any) => handleSubmitForm(data)}
          onClose={() => setIsShowModalAddVocabulary(false)}
        />
      )}
      {isShowModalEditVocabulary && (
        <ModalCreateOrEditVocabulary
          data={vocabulary}
          isOpen={true}
          title="Edit Vocabulary"
          confirmMessage="Are you sure you want to edit this vocabulary!"
          onSubmit={(data: any) => {
            handleSubmitEdit(data);
          }}
          onClose={() => setIsShowModalEditVocabulary(false)}
        />
      )}
      {isShowConfirmDeleteVocabulary && (
        <DialogConfirm
          title="Delete Collection Confirmation"
          onConfirm={handleDeleteVocabulary}
          onCancel={() => setIsShowConfirmDeleteVocabulary(false)}
          content="Are you sure that you want to delete this collection!"
        />
      )}
      {isShowDialogMessage && (
        <DialogMessage
          title="Notification"
          content={message}
          onOk={() => {
            setIsShowDialogMessage(false);
          }}
        />
      )}
    </>
  );
};
export default Vocabulary;
