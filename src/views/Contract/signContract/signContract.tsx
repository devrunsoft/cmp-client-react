"use client";

import React, { useState, useCallback, useEffect } from "react";
import Modal from "react-modal";
import styles from "./signContract.module.css";
import "react-phone-number-input/style.css";
import { IoClose } from "react-icons/io5";
import DOMPurify from "dompurify";
import { GoPlusCircle } from "react-icons/go";
import { CompanyContractEntity } from "common/domain/entity/contract_entity";
import { useLoading } from "components/loading/loading_context";
import { toast } from "react-toastify";
import { SignCompanyContractCommand } from "common/domain/command/sign_contract_command";
import { SignCompanyContractApi } from "data/api/contract/sign_contract_api";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  model: CompanyContractEntity;
}

const SignContract: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  model,
}) => {
  const { setLoading } = useLoading();

  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(model.Sign ?? "");
    }
  }, [isOpen]);

  const onCancel = () => {
    onClose();
  };

  const handleSubmit = async () => {
    if (!name) {
      return toast.error("Please Sign The contract");
    }
    try {
      setLoading(true);
      var command: SignCompanyContractCommand = {
        Sign: name,
      };
      var result = await SignCompanyContractApi(model.Id!, command);
      result.fold(
        (error) => {
          setLoading(false);
        },
        (data) => {
          onSubmit();
          onClose();
          setLoading(false);
        }
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Contract"
        ariaHideApp={false}
        style={{
          overlay: { backgroundColor: "rgba(31, 34, 41, 0.8)" },
          content: { borderRadius: "10px" },
        }}
      >
        <div className="pagecontent">
          <div className={styles.title}>
            <h2>Contract</h2>
            <button onClick={onClose}>
              <IoClose size={34} />
            </button>
          </div>

          <form className={styles.dialogForm} onSubmit={() => {}}>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(model.Content),
              }}
            />

            <div style={{ textAlign: "center", padding: "20px" }}>
              {/* Input Field */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  maxWidth: "300px",
                }}
              >
                {/* <h2>Type Your Name for Digital Signature</h2> */}
                <br />
                {model.Sign == null && (
                  <input
                    type="text"
                    placeholder="Enter your first name and last name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      fontSize: "18px",
                      padding: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}

                {/* Signature Preview */}
                {model.Sign == null && (
                  <div
                    style={{
                      marginTop: "10px",
                      fontFamily: "Dancing Script, cursive",
                      fontSize: "40px",
                      fontWeight: "bold",
                      border: "1px solid black",
                      padding: "10px",
                      display: "inline-block",
                      minWidth: "200px",
                    }}
                  >
                    {name || "Your Signature"}
                  </div>
                )}
              </div>
            </div>
          </form>

          {model.Sign == null && (
            <div className={styles.submitButtons}>
              <button
                className={styles.cancel}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button onClick={() => handleSubmit()}>
                Sign
                <GoPlusCircle size={24} />
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default React.memo(SignContract);
