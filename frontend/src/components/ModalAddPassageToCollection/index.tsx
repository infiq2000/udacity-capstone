import CollectionsIcon from "@mui/icons-material/Collections";
import { Grid, FormControl, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { RootState } from "../../config/store";
import { darkModeState } from "../../slice/darkModeSlice";
import ButtonPrimary from "../ButtonPrimary";
import CustomSelect from "../CustomSelect";
import CustomTypography from "../CustomTypography";
import CustomDialog from "../Dialogs";
import SearchInput from "../SearchInput";
interface ModalAddNFTsToCollectionProps {
  isShow: boolean;
  setShow: any;
  title: string;
  renderContent?: any;
  isShowButtonAdd: boolean;
  searchText: string;
  setSearchText: any;
  order: string;
  setOrder: any;
  onClickAdd: () => void;
}

const ModalAddPassageToCollection = ({
  isShow,
  setShow,
  title,
  renderContent,
  onClickAdd,
  isShowButtonAdd,
  searchText,
  setSearchText,
  order,
  setOrder,
}: ModalAddNFTsToCollectionProps) => {
  const isDarkMode = useSelector<RootState>(
    (state) => state.darkMode?.isDarkMode
  ) as darkModeState;
  const handleCloseDialog = () => {
    setShow(false);
  };
  return (
    <CustomDialog
      isShow={isShow}
      maxWidth="md"
      dialogIcon={
        <CollectionsIcon
          sx={{
            color: "var(--main-content-text-color)",
            height: 25,
            width: 25,
          }}
        />
      }
      title={title}
      onClose={handleCloseDialog}
      content={
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            mb={2}
            display={{ xs: "block", sm: "flex" }}
            justifyContent="space-between"
          >
            <SearchInput
              value={searchText}
              onChange={(e: any) => setSearchText(e)}
              placeholder="Search"
            />
            <FormControl variant="standard">
              <Box
                component="div"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={{ xs: 2, sm: 0 }}
              >
                <CustomTypography color="var(--main-content-text-color)" mr={2}>
                  Sort:
                </CustomTypography>
                <CustomSelect
                  id="name-sort"
                  value={order}
                  onChange={(e: any) => {
                    setOrder(e.target.value);
                  }}
                  displayEmpty
                  disableUnderline
                  MenuProps={{
                    sx: {
                      "& .MuiMenu-list": {
                        backgroundColor: isDarkMode ? "#374359" : "#ffffff",
                        color: isDarkMode ? "#eeeeee" : "152238",
                        border: isDarkMode
                          ? "1px solid #eeeeee"
                          : "1px solid #152238",
                        borderRadius: "4px",
                      },
                    },
                  }}
                >
                  <MenuItem value={"ASC"}>A &#8594; Z</MenuItem>
                  <MenuItem value={"DESC"}>Z &#8594; A</MenuItem>
                </CustomSelect>
              </Box>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            mb={2}
            display="flex"
            justifyContent="flex-end"
          >
            {isShowButtonAdd && (
              <Box
                component="div"
                display={{ xs: "flex", sm: "unset" }}
                justifyContent="flex-end"
              >
                <ButtonPrimary onClick={onClickAdd}>Add Passage</ButtonPrimary>
              </Box>
            )}
          </Grid>
          {renderContent()}
        </Grid>
      }
    />
  );
};

export default ModalAddPassageToCollection;
