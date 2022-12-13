import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Checkbox, Grid, IconButton, Tooltip } from "@mui/material";
import Stack from "@mui/material/Stack";
import useAxios from "axios-hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { headers } from "../../constants";
import ButtonTransparent from "../ButtonTransparent";
interface CardItemProps {
  item: any;
  updateFavouriteURL?: any;
  updateFavouriteData?: any;
  responsive?: { xs: number; sm: number; md: number; lg: number; xl: number };
  isCheckBoxExist?: boolean;
  selectedIdList?: number[];
  checkSelected?: any;
  image?: any;
  readURL?: any;
  topic?: any;
}
const CardItem = ({
  responsive = { xs: 12, sm: 6, md: 4, lg: 4, xl: 3 },
  item,
  updateFavouriteURL,
  updateFavouriteData,
  isCheckBoxExist,
  selectedIdList,
  checkSelected,
  image,
  readURL,
  topic,
}: CardItemProps) => {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(item?.isYourFavourite);

  const token = localStorage.getItem("access_token");
  const [{}, execute] = useAxios(
    {
      url: updateFavouriteURL,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      method: "POST",
      data: updateFavouriteData,
    },
    {
      manual: true,
    }
  );
  const handleClickFavorite = () => {
    execute()
      .then((res) => {
        setIsFavourite(!isFavourite);
      })
      .catch((err) => {});
  };
  return (
    <Grid
      item
      xs={responsive.xs}
      sm={responsive.sm}
      md={responsive.md}
      lg={responsive.lg}
      xl={responsive.xl}
    >
      <Tooltip title={topic} arrow>
        <Grid
          container
          className="main-border main-box-shadow"
          padding={2}
          sx={{
            cursor: "pointer",
            backgroundColor: "var(--main-popper-bg-color)",
          }}
        >
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            sx={{
              borderBottom: "solid 2px var(--main-content-text-color)",
            }}
          >
            <Box
              position="relative"
              component="div"
              borderRadius="inherit"
              minWidth="100%"
            >
              {isCheckBoxExist && (
                <Box component="div" position="absolute" top="0px" left="0px">
                  <Checkbox
                    value={item?.id}
                    style={{ color: "white" }}
                    onChange={(e) => {
                      checkSelected(e);
                    }}
                    checked={selectedIdList?.includes(item?.id)}
                  />
                </Box>
              )}
              <Box
                component="img"
                src={image}
                alt="book"
                width="100%"
                height="200px"
                mb={2}
              />
              {token && (
                <Box
                  component="div"
                  position="absolute"
                  zIndex="99"
                  top="0"
                  right="0"
                  sx={{
                    background: "var(--main-bg-color)",
                    borderRadius: "50%",
                    "&:hover": {
                      boxShadow: "2px 2px 20px var(--main-content-text-color)",
                    },
                  }}
                  onClick={handleClickFavorite}
                >
                  <Tooltip title="Save as favourite">
                    <IconButton aria-label="edit" size="small">
                      <FavoriteIcon
                        fontSize="inherit"
                        sx={{
                          color: isFavourite
                            ? "var(--main-chosen-color)"
                            : "var(--main-content-text-color)",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ lineHeight: "200%" }}>
            <Stack
              className="main-text-overflow"
              direction="row"
              display="flex"
              justifyContent="space-between"
            >
              <Box
                component="div"
                fontWeight="700"
                display="block"
                color="var(--main-title-color)"
                fontSize="14px"
              >
                {item?.name || "UNKNOWN NAME"}
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent={item?.answers ? "space-between" : "flex-end"}
            mt={1}
          >
            <ButtonTransparent
              size="small"
              onClick={() => navigate(`${readURL}/detail/${item?.id}/false`)}
            >
              Read
            </ButtonTransparent>
            {item?.answers && (
              <ButtonTransparent
                size="small"
                onClick={() => navigate(`${readURL}/detail/${item?.id}/true`)}
              >
                Test
              </ButtonTransparent>
            )}
          </Grid>
        </Grid>
      </Tooltip>
    </Grid>
  );
};
export default CardItem;
