import CollectionsIcon from "@mui/icons-material/Collections";
import { CircularProgress, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import {
  MAX_SIZE_UPLOAD, SUPPORTED_IMAGES
} from "../../constants";
import { imageProcessToBase64String } from "../../utils";
import CustomTextField from "../CustomTextField";
import CustomTypography from "../CustomTypography";
import CustomDialog from "../Dialogs";
import DialogConfirm from "../Dialogs/Confirm";
import { ButtonModal } from "./styles";
interface ModalCreateOrEditCollectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  confirmMessage: string;
  data?: { name: string; description: string; coverImage: any };
  collectionId?: any;
}

const ModalCreateOrEditCollection = ({
  onClose,
  onSubmit,
  isOpen,
  title,
  confirmMessage,
  data = { name: "", description: "", coverImage: "" },
  collectionId,
}: ModalCreateOrEditCollectionProps) => {
  const [errorName, setErrorName] = useState("");
  const [errorDesc, setErrorDesc] = useState("");
  const [errorCoverFile, setErrorCoverFile] = useState("");
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [collectionName, setCollectionName] = useState(data?.name);
  const [description, setDescription] = useState(data?.description);
  const [coverFile, setCoverFile] = useState(data?.coverImage?.data);
  const coverFileBase64String = imageProcessToBase64String(coverFile);
  const [coverFileInfo, setCoverFileInfo] = useState<any>();
  const [shouldConfirmNavigation, setShouldConfirmNavigation] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const resetModal = () => {
    if (shouldConfirmNavigation) setShouldConfirmNavigation(false);
    setErrorName("");
    setErrorDesc("");
    setErrorCoverFile("");
    setIsCreating(false);
    setCollectionName("");
    setDescription("");
    setCoverFileInfo("");
  };

  const handleOnClose = () => {
    if (collectionName || description || coverFileInfo) {
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
    const errorNameMsg = collectionName.trim()
      ? collectionName.trim()?.length > 50
        ? "Maximum  length is 50 characters"
        : ""
      : "Collection name is required";
    const errorDescMsg =
      description.trim()?.length > 1000
        ? "Maximum  length is 1000 characters"
        : "";
    setErrorName(errorNameMsg);
    setErrorDesc(errorDescMsg);
    setErrorCoverFile(errorCoverFile);
    return errorNameMsg || errorCoverFile;
  };
  const handleCreateCollection = () => {
    setIsShowConfirm(false);
    setIsCreating(true);
    const formData = new FormData();
    formData.append("name", collectionName);
    if (coverFileInfo) {
      formData.append("coverImage", coverFileInfo);
    }
    formData.append("description", description);
    if (collectionId) {
      formData.append("id", collectionId);
    }
    onSubmit(formData);
  };
  const onCoverFileChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileSize = Number(file?.size);
    const fileType = file.type || file?.name?.split(".")?.slice(-1)[0];
    if (fileSize > MAX_SIZE_UPLOAD) {
      setCoverFileInfo(null);
      setErrorCoverFile("Max size of file is 5Mb");
    } else if (![...SUPPORTED_IMAGES].includes(fileType)) {
      setCoverFileInfo(null);
      setErrorCoverFile(
        "File format not supported! (Supported file formats: .png, .jpg, .jpeg)"
      );
    } else {
      setCoverFileInfo(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setCoverFile(Array.from(new Uint8Array(e.target?.result)));
      };
      reader.readAsArrayBuffer(file);
      setErrorCoverFile("");
    }
  };

  return (
    <>
      <CustomDialog
        isShow={isOpen}
        maxWidth="md"
        dialogIcon={
          <CollectionsIcon sx={{ color: "var(--main-content-text-color)" }} />
        }
        title={title}
        onClose={() => handleOnClose()}
        content={
          <Box component="div">
            <CustomTypography mb={1} fontWeight="700 !important">
              Collection name:
            </CustomTypography>
            <CustomTextField
              type="input"
              value={collectionName}
              variant="filled"
              fullWidth
              size="small"
              inputProps={{ maxLength: 50 }}
              onChange={(e) => setCollectionName(e.target.value)}
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
              inputProps={{ maxLength: 1000 }}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Box component="div" height="20px" my={1}>
              {errorDesc && (
                <CustomTypography
                  variant="caption"
                  color="error"
                  fontSize="12px !important"
                >
                  {errorDesc}
                </CustomTypography>
              )}
            </Box>

            <Box
              component="div"
              alignItems="center"
              display={{ xs: "block", sm: "flex" }}
              gap="16px"
            >
              <CustomTypography fontWeight="700 !important">
                Cover image:
              </CustomTypography>
              <Box
                component="div"
                display={{ xs: "flex", sm: "unset" }}
                mt={{ xs: 1, sm: 0 }}
                sx={{
                  "& :hover": {
                    color: "var(--main-title-color)",
                  },
                }}
                width="fit-content"
              >
                <input
                  type="file"
                  key={coverFileInfo}
                  id="upload-cover"
                  accept=".png, .jpeg, .jpg"
                  hidden={true}
                  onChange={onCoverFileChange}
                />
                <label htmlFor="upload-cover">
                  <Box
                    component="div"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap="4px"
                    sx={{ cursor: "pointer" }}
                  >
                    <CustomTypography variant="subtitle1">
                      {!coverFileBase64String
                        ? "Select file"
                        : "Select another file"}
                    </CustomTypography>
                  </Box>
                </label>
              </Box>
            </Box>
            {coverFileBase64String && (
              <Box
                component="div"
                mt={1}
                display="flex"
                justifyContent="center"
              >
                <Box component="div" width="100px">
                  <img
                    id="upload-image"
                    height="100px"
                    style={{
                      border: "4px solid var(--main-title-color)",
                      borderRadius: "4px",
                    }}
                    src={`data:image/jpeg;base64,${coverFileBase64String}`}
                    alt="media"
                  />
                </Box>
              </Box>
            )}
            <Box component="div" height="20px" mb={1}>
              {errorCoverFile && (
                <CustomTypography
                  variant="caption"
                  color="error"
                  fontSize="12px !important"
                >
                  {errorCoverFile}
                </CustomTypography>
              )}
            </Box>
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
                const formError = validateForm();
                if (!formError) setIsShowConfirm(true);
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
          onConfirm={handleCreateCollection}
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

export default ModalCreateOrEditCollection;
