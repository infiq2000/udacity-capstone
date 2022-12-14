import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Box, Stack } from "@mui/material";
import usePagination, { UsePaginationProps } from "@mui/material/usePagination";
import React, { useEffect, useState } from "react";
import { ButtonPagination, CustomPagination } from "./styles";
const PaginationProduct = (props: UsePaginationProps) => {
  const [pageNumber, setPageNumber] = useState<number>(props.page ?? 1);
  const { items } = usePagination({ ...props, boundaryCount: props.count });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    if (props.onChange) props.onChange(event, value);
  };

  useEffect(() => {
    if (
      !(Number(pageNumber) <= Number(props.count) && Number(pageNumber) > 0)
    ) {
      handleChange({} as React.ChangeEvent, 1);
    }
  }, [pageNumber]);

  return (
    <Box
      component="div"
      display="flex"
      width="100%"
      sx={{
        flexDirection: {
          xs: "column",
          sm: "row",
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        alignItems="center"
        width="100%"
      >
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
          component="div"
          width="20%"
          display="flex"
          alignItems="center"
        >
          <Box
            component="div"
            width="100%"
            height="1px"
            className="left-line"
          ></Box>
          <ButtonPagination
            disabled={items[0].disabled}
            onClick={(e) => {
              items[0].onClick(e);
              setPageNumber(Number(pageNumber) - 1);
            }}
            className={items[0].disabled ? "disabled" : ""}
          >
            <ArrowCircleLeftOutlinedIcon
              sx={{
                width: "50px",
                height: "50px",
                color: "var(--main-content-text-color)",
                fontWeight: "500 !important",
                stroke: "var(--main-bg-color)",
                strokeWidth: "0.9px",
              }}
            />
          </ButtonPagination>
        </Box>
        <CustomPagination
          className="main-border"
          count={props.count}
          page={Number(pageNumber)}
          onChange={handleChange}
          hidePrevButton
          hideNextButton
        />
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
          component="div"
          width="20%"
          display="flex"
          alignItems="center"
        >
          <ButtonPagination
            onClick={(e) => {
              items[items.length - 1].onClick(e);
              setPageNumber(Number(pageNumber) + 1);
            }}
            disabled={items[items.length - 1].disabled}
            className={items[items.length - 1].disabled ? "disabled" : ""}
          >
            <ArrowCircleRightOutlinedIcon
              sx={{
                width: "50px",
                height: "50px",
                color: "var(--main-content-text-color)",
                fontWeight: "500 !important",
                stroke: "var(--main-bg-color)",
                strokeWidth: "0.9px",
              }}
            />
          </ButtonPagination>
          <Box
            component="div"
            width="100%"
            height="1px"
            className="right-line"
          ></Box>
        </Box>
      </Stack>
      <Stack
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          },
        }}
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        width="100%"
      >
        <Box component="div" width="50%" display="flex" alignItems="center">
          <Box
            component="div"
            width="100%"
            height="1px"
            className="left-line"
          ></Box>
          <ButtonPagination
            disabled={items[0].disabled}
            onClick={(e) => {
              items[0].onClick(e);
              setPageNumber(Number(pageNumber) - 1);
            }}
            className={items[0].disabled ? "disabled" : ""}
          >
            <ArrowCircleLeftOutlinedIcon
              sx={{
                width: "50px",
                height: "50px",
                color: "var(--main-content-text-color)",
                fontWeight: "500 !important",
                stroke: "var(--main-bg-color)",
                strokeWidth: "0.9px",
              }}
            />
          </ButtonPagination>
        </Box>
        <Box component="div" width="50%" display="flex" alignItems="center">
          <ButtonPagination
            onClick={(e) => {
              items[items.length - 1].onClick(e);
              setPageNumber(Number(pageNumber) + 1);
            }}
            disabled={items[items.length - 1].disabled}
            className={items[items.length - 1].disabled ? "disabled" : ""}
          >
            <ArrowCircleRightOutlinedIcon
              sx={{
                width: "50px",
                height: "50px",
                color: "var(--main-content-text-color)",
                fontWeight: "500 !important",
                stroke: "var(--main-bg-color)",
                strokeWidth: "0.9px",
              }}
            />
          </ButtonPagination>
          <Box
            component="div"
            width="100%"
            height="1px"
            className="right-line"
          ></Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default PaginationProduct;
