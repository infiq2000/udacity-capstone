import CustomDialog from ".";
import { ButtonModal } from "./styles";
const DialogMessage = ({ onOk, title, content, okText = "Ok" }: any) => {
  return (
    <CustomDialog
      title={title}
      content={content}
      action={
        <ButtonModal variant="contained" onClick={() => onOk()}>
          {okText}
        </ButtonModal>
      }
      onClose={() => onOk()}
    />
  );
};
export default DialogMessage;
