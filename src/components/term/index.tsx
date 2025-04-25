"use client";
import { FaTruckLoading } from "react-icons/fa";
import styles from "./LoadingModal.module.css"; // Assuming you create a CSS module for styling
import { LoadScriptNext } from "@react-google-maps/api";
import { Audio, Circles, RotatingLines } from "react-loader-spinner";
import Modal from "react-modal";
import React from "react";
import { useTerms } from "components/context_api/terms_and_conditions";
import { Box, Paper } from "@mui/material";
import Dialog, { DialogPropsType } from "uikit/src/Dialog";

const LoadingModal = () => {
  const { isOpen, terms, setOpen } = useTerms();

  if (!isOpen) return null;
  if (!terms) return null;

  return (
    <Dialog
      size="sm"
      open={isOpen}
      onClose={() => {
        setOpen(false);
      }}
      fullHeight
      title="Terms And Condition"
      // PaperProps={{
      //   component: "form",
      //   onSubmit: handleSubmit(onSubmit),
      // }}
    >
      <Paper variant="outlined" sx={{ p: "20px" }}>
        <Box
          sx={{ "& ol, & ul": { paddingInlineStart: "20px" } }}
          dangerouslySetInnerHTML={{
            __html: terms.toString(),
          }}
        />
      </Paper>
    </Dialog>
  );
};

export default LoadingModal;
