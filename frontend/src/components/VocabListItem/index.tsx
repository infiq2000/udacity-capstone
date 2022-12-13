import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import useAxios from "axios-hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, formDataHeaders, headers } from "../../constants";
import ButtonTransparent from "../ButtonTransparent";
import CustomTypography from "../CustomTypography";
import DialogConfirm from "../Dialogs/Confirm";
import DialogMessage from "../Dialogs/Message";
import ModalCreateOrEditVocabularyList from "../Dialogs/ModalCreateOrEditVocabularyList";
interface VocabularyListItemProps {
  name: string;
  description: string;
  id: number;
  onDelete?: any;
  isForSelection?: boolean;
  onSelect?: any;
  responsive?: any;
}
const VocabularyListItem = ({
  name,
  description,
  id,
  onDelete,
  isForSelection,
  onSelect,
  responsive = { xs: 12, sm: 12, smmd: 6, md: 6, lg: 4, xl: 3 },
}: VocabularyListItemProps) => {
  const [
    isShowConfirmDeleteVocabularyListDialog,
    setIsShowConfirmDeleteVocabularyListDialog,
  ] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isShowDialogMessage, setIsShowDialogMessage] = useState(false);
  const [isShowModalEditVocabularyList, setIsShowModalEditVocabularyList] =
    useState(false);
  const [{}, execute] = useAxios(
    {
      method: "DELETE",
      url: `${API_URL}/vocabulary-list/delete`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        id,
      },
    },
    {
      manual: true,
    }
  );
  const handleSubmitEdit = async (data: any) => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/vocabulary-list/update`, data, {
        headers: {
          ...formDataHeaders,
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((result) => result.data)
      .then((data) => {
        if (data?.status === 200) {
          setIsShowModalEditVocabularyList(false);
          setMessage("You edit a vocabulary list successfully!");
          setIsShowDialogMessage(true);
        }
      })
      .catch(() => {});
  };
  const handleDeleteVocabularyList = async () => {
    setIsShowConfirmDeleteVocabularyListDialog(false);
    execute()
      .then((res) => res.data)
      .then((data) => {
        if (data?.status === 200) {
          setMessage(data?.message);
          setIsShowDialogMessage(true);
        }
      })
      .catch((error) => {
        setMessage(
          "Can not delete vocabulary list at the moment, try again later!"
        );
        setIsShowDialogMessage(true);
      });
  };
  return (
    <>
      <Grid
        item
        xs={responsive.xs}
        sm={responsive.sm}
        smmd={responsive.smmd}
        md={responsive.md}
        lg={responsive.lg}
        xl={responsive.xl}
      >
        <Box
          component="div"
          p={2}
          sx={{ background: "var(--main-popper-bg-color)" }}
          className="main-border"
        >
          <Box component="div" pb={2}>
            <CustomTypography
              sx={{
                fontWeight: "700",
                fontSize: "24px",
                color: "var(--main-title-color)",
              }}
              textTransform="uppercase"
            >
              {name}
            </CustomTypography>
            <CustomTypography
              sx={{ fontSize: "14px", color: "var(--main-content-text-color)" }}
              className="text-description"
            >
              {description}
            </CustomTypography>
          </Box>
          <Box>
            {!isForSelection && (
              <Box
                component="div"
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
                  onClick={() => setIsShowModalEditVocabularyList(true)}
                >
                  Edit
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
                  onClick={() =>
                    setIsShowConfirmDeleteVocabularyListDialog(true)
                  }
                >
                  Delete
                </ButtonTransparent>
                <ButtonTransparent
                  sx={{
                    border: "none !important",
                  }}
                  startIcon={
                    <FormatListNumberedIcon
                      fontSize="large"
                      sx={{ color: "var(--main-content-text-color)" }}
                    />
                  }
                  onClick={() => {
                    navigate(`/vocabulary/${name}/${id}`);
                  }}
                >
                  View
                </ButtonTransparent>
              </Box>
            )}
            {isForSelection && (
              <Box
                component="div"
                p={1}
                display="flex"
                justifyContent="center"
                borderTop="1px solid var(--main-content-text-color)"
                borderBottom="1px solid var(--main-content-text-color)"
              >
                <ButtonTransparent
                  sx={{
                    border: "none !important",
                  }}
                  startIcon={
                    <CheckIcon
                      fontSize="large"
                      sx={{ color: "var(--main-content-text-color)" }}
                    />
                  }
                  onClick={() => onSelect(id)}
                >
                  Select
                </ButtonTransparent>
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
      {isShowConfirmDeleteVocabularyListDialog && (
        <DialogConfirm
          title="Delete Confirmation"
          onConfirm={handleDeleteVocabularyList}
          onCancel={() => setIsShowConfirmDeleteVocabularyListDialog(false)}
          content="Are you sure that you want to delete this vocabulary list!"
        />
      )}
      {isShowModalEditVocabularyList && (
        <ModalCreateOrEditVocabularyList
          data={{ name, description, id }}
          isOpen={true}
          title="Edit Vocabulary"
          confirmMessage="Are you sure you want to edit this vocabulary list!"
          onSubmit={(data: any) => {
            handleSubmitEdit(data);
          }}
          onClose={() => setIsShowModalEditVocabularyList(false)}
        />
      )}
      {isShowDialogMessage && (
        <DialogMessage
          title="Notification"
          onOk={() => {
            setIsShowDialogMessage(false);
            setMessage("");
            onDelete();
          }}
          content={message}
        />
      )}
    </>
  );
};
export default VocabularyListItem;
