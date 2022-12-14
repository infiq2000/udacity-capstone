import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { CircularProgress, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import CustomDialog from ".";
import CustomTextField from "../CustomTextField";
import CustomTypography from "../CustomTypography";
import DialogConfirm from "./Confirm";
import { ButtonModal } from "./styles";
interface ModalCreateOrEditVocabularyProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  confirmMessage: string;
  data?: any;
}

const ModalCreateOrEditVocabulary = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  confirmMessage,
  data,
}: ModalCreateOrEditVocabularyProps) => {
  const [word, setWord] = useState(data?.word || "");
  const [errorWord, setErrorWord] = useState("");
  const [type, setType] = useState(data?.type || "");
  const [meaning, setMeaning] = useState(data?.meaning || "");
  const [errorMeaning, setErrorMeaning] = useState("");
  const [example, setExample] = useState(data?.example || "");
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
      onClose();
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
    if (data?.id) {
      onSubmit({ word, meaning, type, example, id: data?.id });
    } else {
      onSubmit({ word, meaning, type, example });
    }
  };
  return (
    <>
      <CustomDialog
        isShow={isOpen}
        maxWidth="md"
        dialogIcon={
          <FormatListBulletedIcon
            sx={{ color: "var(--main-content-text-color)" }}
          />
        }
        title={title}
        onClose={() => handleOnClose()}
        content={
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
        }
        action={
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
          content={<>{confirmMessage}</>}
          cancelText="No"
          okText="Yes"
        />
      )}
    </>
  );
};

export default ModalCreateOrEditVocabulary;
