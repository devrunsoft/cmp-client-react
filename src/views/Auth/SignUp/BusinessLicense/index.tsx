"use client";
import {
  useForm,
  FormProvider,
  Controller,
} from "react-hook-form";
import { useState, useEffect } from "react";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FiFileText } from "react-icons/fi";
import styles from "../signUp.module.css";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { useLoading } from "components/loading/loading_context";
import { toast } from "react-toastify";
import { DocumentCommand } from "common/domain/command/document_command";
import { addDcoument } from "data/api/register/document/add";
import Title from "components/title/title";
import { NextButton } from "components/button/next/next";

export const BusinessLicense = ({
  setIndex,
}: {
  setIndex?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const { setLoading } = useLoading();

  const handleFileChange1 = (event) => {
    const selectedFile = event.target.files[0];
    setFile1(selectedFile);
  };

  const handleFileChange2 = (event) => {
    const selectedFile = event.target.files[0];
    setFile2(selectedFile);
  };

  const handleRemoveFile1 = () => {
    setFile1(null);
    // document.getElementById("businessLicense1").value = "";
  };

  const handleRemoveFile2 = () => {
    setFile2(null);
    // document.getElementById("businessLicense2").value = "";
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!file1 && !file2) {
      toast.error("Upload files or Press Skip");
      return;
    }
    try {
      setLoading(true);
      var result = await addDcoument(new DocumentCommand(file1, file2));

      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (_) => {
          setIndex!(4);
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title title={"Document Submission"} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formSection}>
          <label htmlFor="businessLicense1" className={styles.uploadLabel}>
            Business License:
          </label>
          <div className={styles.uploadButton}>
            <input
              id="businessLicense1"
              type="file"
              onChange={handleFileChange1}
              className={styles.hiddenInput}
            />
            {file1 ? (
              <div className={styles.fileContainer}>
                <FiFileText
                  size={20}
                  style={{ color: "rgba(76, 142, 59, 1)" }}
                />
                <span>{file1?.name}</span>
                <button
                  className={styles.removeButton}
                  onClick={handleRemoveFile1}
                >
                  <RxCross2 size={24} />
                </button>
              </div>
            ) : (
              <div className={styles.isade}>
                <img
                  width={24}
                  height={24}
                  src="/src/assets/download_icon_dark.svg"
                  alt="Upload Icon"
                />
                <span>
                  Drag your file or <a href="#">click to upload</a>
                </span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.formSection}>
          <label htmlFor="businessLicense2" className={styles.uploadLabel}>
            Health Department Certificate:
          </label>
          <div className={styles.uploadButton}>
            <input
              id="businessLicense2"
              type="file"
              onChange={handleFileChange2}
              className={styles.hiddenInput}
            />
            {file2 ? (
              <div className={styles.fileContainer}>
                <FiFileText
                  size={20}
                  style={{ color: "rgba(76, 142, 59, 1)" }}
                />
                <span>{file2?.name}</span>
                <button
                  className={styles.removeButton}
                  onClick={handleRemoveFile2}
                >
                  <RxCross2 size={24} />
                </button>
              </div>
            ) : (
              <div className={styles.isade}>
                <img
                  width={24}
                  height={24}
                  src="/src/assets/download_icon_dark.svg"
                  alt="Upload Icon"
                />
                <span>
                  Drag your file or <a href="#">click to upload</a>
                </span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.buttonLine}>
          {/* <button onClick={onBack}>Back</button> */}
          <button
            onClick={() => {
              setIndex!(4);
            }}
          >
            Skip
          </button>
          <NextButton onClick={() => {}} />
        </div>
      </form>
    </>
  );
};
