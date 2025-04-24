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
import InvoiceComponent from "cmp-core/src/Component/Invoice/InvoiceComponent";
import Gap from "uikit/src/Gap";
import { Box } from "@mui/material";
import Dialog, { DialogPropsType } from "uikit/src/Dialog";

type InvoiceModalProps = Omit<DialogPropsType, "size"> & {
  onClose: () => void;
  model?: InvoiceEntity;
};

const ShowInvoice: React.FC<InvoiceModalProps> = ({
  onClose,
  model,
  ...props
}: InvoiceModalProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);

  const { setLoading } = useLoading();

  const [selectedValue, setSelectedValue] = useState(null);

  const [invoiceModel, setinvoiceModel] = useState<Partial<InvoiceEntity>>({});

  useEffect(() => {
    if (props.open) {
      setinvoiceModel(model as InvoiceEntity);
      // setLoading(true);
    }
    // else {
    //     setLoading(false);
    // }
    // setLoading(false);
  }, [props.open]);

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
    <Dialog
      {...props}
      size="lg"
      title="Invoice"
      fullHeight={true}
      PaperProps={{}}
      onClose={onClose}
    >
      {/* Iframe section */}
      <Box
        sx={{
          margin: "auto",
          p: 4,
          height: "100%",
          width: "100%",
          background: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {model && <InvoiceComponent invoice={model} />}

        <Gap />

        <Box className="flex justify-end"></Box>
      </Box>

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
    </Dialog>
  );
};

export default React.memo(ShowInvoice);
