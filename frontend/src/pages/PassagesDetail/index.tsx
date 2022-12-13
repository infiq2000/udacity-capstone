import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { Box, Grid, Popover, Skeleton, Stack } from "@mui/material";
import axios from "axios";
import useAxios from "axios-hooks";
import { useState } from "react";
import Countdown from "react-countdown";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AnswerSheet from "../../components/AnswerSheet";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonTransparent from "../../components/ButtonTransparent";
import DialogMessage from "../../components/Dialogs/Message";
import ModalChooseVocabularyList from "../../components/Dialogs/ModalChooseVocabularyList";
import ModalCreateOrEditVocabularyList from "../../components/Dialogs/ModalCreateOrEditVocabularyList";
import Empty from "../../components/Empty";
import { API_URL, formDataHeaders, headers } from "../../constants";
import Vocabulary from "../Vocabulary";
const PassageDetail = () => {
  const params = useParams();
  const id = params?.id;
  const isExam = params?.isTest === "true" ? true : false;
  const [time, setTime] = useState(12000);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [{ data, loading, error }, refetch] = useAxios({
    url: `${API_URL}/passage/${id}`,
    headers: headers,
  });
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [positionX, setPositionX] = useState<number>(window.innerWidth / 2);
  const [positionY, setPositionY] = useState<number>(window.innerHeight / 2);
  const [isShowModalNewVocabularyList, setIsShowModalNewVocabularyList] =
    useState(false);
  const [message, setMessage] = useState("");
  const [isShowDialogMessage, setIsShowDialogMessage] = useState(false);
  const [isShowModalAddVocabulary, setIsShowModalAddVocabulary] =
    useState(false);
  const [
    isShowDialogMessageForSubmitAnswers,
    setIsShowDialogMessageForSubmitAnswers,
  ] = useState(false);
  const Passage = data?.data?.content || [];
  const VocabularyLists = data?.data?.VocabularyLists || [];
  const answers = data?.data?.answers || "";
  const arrAns = answers.split("---") || [];
  const getSelectedText = (e: any) => {
    const text = document.getSelection()?.toString() || "";
    setSelectedText(text);
    setIsOpenMenu(true);
    setPositionX(e.clientX);
    setPositionY(e.clientY);
  };
  const handleCopyText = () => {
    navigator.clipboard.writeText(selectedText);
    setIsOpenMenu(false);
    toast(
      <Box component="div">
        <CheckCircleIcon />
        <Box
          component="div"
          display="inline-block"
          position="relative"
          top="-5px"
          left="10px"
        >
          Copied
        </Box>
      </Box>,
      {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      }
    );
  };
  const handleAddVocab = () => {
    setIsOpenMenu(false);
    setIsShowModalAddVocabulary(true);
  };
  const handleOxfordDic = () => {
    setIsOpenMenu(false);
    window.open(
      `https://www.oxfordlearnersdictionaries.com/definition/english/${selectedText}`
    );
  };
  const handleCambridgeDic = () => {
    setIsOpenMenu(false);
    window.open(
      `https://dictionary.cambridge.org/dictionary/english/${selectedText}`
    );
  };
  const handleGoogleTranslate = () => {
    setIsOpenMenu(false);
    navigator.clipboard.writeText(selectedText).then(() => {
      window.open(`https://translate.google.com/`);
    });
  };
  const handleSubmitNewVocab = async (data: any) => {
    await axios
      .post(
        `${API_URL}/vocabulary/create`,
        {
          ...data,
        },
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
  const handleSubmit = async (data: any) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/vocabulary-list/create?passageId=${id}`,
        data,
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
          setIsShowModalNewVocabularyList(false);
          setMessage("You created a vocabulary list successfully!");
          setIsShowDialogMessage(true);
          refetch();
        }
      })
      .catch(() => {});
  };
  const [{}, execute] = useAxios(
    {
      method: "POST",
      url: `${API_URL}/activity/submit-passage-answers`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
    {
      manual: true,
    }
  );
  const handleSubmitAnswerSheet = (answersInput: any) => {
    execute({ data: { passageId: id, userAnswers: answersInput } })
      .then((res) => res.data)
      .then((data) => {
        if (data?.status === 200) {
          if (isTimeOut) {
            setMessage(
              `Time out for test, systen has submitted your answers, result: ${data?.correctAnswers}/${data?.totalAnswers}, view your result in your activity!`
            );
            setIsShowDialogMessageForSubmitAnswers(true);
          } else {
            setMessage(
              `Your answers has submitted, result: ${data?.correctAnswers}/${data?.totalAnswers}, view your result in your activity!`
            );
            setIsShowDialogMessageForSubmitAnswers(true);
          }
        }
      })
      .catch((err) => console.log(err));
  };
  if (error)
    return (
      <Box component="div" display="flex" justifyContent="center" my={4} px={4}>
        <Empty title="can not access to server!" />
      </Box>
    );
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
              YOUR TEST
            </Box>
            <Box
              component="div"
              width="100%"
              height="2px"
              className="right-line header-line"
            ></Box>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          display="flex"
          justifyContent={isExam ? "space-between" : "flex-end"}
          alignItems="center"
          px={{ xs: 1, sm: 3, md: 5 }}
          pb={{ xs: 3, sm: 0 }}
        >
          {isExam && (
            <Countdown
              className="count-down"
              date={Date.now() + time}
              onComplete={() => {
                document.getElementById("btn-submit-p-ans")?.click();
                setTime(0);
                setIsTimeOut(true);
              }}
            />
          )}
          <ButtonPrimary onClick={() => setIsShowModalNewVocabularyList(true)}>
            Add Vocabulary List
          </ButtonPrimary>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={3}
          xl={3}
          p={{ xs: 1, sm: 3, md: 5 }}
        >
          {isExam && (
            <AnswerSheet
              onSubmit={handleSubmitAnswerSheet}
              numOfAnswer={arrAns.length}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={isExam ? 8 : 12}
          lg={isExam ? 9 : 12}
          xl={isExam ? 9 : 12}
          p={{ xs: 1, sm: 3, md: 5 }}
        >
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100vh"
              sx={{ borderRadius: "20px" }}
            />
          ) : (
            <Box
              component="div"
              className="main-box-shadow main-border"
              sx={{
                color: "var(--main-content-text-color)",
                padding: 3,
                lineHeight: "200%",
              }}
              dangerouslySetInnerHTML={{
                __html: Passage.toString(),
              }}
              onMouseUp={getSelectedText}
            ></Box>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} px={{ md: 2 }}>
          {VocabularyLists.map((vocabulary: any) => {
            return <Vocabulary key={vocabulary?.id} listInfo={vocabulary} />;
          })}
        </Grid>
      </Grid>
      <Popover
        sx={{
          "& .MuiPaper-root": {
            background: "var(--main-popper-bg-color)",
            borderRadius: "20px",
          },
        }}
        disablePortal
        open={isOpenMenu}
        onClose={() => setIsOpenMenu(false)}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: positionY + 20,
          left: positionX - 140,
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Stack direction="column" spacing={1} padding={1}>
          <ButtonTransparent
            startIcon={<ContentCopyIcon />}
            onClick={handleCopyText}
          >
            Copy Text
          </ButtonTransparent>
          <ButtonTransparent
            startIcon={<AddToPhotosOutlinedIcon />}
            onClick={handleAddVocab}
          >
            Add Vocabulary
          </ButtonTransparent>
          <ButtonTransparent
            startIcon={<LanguageOutlinedIcon />}
            onClick={handleOxfordDic}
          >
            Oxford Dictionary
          </ButtonTransparent>
          <ButtonTransparent
            startIcon={<LanguageOutlinedIcon />}
            onClick={handleCambridgeDic}
          >
            Cambridge Dictionary
          </ButtonTransparent>
          <ButtonTransparent
            startIcon={<LanguageOutlinedIcon />}
            onClick={handleGoogleTranslate}
          >
            Copy - Google Translate
          </ButtonTransparent>
        </Stack>
      </Popover>

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
          content={message}
          onOk={() => {
            setIsShowDialogMessage(false);
          }}
        />
      )}
      {isShowDialogMessageForSubmitAnswers && (
        <DialogMessage
          title="Notification"
          content={message}
          onOk={() => {
            setIsShowDialogMessageForSubmitAnswers(false);
            navigate("/");
          }}
        />
      )}
      {isShowModalAddVocabulary && (
        <ModalChooseVocabularyList
          onSubmit={(data: any) => {
            handleSubmitNewVocab(data);
          }}
          vocab={selectedText}
          passageId={id}
          onClose={() => setIsShowModalAddVocabulary(false)}
        />
      )}
    </>
  );
};
export default PassageDetail;
