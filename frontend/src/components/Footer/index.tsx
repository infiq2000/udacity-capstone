import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Grid } from "@mui/material";
import CustomTypography from "../CustomTypography";
import {
  footerContainer,
  footerTitle,
  SocialLink,
  socialLinkWrapper,
} from "./styles";
const Footer = () => {
  return (
    <>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        sx={{
          background: "var(--main-footer-bg-color)",
        }}
        py={{ xs: 1, sm: 3 }}
        px={{ xs: 1, sm: 10 }}
      >
        <Grid container sx={footerContainer}>
          <Grid item xs={12} md={6}></Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ mb: { xs: 3, md: 0 } }}
            className="from-right-50"
          >
            <CustomTypography textAlign="right" sx={footerTitle}>
              Join our community
            </CustomTypography>
            <Box component="div" display="flex" sx={socialLinkWrapper}>
              <SocialLink href="https://t.me/+wCyfzCLByYk0MThl" target="_blank">
                <TelegramIcon
                  sx={{
                    width: "35px",
                    height: "31px",
                    color: "var(--main-content-text-color)",
                    position: "relative",
                    top: "0px",
                    left: "-2px",
                  }}
                />
              </SocialLink>
              <SocialLink href="https://twitter.com/t35782347" target="_blank">
                <TwitterIcon
                  sx={{
                    width: "35px",
                    height: "31px",
                    color: "var(--main-content-text-color)",
                    position: "relative",
                    top: "0px",
                    left: "0px",
                  }}
                />
              </SocialLink>
              <SocialLink
                href="https://www.facebook.com/ledangtruongdatdnvn/"
                target="_blank"
              >
                <FacebookIcon
                  sx={{
                    width: "35px",
                    height: "31px",
                    color: "var(--main-content-text-color)",
                    position: "relative",
                    top: "1px",
                    left: "-2px",
                  }}
                />
              </SocialLink>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
