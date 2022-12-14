import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import CustomSelect from "../../components/CustomSelect";
import CustomTextField from "../../components/CustomTextField";
import CustomTypography from "../../components/CustomTypography";
import DialogMessage from "../../components/Dialogs/Message";
import { headers } from "../../constants";
const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errFirstName, setErrFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errPhoneNumber, setErrPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("" || null);
  const [errAvatar, setErrAvatar] = useState("");
  const [gender, setGender] = useState("1");
  const [contentDialogMessage, setContentDialogMessage] = useState("");
  const [isShowDialogMessage, setIsShowDialogMessage] = useState(false);
  const avatarRefUrl = useRef("");
  const validateForm = () => {
    if (firstName.trim().length === 0) {
      setErrFirstName("First name is required!");
      return false;
    }
    if (lastName.trim().length === 0) {
      setErrLastName("Last name is required!");
      return false;
    }
    if (email.trim().length === 0) {
      setErrEmail("Email is required!");
      return false;
    }
    if (password.trim().length === 0) {
      setErrPassword("Password is required!");
      return false;
    }
    if (confirmPassword.trim().length === 0) {
      setErrConfirmPassword("Confirm password is required!");
      return false;
    }
    if (password.localeCompare(confirmPassword) !== 0) {
      setErrConfirmPassword("Confirm password does not match!");
      return false;
    }
    if (!avatar) {
      setErrAvatar("Avatar is required!");
      return false;
    }
    const isValidPhoneNumber = /^\d+$/.test(phoneNumber);
    if (phoneNumber.trim().length > 0) {
      if (!isValidPhoneNumber) {
        setErrPhoneNumber("Phone numbers must consist of digits only");
        return false;
      }
    }
    return true;
  };
  const handleClickSignUp = async () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address);
      formData.append("gender", gender === "1" ? "male" : "female");
      formData.append("avatar", avatar || "");
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/register`,
          formData,
          {
            headers: headers,
          }
        );
        if (response.data.status === 200) {
          setContentDialogMessage(response.data.message);
          setIsShowDialogMessage(true);
        }
      } catch (error) {
        console.log("error:", error);
      }
    }
  };
  const handleSelectChange = (event: any) => {
    setGender(event.target.value as string);
  };
  const handleAvatarUploadChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileSize = Number(file?.size);
    const fileType = file.type || file?.name?.split(".")?.slice(-1)[0];
    if (fileSize > 5 * 1024 * 1024) {
      setAvatar(null);
      setErrAvatar("Max size of file is 5Mb");
    } else if (!["image/png", "image/jpg", "image/jpeg"].includes(fileType)) {
      setAvatar(null);
      setErrAvatar(
        "File format not supported! (Supported file formats: .png, .jpg, .jpeg)"
      );
    } else {
      setAvatar(file);
      setErrAvatar("");
      avatarRefUrl.current = URL.createObjectURL(e.target.files[0]);
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
            width={{
              xs: "calc(300px + 100vw/20)",
              sm: "calc(500px + 100vw/20)",
            }}
            className="main-border main-box-shadow"
            sx={{
              background: "var(--main-bg-color)",
            }}
            p={{ xs: "32px 0px", sm: "32px 8px" }}
          >
            <Box component="div" display="flex" justifyContent="center" mb={3}>
              <CustomTypography
                color="var(--main-content-text-color)"
                fontSize="24px !important"
                fontWeight="900 !important"
              >
                SIGN UP
              </CustomTypography>
            </Box>
            <Box component="div" px={4}>
              <Box component="form" noValidate autoComplete="off">
                <Box component="div" p={1}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 2, sm: 4 }}
                    justifyContent={{ xs: "unset", sm: "space-between" }}
                  >
                    <Box component="div" width="100%">
                      <CustomTextField
                        id="first-name"
                        label="First name"
                        variant="standard"
                        inputProps={{ maxLength: 50 }}
                        fullWidth
                        value={firstName}
                        onChange={(e) => {
                          setErrFirstName("");
                          setFirstName(e.target.value);
                        }}
                      />
                      {errFirstName && (
                        <Typography variant="caption" color="error">
                          {errFirstName}
                        </Typography>
                      )}
                    </Box>
                    <Box component="div" width="100%">
                      <CustomTextField
                        id="last-name"
                        label="Last name"
                        variant="standard"
                        inputProps={{ maxLength: 50 }}
                        fullWidth
                        value={lastName}
                        onChange={(e) => {
                          setErrLastName("");
                          setLastName(e.target.value);
                        }}
                      />
                      {errLastName && (
                        <Typography variant="caption" color="error">
                          {errLastName}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Box>
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
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 2, sm: 4 }}
                    justifyContent={{ xs: "unset", sm: "space-between" }}
                  >
                    <Box component="div" width="100%">
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
                    <Box component="div" width="100%">
                      <CustomTextField
                        id="confirm-password"
                        label="Confirm Password"
                        variant="standard"
                        inputProps={{ maxLength: 15 }}
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => {
                          setErrConfirmPassword("");
                          setConfirmPassword(e.target.value);
                        }}
                      />
                      {errConfirmPassword && (
                        <Typography variant="caption" color="error">
                          {errConfirmPassword}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Box>
                <Box component="div" p={1}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 2, sm: 4 }}
                    justifyContent={{ xs: "unset", sm: "space-between" }}
                  >
                    <Box component="div" width="100%">
                      <CustomTextField
                        id="phone-number"
                        label="Phone number"
                        variant="standard"
                        inputProps={{ maxLength: 15 }}
                        fullWidth
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      {errPhoneNumber && (
                        <Typography variant="caption" color="error">
                          {errPhoneNumber}
                        </Typography>
                      )}
                    </Box>
                    <CustomTextField
                      id="user-address"
                      label="Address"
                      variant="standard"
                      inputProps={{ maxLength: 50 }}
                      fullWidth
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Stack>
                </Box>
              </Box>
            </Box>
            <Box
              component="div"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={5}
              py={2}
              mb={1}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 4 }}
                width="100%"
                justifyContent={{ xs: "unset", sm: "space-between" }}
              >
                <Box component="div" width="100%">
                  <Box
                    component="div"
                    display="flex"
                    justifyContent="left"
                    alignItems="center"
                  >
                    <CustomTypography
                      color="var(--main-content-text-color)"
                      mr={2}
                    >
                      Avatar:
                    </CustomTypography>
                    <Box
                      component="div"
                      sx={{
                        width: "53px",
                        height: "53px",
                        border: !avatar
                          ? ""
                          : "2px solid var(--main-title-color)",
                        borderRadius: "50%",
                        backgroundSize: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => {}}
                    >
                      {avatar && (
                        <label htmlFor="avatar-upload">
                          <Tooltip
                            title={
                              !avatar ? "Select file" : "Select another file"
                            }
                          >
                            <img
                              src={avatarRefUrl.current}
                              alt="avatar"
                              style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                                height: "50px",
                                width: "50px",
                                position: "relative",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%,-50%)",
                              }}
                            />
                          </Tooltip>
                        </label>
                      )}
                      {!avatar && (
                        <label htmlFor="avatar-upload">
                          <Tooltip
                            title={
                              !avatar ? "Select file" : "Select another file"
                            }
                          >
                            <CloudUploadIcon
                              sx={{
                                position: "relative",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%,-50%)",
                                color: "var(--main-content-text-color)",
                              }}
                            />
                          </Tooltip>
                        </label>
                      )}
                      <input
                        id="avatar-upload"
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        hidden={true}
                        onChange={handleAvatarUploadChange}
                      />
                    </Box>
                  </Box>
                  {errAvatar && (
                    <Typography
                      variant="caption"
                      color="error"
                      position="relative"
                      top="-16px"
                    >
                      {errAvatar}
                    </Typography>
                  )}
                </Box>
                <Box component="div" display="flex" alignItems="center">
                  <FormControl variant="standard">
                    <Box
                      component="div"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CustomTypography
                        color="var(--main-content-text-color)"
                        mr={2}
                      >
                        Gender:
                      </CustomTypography>
                      <CustomSelect
                        id="gender"
                        value={gender}
                        label="gender"
                        onChange={handleSelectChange}
                        displayEmpty
                        disableUnderline
                        MenuProps={{
                          sx: {
                            "& .MuiMenu-list": {
                              backgroundColor: "var(--main-popper-bg-color)",
                            },
                          },
                        }}
                      >
                        <MenuItem value={"1"}>Male</MenuItem>
                        <MenuItem value={"0"}>Female</MenuItem>
                      </CustomSelect>
                    </Box>
                  </FormControl>
                </Box>
              </Stack>
            </Box>
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              sx={{ paddingX: 5 }}
              mb={2}
            >
              <ButtonPrimary fullWidth onClick={handleClickSignUp}>
                Sign Up
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
                Already have an account?
              </Typography>
              <Box component="div" onClick={() => navigate("/login")}>
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
                  Login
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {isShowDialogMessage && (
        <DialogMessage
          content={contentDialogMessage}
          title="Notification"
          onOk={() => {
            navigate("/login");
            setIsShowDialogMessage(false);
          }}
        />
      )}
    </>
  );
};
export default SignUp;
