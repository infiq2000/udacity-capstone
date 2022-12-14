import DeleteIcon from "@mui/icons-material/Delete";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import useAxios from "axios-hooks";
import { Buffer } from "buffer";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL, formDataHeaders, headers } from "../../constants";
import ButtonTransparent from "../ButtonTransparent";
import CustomTypography from "../CustomTypography";
import DialogConfirm from "../Dialogs/Confirm";
import DialogMessage from "../Dialogs/Message";
import ModalCreateOrEditCollection from "../Dialogs/ModalCreateOrEditCollection";
interface CollectionItemProps {
  collection: any;
  owner?: any;
  onDeleteCollection: any;
  isPublic?: boolean;
  yourAttitude?: string;
}
const CollectionItem = ({
  collection,
  owner,
  onDeleteCollection,
  isPublic = false,
  yourAttitude,
}: CollectionItemProps) => {
  const handleClickItem = () => {};
  const avatarBuffer = Buffer.from(owner?.avatar?.data || []);
  const avatarBase64String = avatarBuffer.toString("base64");
  const coverImageBuffer = Buffer.from(collection?.coverImage?.data || []);
  const coverImageBase64String = coverImageBuffer.toString("base64");
  const [attitude, setAttitude] = useState(yourAttitude);
  const [isShare, setIsShare] = useState(collection?.isShare);
  const [isShowDialogMessage, setIsShowDialogMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [numberOfLikes, setNumberOfLikes] = useState(collection?.numberOfLikes);
  const [numberOfDislikes, setNumberOfDislikes] = useState(
    collection?.numberOfDislikes
  );
  const [
    isShowConfirmDeleteCollectionDialog,
    setIsShowConfirmDeleteCollectionDialog,
  ] = useState(false);
  const [isShowModalEditCollection, setIsShowModalEditCollection] =
    useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [{}, execute] = useAxios(
    {
      method: "DELETE",
      url: `${API_URL}/collection/delete`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        id: collection?.id,
      },
    },
    {
      manual: true,
    }
  );

  const [{}, executeShareCollection] = useAxios(
    {
      method: "PUT",
      url: `${API_URL}/collection/update-share-collection`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        collectionId: collection?.id,
      },
    },
    { manual: true }
  );
  const [{}, executeAttitude] = useAxios(
    {
      method: "POST",
      url: `${API_URL}/collection/add-user-attitude`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
    { manual: true }
  );
  const handleSubmit = async (data: any) => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/collection/update`, data, {
        headers: {
          ...formDataHeaders,
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((result) => result.data)
      .then((data) => {
        if (data?.status === 200) {
          setIsShowModalEditCollection(false);
          setMessage("You edit a collection successfully!");
          setIsShowDialogMessage(true);
        }
      })
      .catch(() => {});
  };
  const handleClickShareCollection = () => {
    executeShareCollection()
      .then((res) => res.data)
      .then((data) => {
        if (data?.status === 200 && data?.message === "successfully") {
          setIsShare(!isShare);
        }
      });
  };
  const handleClickAttitude = (userAttitude: string) => {
    let tempAttitude;
    if (userAttitude === "like") {
      if (attitude === "like") {
        tempAttitude = "none";
        setNumberOfLikes(numberOfLikes - 1);
      } else {
        tempAttitude = "like";
        setNumberOfLikes(numberOfLikes + 1);
        if (attitude === "dislike") {
          setNumberOfDislikes(numberOfDislikes - 1);
        }
      }
    } else {
      if (attitude === "dislike") {
        tempAttitude = "none";
        setNumberOfDislikes(numberOfDislikes - 1);
      } else {
        tempAttitude = "dislike";
        setNumberOfDislikes(numberOfDislikes + 1);
        if (attitude === "like") {
          setNumberOfLikes(numberOfLikes - 1);
        }
      }
    }
    setAttitude(tempAttitude);
    executeAttitude({
      data: { collectionId: collection?.id, attitude: tempAttitude },
    });
  };

  const handleDeleteCollection = async () => {
    setIsShowConfirmDeleteCollectionDialog(false);
    execute()
      .then((res) => res.data)
      .then((data) => {
        if (data?.status === 200) {
          setMessage(data?.message);
          setIsShowDialogMessage(true);
        }
      })
      .catch((error) => {
        setMessage("Can not delete collection at the moment, try again later!");
        setIsShowDialogMessage(true);
      });
  };
  return (
    <>
      <Grid item xs={12} sm={12} smmd={6} md={6} lg={4} xl={4}>
        <Box
          component="div"
          className="collection-item hover main-border main-box-shadow"
          sx={{
            backgroundColor: "var(--main-popper-bg-color)",
          }}
          onClick={handleClickItem}
        >
          <Box
            position="relative"
            component="div"
            borderRadius="inherit"
            minWidth="100%"
          >
            <Box component="div" className="cover">
              <img
                src={`data:image/jpeg;base64,${coverImageBase64String}`}
                alt="cover"
              />
            </Box>
            <Box component="div" className="content">
              <Box className="avatar" component="div">
                <img
                  width="100%"
                  height="100%"
                  src={`data:image/jpeg;base64,${avatarBase64String}`}
                  alt="avatar"
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Box
                component="p"
                fontWeight="700"
                lineHeight="150%"
                marginTop="8px"
                textAlign="center"
                color="var(--main-title-color)"
                fontSize="16px"
                className="creator"
                textTransform="uppercase"
              >
                {collection?.name}
              </Box>
              <Box component="div" className="creator">
                <CustomTypography
                  sx={{
                    color: "var(--main-content-text-color)",
                    fontStyle: "italic",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  Created by:&nbsp;
                  <Box component="span" sx={{ textTransform: "uppercase" }}>
                    {owner?.lastName + " " + owner?.firstName}
                  </Box>
                </CustomTypography>
              </Box>
              <Box
                component="p"
                fontWeight={500}
                textAlign="left"
                className="description "
                sx={{
                  color: "var(--main-content-text-color)",
                  fontSize: "12px",
                  border: "1px solid var(--main-content-text-color)",
                  width: "100%",
                  mt: 1,
                  padding: "8px",
                }}
              >
                Description: {collection?.description}
              </Box>
            </Box>
          </Box>
          {!isPublic && (
            <Box
              component="div"
              m={1}
              p={1}
              display="flex"
              justifyContent="space-between"
              borderTop="1px solid var(--main-content-text-color)"
              borderBottom="1px solid var(--main-content-text-color)"
            >
              <ButtonTransparent
                sx={{
                  border: "none !important",
                }}
                startIcon={
                  <EditIcon
                    fontSize="large"
                    sx={{ color: "var(--main-content-text-color)" }}
                  />
                }
                onClick={() => setIsShowModalEditCollection(true)}
              >
                Edit
              </ButtonTransparent>
              <ButtonTransparent
                sx={{
                  border: "none !important",
                }}
                startIcon={
                  <ReplyIcon
                    fontSize="large"
                    sx={{
                      color: "var(--main-content-text-color)",
                      transform: "scaleX(-1)",
                    }}
                  />
                }
                onClick={handleClickShareCollection}
              >
                {isShare ? "Unshare" : "Share"}
              </ButtonTransparent>
              <ButtonTransparent
                sx={{
                  border: "none !important",
                }}
                startIcon={
                  <DeleteIcon
                    fontSize="large"
                    sx={{ color: "var(--main-content-text-color)" }}
                  />
                }
                onClick={() => setIsShowConfirmDeleteCollectionDialog(true)}
              >
                Delete
              </ButtonTransparent>
              <ButtonTransparent
                sx={{
                  border: "none !important",
                }}
                startIcon={
                  <DoubleArrowIcon
                    fontSize="large"
                    sx={{ color: "var(--main-content-text-color)" }}
                  />
                }
                onClick={() => {
                  navigate(`${location.pathname}/detail/${collection?.id}`);
                }}
              >
                View
              </ButtonTransparent>
            </Box>
          )}
          {isPublic && (
            <Box
              component="div"
              m={1}
              p={1}
              display="flex"
              justifyContent="space-between"
              borderTop="1px solid var(--main-content-text-color)"
              borderBottom="1px solid var(--main-content-text-color)"
            >
              <Box component="div">
                <Box component="div" display="flex" justifyContent="center">
                  <CustomTypography
                    sx={{
                      color: "var(--main-content-text-color)",
                      fontStyle: "italic",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    {numberOfLikes}
                  </CustomTypography>
                </Box>
                <ButtonTransparent
                  sx={{
                    border: "none !important",
                    color:
                      attitude === "like"
                        ? "var(--main-chosen-color) !important"
                        : "var(--main-content-text-color)",
                  }}
                  startIcon={
                    <ThumbUpIcon
                      fontSize="large"
                      sx={{
                        color:
                          attitude === "like"
                            ? "var(--main-chosen-color)"
                            : "var(--main-content-text-color)",
                      }}
                    />
                  }
                  onClick={() => handleClickAttitude("like")}
                >
                  Like
                </ButtonTransparent>
              </Box>
              <Box component="div">
                <Box component="div" display="flex" justifyContent="center">
                  <CustomTypography
                    sx={{
                      color: "var(--main-content-text-color)",
                      fontStyle: "italic",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    {numberOfDislikes}
                  </CustomTypography>
                </Box>
                <ButtonTransparent
                  sx={{
                    border: "none !important",
                    color:
                      attitude === "dislike"
                        ? "var(--main-chosen-color) !important"
                        : "var(--main-content-text-color)",
                  }}
                  startIcon={
                    <ThumbDownIcon
                      fontSize="large"
                      sx={{
                        color:
                          attitude === "dislike"
                            ? "var(--main-chosen-color) !important"
                            : "var(--main-content-text-color)",
                        transform: "scaleX(-1)",
                      }}
                    />
                  }
                  onClick={() => handleClickAttitude("dislike")}
                >
                  Dislike
                </ButtonTransparent>
              </Box>{" "}
              <Box component="div">
                <Box component="div" display="flex" justifyContent="center">
                  <CustomTypography
                    sx={{
                      color: "var(--main-content-text-color)",
                      fontStyle: "italic",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    &nbsp;
                  </CustomTypography>
                </Box>
                <ButtonTransparent
                  sx={{
                    border: "none !important",
                  }}
                  startIcon={
                    <DoubleArrowIcon
                      fontSize="large"
                      sx={{ color: "var(--main-content-text-color)" }}
                    />
                  }
                  onClick={() => {
                    navigate(`${location.pathname}/detail/${collection?.id}`);
                  }}
                >
                  View
                </ButtonTransparent>
              </Box>
            </Box>
          )}
        </Box>
      </Grid>
      {isShowConfirmDeleteCollectionDialog && (
        <DialogConfirm
          title="Delete Collection Confirmation"
          onConfirm={handleDeleteCollection}
          onCancel={() => setIsShowConfirmDeleteCollectionDialog(false)}
          content="Are you sure that you want to delete this collection!"
        />
      )}
      {isShowModalEditCollection && (
        <ModalCreateOrEditCollection
          isOpen={true}
          confirmMessage="Are you sure you want to edit this collection ?"
          onSubmit={(data: FormData) => handleSubmit(data)}
          data={collection}
          title="EDIT COLLECTION"
          collectionId={collection?.id}
          onClose={() => setIsShowModalEditCollection(false)}
        />
      )}
      {isShowDialogMessage && (
        <DialogMessage
          title="Notification"
          onOk={() => {
            setIsShowDialogMessage(false);
            setMessage("");
            onDeleteCollection();
          }}
          content={message}
        />
      )}
    </>
  );
};

export default CollectionItem;
