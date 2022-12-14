import { Stack } from "@mui/material";
import { active, StyledButton } from "./styles";
interface GroupButtonProps {
  buttonList: {
    title: string;
    isActive: boolean;
    onClick: () => void;
  }[];
}
const GroupButton = ({ buttonList }: GroupButtonProps) => {
  return (
    <Stack direction="row" spacing={2}>
      {buttonList.map((button: any, index: any) => {
        return (
          <StyledButton
            key={index}
            sx={button?.isActive ? active : {}}
            onClick={button?.onClick}
          >
            {button?.title}
          </StyledButton>
        );
      })}
    </Stack>
  );
};
export default GroupButton;
