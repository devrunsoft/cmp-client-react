import React, { useState, useEffect, useCallback } from "react";
import { GoPlusCircle } from "react-icons/go";
import styles from "./invoice_modal.module.css";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { useLoading } from "../loading/loading_context";

import { IoIosRefresh } from "react-icons/io";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";
import { SendInvoiceApi } from "data/api/invoice/send_invoice_api";
import { toast } from "react-toastify";
import { CheckInvoiceApi } from "data/api/invoice/check_invoice_api";
// import { InvoiceEnum } from "@/domain/enum/invoice_enum";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  model?: InvoiceEntity;
}
const ShowInvoice: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  model,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);

  const { setLoading } = useLoading();

  const [selectedValue, setSelectedValue] = useState(null);

  const [invoiceModel, setinvoiceModel] = useState<Partial<InvoiceEntity>>({});

  useEffect(() => {
    if (isOpen) {
      setinvoiceModel(model as InvoiceEntity);
      // setLoading(true);
    }
    // else {
    //     setLoading(false);
    // }
    // setLoading(false);
  }, [isOpen]);

  const handleIframeLoad = () => {
    setLoading(false); // Hide loading spinner when iframe is loaded
  };

  function onCancel() {
    onClose();
  }

  async function Send() {
    try {
      setLoading(true);
      var result = await SendInvoiceApi(model!.Id);
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (data) => {
          setIframeKey(iframeKey + 1);
          setinvoiceModel(data);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  async function Refresh() {
    try {
      setLoading(true);
      var result = await CheckInvoiceApi(model!.Id);
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (data) => {
          setIframeKey(iframeKey + 1);
          setinvoiceModel(data);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Invoice"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(31, 34, 41, 0.8)",
          },
          content: {
            borderRadius: "10px",
            padding: "20px", // Add padding to the modal content
            display: "flex",
            flexDirection: "column", // Ensure column layout for the modal
            justifyContent: "space-between", // Space out the content vertically
          },
        }}
      >
        <div className={styles.title}>
          <h2>Invoice</h2>
          <button onClick={onClose}>
            <IoClose size={34} />
          </button>
        </div>

        {/* Iframe section */}
        {model && (
          <div style={{ flexGrow: 1, overflow: "hidden" }}>
            {" "}
            {/* Make iframe flexible */}
            <iframe
              key={iframeKey}
              src={`https://link.fastpaydirect.com/invoice/${model.InvoiceId}`}
              width="100%"
              height="100%" // Make iframe take full available height
              onLoad={handleIframeLoad}
              frameBorder="0"
              style={{ border: "none" }}
            />
          </div>
        )}

        {/* {invoiceModel && (
          <div className={styles.submitButtons} style={{ marginTop: "10px" }}>
            <button className={styles.cancel} type="button" onClick={onCancel}>
              Cancel
            </button>
            {invoiceModel.Status != InvoiceStatus.Draft && (
              <button type="button" onClick={Refresh}>
                Did You Pay? <IoIosRefresh size={24} />
              </button>
            )}

            {invoiceModel.Status == InvoiceStatus.Draft ? (
              <button type="button" onClick={Send}>
                {"Accept And Send"} <GoPlusCircle size={24} />
              </button>
            ) : (
              <button type="button" onClick={Send}>
                {"ReSend"} <GoPlusCircle size={24} />
              </button>
            )}
          </div>
        )} */}
      </Modal>
    </>
  );
};

export default React.memo(ShowInvoice);
