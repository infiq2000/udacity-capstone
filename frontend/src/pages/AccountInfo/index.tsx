import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import useAxios from "axios-hooks";
import { useEffect, useMemo, useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import CustomSelect from "../../components/CustomSelect";
import CustomTextField from "../../components/CustomTextField";
import CustomTypography from "../../components/CustomTypography";
import DialogConfirm from "../../components/Dialogs/Confirm";
import DialogMessage from "../../components/Dialogs/Message";
import {
  API_URL,
  formDataHeaders,
  headers,
  MAX_SIZE_UPLOAD,
  SUPPORTED_IMAGES,
} from "../../constants";
import { imageProcessToBase64String, mapRank } from "../../utils";
const AccountInfo = () => {
  const [avatar, setAvatar] = useState<any>();
  const [avatarInfo, setAvatarInfo] = useState<any>();
  const [errAvatar, setErrAvatar] = useState("");
  // console.log("From API", avatar);
  // (507036) [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 0, 0, 72, 0, 72, 0, 0, 255, 225, 0, 76, 69, 120, 105, 102, 0, 0, 77, 77, 0, 42, 0, 0, 0, 8, 0, 2, 1, 18, 0, 3, 0, 0, 0, 1, 0, 1, 0, 0, 135, 105, 0, 4, 0, 0, 0, 1, 0, 0, 0, 38, 0, 0, 0, 0, 0, 2, 160, 2, 0, 4, 0, 0, 0, 1, 0, 0, 10, 0, 160, 3, 0, 4, 0, 0, 0, 1, 0, 0, 7, 72, 0, 0, 0, 0, 255, 237, …]
  const avatarBase64String = useMemo(
    () => imageProcessToBase64String(avatar),
    [avatar]
  );
  const [userId, setUserId] = useState<any>();
  const [firstName, setFirstName] = useState("");
  const [errFirstName, setErrFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [vipPoint, setVipPoint] = useState(0);
  const [userRank, setUserRank] = useState<any>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errPhoneNumber, setErrPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("1");
  const [readOnly, setReadOnly] = useState(true);
  const [isShowDialogConfirm, setIsShowDialogConfirm] = useState(false);
  const [isShowDialogMessage, setIsShowDialogMessage] = useState(false);
  const [message, setMessage] = useState("");

  const [{}, execute] = useAxios(
    {
      url: `${API_URL}/user/profile`,
      headers: {
        ...headers,
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
    { manual: true }
  );
  const handleConfirm = () => {
    setIsShowDialogConfirm(false);
    setReadOnly(true);
    setMessage("");
    setErrAvatar("");
    setErrFirstName("");
    setErrLastName("");
    setErrPhoneNumber("");
    setAvatar(null);
    getData();
  };
  const onAvatarFileChange = (e: any) => {
    setErrAvatar("");
    setAvatarInfo(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      setAvatar(Array.from(new Uint8Array(evt?.target?.result)));
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };
  const getData = () => {
    execute()
      .then((response: AxiosResponse) => response.data)
      .then((res) => {
        if (res?.status === 200) {
          setUserId(res?.userData?.id);
          setAvatar(res?.userData?.avatar?.data);
          setFirstName(res?.userData?.firstName);
          setLastName(res?.userData?.lastName);
          setVipPoint(res?.userData?.vipPoint);
          setUserRank(mapRank(res?.userData?.vipPoint));
          setGender(res?.userData?.gender === "male" ? "1" : "0");
          setPhoneNumber(res?.userData?.phoneNumber);
          setAddress(res?.userData?.address);
        }
      })
      .catch((err) => console.log("error", err));
  };
  useEffect(() => {
    getData();
  }, []);
  const validateForm = () => {
    if (firstName.trim().length === 0) {
      setErrFirstName("First name is required!");
      return false;
    }
    if (lastName.trim().length === 0) {
      setErrLastName("Last name is required!");
      return false;
    }
    const isValidPhoneNumber = /^\d+$/.test(phoneNumber);
    if (phoneNumber.trim().length > 0) {
      if (!isValidPhoneNumber) {
        setErrPhoneNumber("Phone numbers must consist of digits only");
        return false;
      }
    }
    if (avatarInfo) {
      const fileSize = Number(avatarInfo?.size);
      const fileType =
        avatarInfo?.type || avatarInfo?.name?.split(".")?.slice(-1)[0];
      if (fileSize > MAX_SIZE_UPLOAD) {
        setErrAvatar("Max size of file is 5Mb");
        return false;
      } else if (![...SUPPORTED_IMAGES].includes(fileType)) {
        setErrAvatar(
          "File format not supported! (Supported file formats: .png, .jpg, .jpeg)"
        );
        return false;
      }
    }
    return true;
  };
  const handleClickSubmit = async () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address);
      formData.append("gender", gender === "1" ? "male" : "female");
      if (avatarInfo) {
        formData.append("avatar", avatarInfo || "");
      }
      const response = (await axios
        .put(`${API_URL}/user/update-info`, formData, {
          headers: {
            ...formDataHeaders,
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .catch((err) => console.log(err))) as AxiosResponse;
      if (response.data?.status === 200) {
        setMessage(response.data?.message);
        setIsShowDialogMessage(true);
        getData();
      }
    }
  };
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          my={{ xs: 4, sm: 8 }}
          className="main-border main-box-shadow"
          sx={{ minHeight: "40vh" }}
          p={4}
        >
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4} px={2}>
            <Box component="div" display="flex" justifyContent="center" mt={5}>
              <Stack direction="column" spacing={1}>
                {readOnly && (
                  <Box
                    component="div"
                    sx={{
                      background: `url(data:image/jpeg;base64,${avatarBase64String})`,
                      height: "132px",
                      width: "132px",
                      borderRadius: "50%",
                      backgroundSize: "cover",
                      mb: "8px",
                    }}
                  >
                    {userRank?.frame && (
                      <userRank.frame
                        style={{
                          width: "150%",
                          height: "150%",
                          position: "relative",
                          top: "-44px",
                          left: "-38px",
                        }}
                      />
                    )}
                  </Box>
                )}
                {!readOnly && (
                  <label htmlFor="upload-avatar">
                    <Tooltip title="Change avatar">
                      <Box
                        component="div"
                        sx={{
                          background: `url(data:image/jpeg;base64,${avatarBase64String})`,
                          height: "132px",
                          width: "132px",
                          borderRadius: "50%",
                          backgroundSize: "cover",
                          mb: "8px",
                          cursor: "pointer",
                        }}
                      >
                        {userRank?.frame && (
                          <userRank.frame
                            style={{
                              width: "150%",
                              height: "150%",
                              position: "relative",
                              top: "-44px",
                              left: "-38px",
                            }}
                          />
                        )}
                      </Box>
                    </Tooltip>
                  </label>
                )}
                {errAvatar && (
                  <Typography variant="caption" color="error">
                    {errAvatar}
                  </Typography>
                )}
                <input
                  type="file"
                  key={avatar}
                  id="upload-avatar"
                  accept=".png, .jpeg, .jpg"
                  hidden={true}
                  onChange={onAvatarFileChange}
                />
                <Stack direction="row" spacing={1}>
                  <CustomTypography
                    sx={{
                      fontSize: "16px",
                      fontFamily: "inherit",
                      color: "var(--main-title-color)",
                    }}
                  >
                    Vip Point:
                  </CustomTypography>
                  <CustomTypography
                    sx={{
                      fontSize: "16px",
                      fontFamily: "inherit",
                      color: "var(--main-content-text-color)",
                    }}
                  >
                    {vipPoint}
                  </CustomTypography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <CustomTypography
                    sx={{
                      fontSize: "16px",
                      fontFamily: "inherit",
                      color: "var(--main-title-color)",
                    }}
                  >
                    Membership:
                  </CustomTypography>
                  <CustomTypography
                    sx={{
                      fontSize: "16px",
                      fontFamily: "inherit",
                      color: "var(--main-content-text-color)",
                    }}
                  >
                    {userRank?.type}
                  </CustomTypography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              mb={2}
              mt={4}
            >
              <Box
                component="span"
                className="text-heading text-heading-animation"
                whiteSpace="nowrap"
                sx={{ fontSize: "calc(16px + 0.5vw)" }}
              >
                Account Information
              </Box>
            </Box>
            <Box component="div">
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
                        inputProps={{
                          maxLength: 50,
                          style: { textTransform: "capitalize" },
                        }}
                        fullWidth
                        InputProps={{ readOnly }}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
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
                        inputProps={{
                          maxLength: 50,
                          style: { textTransform: "capitalize" },
                        }}
                        fullWidth
                        InputProps={{ readOnly }}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                        InputProps={{ readOnly }}
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
                      inputProps={{
                        maxLength: 50,
                        style: { textTransform: "capitalize" },
                      }}
                      fullWidth
                      InputProps={{ readOnly }}
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
              px={1}
              py={2}
              mb={1}
            >
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
                      label="gender"
                      value={gender}
                      onChange={(e: any) => {
                        setGender(e.target.value);
                      }}
                      inputProps={{ readOnly }}
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
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}></Grid>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={8} p={2}>
            <Stack
              direction="row"
              display="flex"
              justifyContent="flex-end"
              spacing={2}
            >
              {!readOnly && (
                <ButtonPrimary onClick={handleClickSubmit}>
                  Submit
                </ButtonPrimary>
              )}
              {readOnly && (
                <ButtonPrimary
                  onClick={() => {
                    setReadOnly(false);
                  }}
                >
                  Edit Info
                </ButtonPrimary>
              )}
              {!readOnly && (
                <ButtonPrimary
                  onClick={() => {
                    setMessage("You changes may not be saved, are you sure?");
                    setIsShowDialogConfirm(true);
                  }}
                >
                  Cancel
                </ButtonPrimary>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      {isShowDialogConfirm && (
        <DialogConfirm
          content={message}
          onConfirm={handleConfirm}
          onCancel={() => {
            setIsShowDialogConfirm(false);
          }}
        />
      )}
      {isShowDialogMessage && (
        <DialogMessage
          content={message}
          onOk={() => {
            setIsShowDialogMessage(false);
            setReadOnly(true);
          }}
        />
      )}
    </>
  );
};
export default AccountInfo;
