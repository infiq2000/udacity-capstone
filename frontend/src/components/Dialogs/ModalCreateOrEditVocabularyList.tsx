import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { CircularProgress, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { MESSAGE_ERRORS } from "../../constants";
import CustomTextField from "../CustomTextField";
import CustomTypography from "../CustomTypography";
import CustomDialog from "../Dialogs";
import DialogConfirm from "../Dialogs/Confirm";
import { ButtonModal } from "./styles";
interface ModalCreateOrEditVocabularyListProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  confirmMessage: string;
  data?: any;
}

const ModalCreateOrEditVocabularyList = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  confirmMessage,
  data,
}: ModalCreateOrEditVocabularyListProps) => {
  const [vocabListName, setVocabListName] = useState(data?.name || "");
  const [errorName, setErrorName] = useState("");
  const [description, setDescription] = useState(data?.description || "");
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [shouldConfirmNavigation, setShouldConfirmNavigation] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const resetModal = () => {
    if (shouldConfirmNavigation) setShouldConfirmNavigation(false);
    setErrorName("");
    setIsCreating(false);
    setVocabListName("");
    setDescription("");
  };

  const handleOnClose = () => {
    if (vocabListName || description) {
      setShouldConfirmNavigation(true);
    } else {
      resetModal();
      onClose();
    }
  };

  const onCloseShouldConfirmNavigation = () => {
    setShouldConfirmNavigation(false);
  };

  const onCloseConfirm = () => {
    setIsShowConfirm(false);
  };

  const validateForm = () => {
    if (!vocabListName) {
      setErrorName("Collection name is required");
      return false;
    }
    return true;
  };
  const handleCreateVocabularyList = () => {
    setIsShowConfirm(false);
    setIsCreating(true);
    if (data?.id) {
      onSubmit({ name: vocabListName, description: description, id: data?.id });
    } else {
      onSubmit({ name: vocabListName, description: description });
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
            <CustomTypography mb={1} fontWeight="700 !important">
              Vocabulary List Name:
            </CustomTypography>
            <CustomTextField
              type="input"
              value={vocabListName}
              variant="filled"
              fullWidth
              size="small"
              inputProps={{ maxLength: 50 }}
              onChange={(e) => setVocabListName(e.target.value)}
              autoFocus
            />
            <Box component="div" height="20px" my={1}>
              {errorName && (
                <CustomTypography
                  variant="caption"
                  color="error"
                  fontSize="12px !important"
                >
                  {errorName}
                </CustomTypography>
              )}
            </Box>
            <CustomTypography mb={1} fontWeight="700 !important">
              Description:
            </CustomTypography>
            <CustomTextField
              type="input"
              value={description}
              variant="filled"
              fullWidth
              size="small"
              multiline
              minRows={5}
              maxRows={5}
              inputProps={{ maxLength: 500 }}
              onChange={(e) => setDescription(e.target.value)}
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
          onCancel={onCloseShouldConfirmNavigation}
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
          onConfirm={handleCreateVocabularyList}
          onCancel={onCloseConfirm}
          title="Confirm"
          content={<>{confirmMessage}</>}
          cancelText="No"
          okText="Yes"
        />
      )}
    </>
  );
};

export default ModalCreateOrEditVocabularyList;
