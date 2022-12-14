import PublicIcon from "@mui/icons-material/Public";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import CustomTextField from "../../components/CustomTextField";
import CustomTypography from "../../components/CustomTypography";
import DialogMessage from "../../components/Dialogs/Message";
import { headers } from "../../constants";
import { loginSuccess } from "../../slice/loginSlice";
interface LoginProps {
  setUserData: any;
}
const Login = ({ setUserData }: LoginProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [isShowDialogMessage, setIsShowDialogMessage] = useState(false);
  const dispatch = useDispatch();
  const validateForm = () => {
    if (email.trim().length === 0) {
      setErrEmail("Email is required!");
      return false;
    }
    if (password.trim().length === 0) {
      setErrPassword("Password is required!");
      return false;
    }
    return true;
  };
  const handleClickLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/login`,
          { email, password },
          {
            headers: headers,
          }
        );
        if (response?.data.status === 200) {
          dispatch(
            loginSuccess({
              userData: response?.data?.userData,
              accessToken: response?.data?.token,
            })
          );
          setUserData(response?.data?.userData);
          navigate("/");
        } else if (response?.data.status === 403) {
          setIsShowDialogMessage(true);
        }
      } catch (error) {
        console.log("error:", error);
      }
    }
  };
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={4} lg={3} xl={3}>
          <Box
            component="div"
            width="calc(300px + 100vw/20)"
            className="main-border main-box-shadow"
            sx={{
              background: "var(--main-bg-color)",
            }}
            p={{ xs: "32px 0px", sm: "32px 8px" }}
          >
            <Box component="div" display="flex" justifyContent="center">
              <Box
                component="div"
                sx={{
                  width: "70px",
                  height: "70px",
                  border: "2px solid var(--main-content-text-color)",
                  borderRadius: "50%",
                  padding: "16px",
                  background: "var(--main-footer-bg-color)",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                <Box
                  component="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  position="relative"
                  top="50%"
                  left="50%"
                  sx={{ transform: "translate(-50%,-50%)" }}
                >
                  <PublicIcon
                    sx={{ color: "var(--main-content-text-color)" }}
                    fontSize="small"
                  />
                  <Box component="div" ml="2px">
                    <Typography
                      fontWeight="900"
                      fontSize="15px"
                      color="var(--main-content-text-color)"
                      lineHeight="1"
                      letterSpacing="2px"
                    >
                      Leo
                    </Typography>
                    <Typography
                      fontWeight="700"
                      fontSize="5px"
                      color="var(--main-content-text-color)"
                      letterSpacing="2px"
                    >
                      Make Learning Fun
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box component="div" m={1} display="flex" justifyContent="center">
              <CustomTypography
                color="var(--main-content-text-color)"
                fontSize="24px !important"
                fontWeight="900 !important"
              >
                SIGN IN
              </CustomTypography>
            </Box>
            <Box component="div" px={4} mb={3}>
              <Box component="form" noValidate autoComplete="off">
                <Box component="div" p={1}>
                  <CustomTextField
                    id="email"
                    label="Email"
                    variant="standard"
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                    value={email}
                    onChange={(e) => {
                      setErrEmail("");
                      setEmail(e.target.value);
                    }}
                  />
                  {errEmail && (
                    <Typography variant="caption" color="error">
                      {errEmail}
                    </Typography>
                  )}
                </Box>
                <Box component="div" p={1}>
                  <CustomTextField
                    id="password"
                    label="Password"
                    variant="standard"
                    inputProps={{ maxLength: 15 }}
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => {
                      setErrPassword("");
                      setPassword(e.target.value);
                    }}
                  />
                  {errPassword && (
                    <Typography variant="caption" color="error">
                      {errPassword}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              sx={{ paddingX: 5 }}
              mb={2}
            >
              <ButtonPrimary fullWidth onClick={handleClickLogin}>
                Log In
              </ButtonPrimary>
            </Box>
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              sx={{ paddingX: 5 }}
              alignItems="center"
            >
              <Typography
                fontSize={14}
                color="var(--main-content-text-color)"
                sx={{ opacity: "0.7" }}
              >
                Don't have an account?
              </Typography>
              <Box component="div" onClick={() => navigate("/register")}>
                <Typography
                  fontSize={14}
                  ml={1}
                  color="var(--main-title-color)"
                  sx={{
                    opacity: "0.7",
                    "&:hover": {
                      cursor: "pointer",
                      opacity: "0.8",
                    },
                    "&:active": {
                      opacity: "1",
                    },
                  }}
                >
                  Create
                </Typography>
              </Box>
            </Box>
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              sx={{ paddingX: 5 }}
              alignItems="center"
            >
              <Typography
                fontSize={14}
                color="var(--main-content-text-color)"
                sx={{ opacity: "0.7" }}
              >
                Don't remember password?
              </Typography>
              <Box component="div" onClick={() => {}}>
                <Typography
                  fontSize={14}
                  ml={1}
                  color="var(--main-title-color)"
                  sx={{
                    opacity: "0.7",
                    "&:hover": {
                      cursor: "pointer",
                      opacity: "0.8",
                    },
                    "&:active": {
                      opacity: "1",
                    },
                  }}
                >
                  Reset
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {isShowDialogMessage === true && (
        <DialogMessage
          title="Notification"
          content="Email and password does not match!"
          onOk={() => setIsShowDialogMessage(false)}
          okText="Ok"
        />
      )}
    </>
  );
};
export default Login;
