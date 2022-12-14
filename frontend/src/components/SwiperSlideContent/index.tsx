import { Box } from "@mui/material";
import Galaxy from "../../assets/images/galaxy.jpg";
import ButtonBoxShadow from "../ButtonBoxShadow";
interface CustomSwiperSlideProps {
  img?: any;
  message?: any;
  onClickExplore: any;
}
const SwiperSlideContent = ({
  img,
  message,
  onClickExplore,
}: CustomSwiperSlideProps) => {
  return (
    <>
      <Box
        component="div"
        height="calc(100vh - 68.5px)"
        style={{
          objectFit: "fill",
          cursor: "pointer",
          backgroundImage: `url(${Galaxy})`,
          backgroundSize: "cover",
        }}
        p={4}
      >
        <Box
          component="div"
          display="flex"
          justifyContent={{ xs: "center", sm: "flex-start" }}
        >
          <Box
            component="img"
            src={img}
            alt="photo"
            sx={{
              objectFit: "fill",
              width: { xs: "40vh", lg: "unset" },
              height: { xs: "auto", lg: "100%" },
            }}
            className="image-animation"
          />
        </Box>
        <Box
          component="div"
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: "6vw",
            lineHeight: "150%",
            color: "var(--main-title-color)",
            fontWeight: "900",
            display: { xs: "flex", lg: "unset" },
            justifyContent: { xs: "center", lg: "unset" },
            position: { xs: "unset", lg: "absolute" },
            left: { xs: "unset", lg: "50%" },
            top: { xs: "unset", lg: "50%" },
            transform: { xs: "unset", lg: "translate(-50%,-50%)" },
          }}
          className="character-animation"
          mt="8vh"
        >
          {message}
        </Box>
        <Box
          component="div"
          sx={{
            display: { xs: "flex", sm: "unset" },
            justifyContent: { xs: "center", sm: "unset" },
            mt: { xs: "16vh", sm: "unset" },
            position: { xs: "unset", sm: "absolute" },
            right: { xs: "unset", sm: "56px" },
            bottom: { xs: "unset", sm: "56px" },
          }}
        >
          <ButtonBoxShadow onClick={onClickExplore}>Explore</ButtonBoxShadow>
        </Box>
      </Box>
    </>
  );
};
export default SwiperSlideContent;
