import { Box, Container, Grid } from "@mui/material";
import { useRef } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import WorldImage1 from "../../assets/images/world1.png";
import WorldImage2 from "../../assets/images/world2.png";
import CardInstruction from "../../components/CardInstruction";
import SwiperSlideContent from "../../components/SwiperSlideContent";
import { IeltsInformation, IeltsSteps } from "../../constants";

const Home = () => {
  const ref = useRef<any>(null);
  const handleClickExplore = () => {
    if (ref?.current) {
      ref?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <SwiperSlideContent
            onClickExplore={handleClickExplore}
            img={WorldImage1}
            message="TODAY A READER"
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperSlideContent
            onClickExplore={handleClickExplore}
            img={WorldImage2}
            message="LATER A LEADER"
          />
        </SwiperSlide>
      </Swiper>
      <Box ref={ref} component="div" position="relative" top="-67.5px"></Box>
      <Container maxWidth="xl">
        <Box component="div">
          <Box
            component="div"
            px={{ xs: 2, sm: 10 }}
            mt={2}
            sx={{
              color: "var(--main-content-text-color)",
              fontSize: "calc(18px + 100vw/200)",
              fontWeight: "bold",
            }}
            display="flex"
            justifyContent={{ xs: "center", sm: "left" }}
          >
            <span>HIGHEST SCORE USER</span>
          </Box>
        </Box>
        <Box component="div">
          <Box
            component="div"
            px={{ xs: 2, sm: 10 }}
            mt={2}
            sx={{
              color: "var(--main-content-text-color)",
              fontSize: "calc(18px + 100vw/200)",
              fontWeight: "bold",
            }}
            display="flex"
            justifyContent={{ xs: "center", sm: "left" }}
          >
            <span>ABOUT IELTS READING</span>
          </Box>
          <Grid container spacing={2} mb={4} mt={0} px={{ xs: 2, sm: 10 }}>
            {IeltsInformation.map((item, index) => {
              return <CardInstruction item={item} key={index} />;
            })}
          </Grid>
        </Box>
        <Box component="div">
          <Box
            component="div"
            px={{ xs: 2, sm: 10 }}
            mt={2}
            sx={{
              color: "var(--main-content-text-color)",
              fontSize: "calc(18px + 100vw/200)",
              fontWeight: "bold",
            }}
            display="flex"
            justifyContent={{ xs: "center", sm: "left" }}
          >
            <span>IELTS READING STEPS</span>
          </Box>
          <Grid container spacing={2} mb={4} mt={0} px={{ xs: 2, sm: 10 }}>
            {IeltsSteps.map((item, index) => {
              return <CardInstruction item={item} key={index} />;
            })}
          </Grid>
          <Grid container spacing={4} mt={0} pb={4} px={10}></Grid>
        </Box>
      </Container>
    </>
  );
};
export default Home;
