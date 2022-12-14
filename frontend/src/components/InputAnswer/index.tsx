import StyledInputBase from "./style";
interface InputAnswerProps {
  placeholder: string;
  onChange: any;
  value: any;
}
const InputAnswer = ({ placeholder, onChange, value }: InputAnswerProps) => {
  return (
    <StyledInputBase
      placeholder={placeholder}
      sx={{ mt: "8px", width: "100%" }}
      value={value}
      onChange={onChange}
    />
  );
};
export default InputAnswer;
