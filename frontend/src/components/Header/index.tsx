import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CollectionsIcon from "@mui/icons-material/Collections";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import LanguageIcon from "@mui/icons-material/Language";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PublicIcon from "@mui/icons-material/Public";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Buffer } from "buffer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import RouterPath from "../../router/RouterPath";
import { logout } from "../../slice/loginSlice";
import { mapRank } from "../../utils";
import ButtonBoxShadow from "../ButtonBoxShadow";
import CustomTypography from "../CustomTypography";
import { DarkLightSwitch, StyledButton, StyledMenu } from "./styles";
interface HeaderProps {
  onClickDarkMode: any;
  userData: any;
  onLogout: any;
}
const Header = ({ onClickDarkMode, userData, onLogout }: HeaderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = userData;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const avatarBuffer = Buffer.from(data?.avatar?.data || []);
  const avatarBase64String = avatarBuffer.toString("base64");
  const userRank = mapRank(data?.vipPoint);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
    onLogout();
    navigate("/login");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        borderBottom: "1px solid var(--main-header-divider)",
        width: "100%",
        height: "68.5px",
        background: "var(--main-header-color)",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          height: "100%",
          cursor: "pointer",
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: 2,
        }}
      >
        <Box component="div" ml="2px" display={{ xs: "none", sm: "inline" }}>
          <Box
            component="div"
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => navigate(RouterPath.HOME)}
          >
            <PublicIcon
              sx={{ color: "var(--main-content-text-color)" }}
              fontSize="large"
            />
            <Box component="div">
              <CustomTypography
                fontWeight="900 !important"
                fontSize="18px !important"
                color="var(--main-content-text-color)"
                lineHeight="1"
                letterSpacing="2px"
              >
                Leo
              </CustomTypography>
              <CustomTypography
                fontWeight="700 !important"
                fontSize="8px !important"
                color="var(--main-content-text-color)"
                letterSpacing="2px"
              >
                Make Learning Fun
              </CustomTypography>
            </Box>
          </Box>
        </Box>
        <Box
          width={{ xs: "100%", sm: "unset" }}
          component="div"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Box component="div" display={{ xs: "inline", lg: "none" }}>
            <Tooltip title="Reading Tests">
              <StyledButton
                onClick={() => navigate(RouterPath.READING_TESTS)}
                className={
                  location.pathname.includes(RouterPath.READING_TESTS)
                    ? "active"
                    : ""
                }
                sx={{
                  ml: { xs: 0, sm: 1 },
                  minWidth: 0,
                  "& .MuiButton-startIcon": { margin: "0px" },
                }}
                startIcon={<AutoStoriesIcon />}
              />
            </Tooltip>
          </Box>
          <Box component="div" display={{ xs: "none", lg: "inline" }}>
            <StyledButton
              onClick={() => navigate(RouterPath.READING_TESTS)}
              className={
                location.pathname.includes(RouterPath.READING_TESTS)
                  ? "active"
                  : ""
              }
              sx={{ ml: 1 }}
              startIcon={<AutoStoriesIcon />}
            >
              Reading Tests
            </StyledButton>
          </Box>
          <Box component="div" display={{ xs: "inline", lg: "none" }}>
            <Tooltip title="Reading Passages">
              <StyledButton
                onClick={() => navigate(RouterPath.READING_PASSAGES)}
                className={
                  location.pathname.includes(RouterPath.READING_PASSAGES)
                    ? "active"
                    : ""
                }
                sx={{
                  ml: 1,
                  minWidth: 0,
                  "& .MuiButton-startIcon": { margin: "0px" },
                }}
                startIcon={<MenuBookIcon />}
              />
            </Tooltip>
          </Box>
          <Box component="div" display={{ xs: "none", lg: "inline" }}>
            <StyledButton
              onClick={() => navigate(RouterPath.READING_PASSAGES)}
              className={
                location.pathname.includes(RouterPath.READING_PASSAGES)
                  ? "active"
                  : ""
              }
              sx={{ ml: 1 }}
              startIcon={<MenuBookIcon />}
            >
              Reading Passages
            </StyledButton>
          </Box>
          <Box component="div" display={{ xs: "inline", lg: "none" }}>
            <Tooltip title="Public Collection">
              <StyledButton
                onClick={() => navigate(RouterPath.PUBLIC_COLLECTION)}
                className={
                  location.pathname.includes(RouterPath.PUBLIC_COLLECTION)
                    ? "active"
                    : ""
                }
                sx={{
                  ml: 1,
                  minWidth: 0,
                  "& .MuiButton-startIcon": { margin: "0px" },
                }}
                startIcon={<CollectionsIcon />}
              />
            </Tooltip>
          </Box>
          <Box component="div" display={{ xs: "none", lg: "inline" }}>
            <StyledButton
              onClick={() => navigate(RouterPath.PUBLIC_COLLECTION)}
              className={
                location.pathname.includes(RouterPath.PUBLIC_COLLECTION)
                  ? "active"
                  : ""
              }
              sx={{ mx: 1 }}
              startIcon={<CollectionsIcon />}
            >
              Public Collection
            </StyledButton>
          </Box>
          {!(Object.keys(data).length === 0) ? (
            <Box
              component="div"
              sx={{
                // background: `url(${SilverFrame})`,
                backgroundSize: "cover",
                width: "63px",
                height: "63px",
              }}
              onClick={handleOpenUserMenu}
            >
              {userRank?.frame && (
                <userRank.frame
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "16px",
                    transform: "translateY(-50%)",
                    zIndex: "9999",
                    width: "64px",
                    height: "64px",
                  }}
                />
              )}
              <Avatar
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "27px",
                  transform: "translateY(-43%)",
                  zIndex: "999",
                  width: "41px",
                  height: "41px",
                }}
                alt="avatar"
                src={`data:image/jpeg;base64,${avatarBase64String}`}
              />
            </Box>
          ) : (
            <ButtonBoxShadow
              sx={{
                fontSize: "12px",
                padding: "8px 16px",
                ml: { xs: "8px", sm: "24px" },
              }}
              startIcon={<LoginIcon />}
              onClick={() => navigate(RouterPath.LOGIN)}
            >
              SIGN IN
            </ButtonBoxShadow>
          )}
          <StyledMenu
            sx={{
              mt: 6,
            }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            disablePortal
          >
            <Box component="div" p="6px 12px">
              <Box
                component="div"
                display="flex"
                alignItems="center"
                paddingRight={1}
                sx={{ borderBottom: "1px solid" }}
              >
                <IconButton>
                  {userRank?.frame && (
                    <userRank.frame
                      style={{
                        position: "absolute",
                        top: "45%",
                        right: "-4px",
                        transform: "translateY(-50%)",
                        zIndex: "9999",
                        width: "64px",
                        height: "64px",
                      }}
                    />
                  )}
                  <Avatar
                    alt="avatar"
                    src={`data:image/jpeg;base64,${avatarBase64String}`}
                  />
                </IconButton>
                <CustomTypography
                  fontWeight="700 !important"
                  color="var(--main-content-text-color)"
                  textTransform="capitalize"
                >
                  {data?.lastName + " " + data?.firstName}
                </CustomTypography>
              </Box>
              <Box
                mt={1}
                component="div"
                display="flex"
                alignItems="center"
                padding="8px 16px"
                className="user-profile-hover"
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("/account-information");
                }}
              >
                <ManageAccountsIcon />
                <CustomTypography ml={1} fontWeight="700 !important">
                  Account Information
                </CustomTypography>
              </Box>
              <Box
                component="div"
                display="flex"
                alignItems="center"
                padding="8px 16px"
                className="user-profile-hover"
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("/favourite-list/reading-tests");
                }}
              >
                <FavoriteIcon />
                <CustomTypography ml={1} fontWeight="700 !important">
                  Favorite List
                </CustomTypography>
              </Box>
              <Box
                component="div"
                display="flex"
                alignItems="center"
                padding="8px 16px"
                className="user-profile-hover"
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("/personal-collection");
                }}
              >
                <CollectionsIcon />
                <CustomTypography ml={1} fontWeight="700 !important">
                  Collection
                </CustomTypography>
              </Box>
              <Box
                component="div"
                display="flex"
                alignItems="center"
                padding="8px 16px"
                className="user-profile-hover"
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("/vocabulary-list");
                }}
              >
                <LanguageIcon />
                <CustomTypography ml={1} fontWeight="700 !important">
                  Vocabulary
                </CustomTypography>
              </Box>
              <Box
                component="div"
                display="flex"
                alignItems="center"
                padding="8px 16px"
                className="user-profile-hover"
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("/activity");
                }}
              >
                <HistoryIcon />
                <CustomTypography ml={1} fontWeight="700 !important">
                  Activity
                </CustomTypography>
              </Box>
              <Box
                component="div"
                display="flex"
                alignItems="center"
                padding="8px 16px"
                className="user-profile-hover"
              >
                <DarkModeIcon />
                <CustomTypography ml={1} fontWeight="700 !important">
                  Darkmode
                </CustomTypography>
                <Box component="div" ml={3}>
                  <DarkLightSwitch onClick={onClickDarkMode} defaultChecked />
                </Box>
              </Box>
              <Box
                component="div"
                display="flex"
                alignItems="center"
                padding="8px 16px"
                className="user-profile-hover"
                onClick={handleClickLogout}
              >
                <LogoutIcon />
                <CustomTypography ml={1} fontWeight="700 !important">
                  Logout
                </CustomTypography>
              </Box>
            </Box>
          </StyledMenu>
        </Box>
      </Box>
    </header>
  );
};
export default Header;
