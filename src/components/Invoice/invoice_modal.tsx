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
import { useInvoiceGet } from "data/repository/invoice";
import { DataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";

type InvoiceModalProps = Omit<DialogPropsType, "size"> & {
  onClose: () => void;
  model?: InvoiceEntity;
};

const ShowInvoice: React.FC<InvoiceModalProps> = ({
  onClose,
  model,
  ...props
}: InvoiceModalProps) => {
  const request = useInvoiceGet(model?.Id);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const [invoice, setInvoice] = useState<InvoiceEntity | null>(null);

  useEffect(() => {
    if (props.open) {
      loadData();
    }
  }, [props.open]);

  const loadData = () => {
    request.call({
      onSuccess: (res) => {
        setInvoice(res.data);
      },
    });
  };

  function onCancel() {
    onClose();
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
      <DataFetchingWrapper
        retry={loadData}
        loading={request.loading && !request.data?.data}
        error={request.error && !request.data?.data}
      >
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
          {invoice && <InvoiceComponent invoice={invoice} />}

          <Gap />

          <Box className="flex justify-end"></Box>
        </Box>
      </DataFetchingWrapper>
    </Dialog>
  );
};

export default React.memo(ShowInvoice);
