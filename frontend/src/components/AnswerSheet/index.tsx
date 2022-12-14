import { Box, Grid } from "@mui/material";
import { useState } from "react";
import ButtonPrimary from "../ButtonPrimary";
import DialogConfirm from "../Dialogs/Confirm";
import InputAnswer from "../InputAnswer";

interface AnswerSheetProps {
  numOfAnswer: number;
  onSubmit: any;
}
const AnswerSheet = ({ numOfAnswer, onSubmit }: AnswerSheetProps) => {
  const [answersInput, setAnswersInput] = useState<number[]>(
    new Array(40).fill("")
  );
  const [isShowDialogConfirm, setIsShowDialogConfirm] = useState(false);
  const handleChange = (e: any, index: any) => {
    const newArr = [...answersInput];
    newArr[index] = e.target.value;
    setAnswersInput(newArr);
  };

  return (
    <>
      <Grid
        container
        className="main-box-shadow main-border"
        sx={{ padding: "16px" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          display="flex"
          justifyContent="center"
        >
          <Box
            component="div"
            sx={{
              width: "100%",

              color: "var(--main-content-text-color)",
              fontWeight: "700",
              fontFamily: "inherit",
              fontSize: "16px",
              textTransform: "uppercase",
            }}
            textAlign="center"
          >
            Your Answer Sheet
          </Box>
        </Grid>
        {Array.from(Array(numOfAnswer).keys()).map((e, index) => {
          return (
            <Grid
              key={index}
              item
              xs={6}
              sm={4}
              md={12}
              lg={12}
              xl={12}
              px={{ xs: 1, md: 0 }}
            >
              <InputAnswer
                placeholder={`Question ${index + 1}:`}
                value={answersInput[index]}
                onChange={(e: any) => handleChange(e, index)}
              />
            </Grid>
          );
        })}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          display="flex"
          justifyContent="center"
          mt={4}
          mb={2}
        >
          <ButtonPrimary
            id="btn-submit-p-ans"
            onClick={() => setIsShowDialogConfirm(true)}
          >
            Submit
          </ButtonPrimary>
        </Grid>
      </Grid>
      {isShowDialogConfirm && (
        <DialogConfirm
          onConfirm={() => {
            onSubmit(answersInput);
            setIsShowDialogConfirm(false);
          }}
          onCancel={() => setIsShowDialogConfirm(false)}
          title="Confirm"
          content={<>Are you sure you want to submit your answers!</>}
          cancelText="No"
          okText="Yes"
        />
      )}
    </>
  );
};
export default AnswerSheet;
