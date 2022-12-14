import Stack from "@mui/material/Stack";
import CustomDialog from ".";
import { ButtonModal } from "./styles";
const DialogConfirm = ({
  onConfirm,
  onCancel,
  title,
  content,
  cancelText = "Cancel",
  okText = "Ok",
}: any) => {
  return (
    <CustomDialog
      title={title}
      content={content}
      action={
        <Stack direction="row" spacing={2}>
          <ButtonModal variant="contained" onClick={() => onCancel()}>
            {cancelText}
          </ButtonModal>
          <ButtonModal variant="contained" onClick={() => onConfirm()}>
            {okText}
          </ButtonModal>
        </Stack>
      }
      onClose={() => onCancel()}
    />
  );
};
export default DialogConfirm;
